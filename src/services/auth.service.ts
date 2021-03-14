import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserDto, LoginUserDto, UserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';
import DatabaseService from './database.service'

class AuthService {
  
  private db = new DatabaseService();
  public users = userModel;
  public async signup(userData: CreateUserDto) {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.db.findUserByEmail(userData.Email);
    if (findUser) throw new HttpException(409, `You're email ${userData.Email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.Password, 10);
    const createUserData: CreateUserDto = {
      ...userData,
      Password: hashedPassword,
    };
    const createdUser = await this.db.createUser(createUserData);
    console.log(createdUser);
    return await this.db.findUserByID(createdUser[0]);
  }

  public async login(userData: LoginUserDto): Promise<{ user: { token: TokenData } & UserDto }> {
    
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    
    const findUser: User = await this.db.findUserByEmail(userData.Email)
    
    if (!findUser) throw new HttpException(409, `You're email ${userData.Email} not found`);
    

    const isPasswordMatching: boolean = await bcrypt.compare(userData.Password, findUser.Password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
    
    const tokenData = this.createToken(findUser);

    const user: UserDto & { token: TokenData } = {
      Dob: findUser.Dob,
      Email: findUser.Email,
      Fullname: findUser.Fullname,
      Gender: findUser.Gender,
      ID: findUser.ID,
      Phone: findUser.Phone,
      token: tokenData,
    }

    return { user };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = this.users.find(user => user.Password === userData.Password);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.ID };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 262800;//6 months in minutes

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
