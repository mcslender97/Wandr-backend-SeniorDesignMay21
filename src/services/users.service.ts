import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';
import DatabaseService from './database.service';

class UserService {
  // public users = userModel;
  public users;
  private db = new DatabaseService();
  constructor() {
    this.users = this.db.getAllUser();
  }

  public async findAllUser(): Promise<User[]> {
    //   const users: User[] = this.users;
    const users = await this.db.getAllUser();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    // const findUser: User = this.users.find(user => user.id === userId);
    const user = await this.db.findUserByID(userId);
    // if (!findUser) throw new HttpException(409, "You're not user");

    return user;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    // const findUser: User = (await this.db.getAllUser()).find(user => user.email === userData.email);
    const findUser = await this.db.findUserByEmail(userData.Email);
    if (!(findUser === null)) throw new HttpException(409, `You're email ${userData.Email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.Password, 10);
    const createUserData: User = {
      ID: this.users.length + 1,
      ...userData,
      Password: hashedPassword,
      Dob: null,
      Fullname: '',
      Gender: '',
      Phone: null,
      Email: '',
    };

    return createUserData;
  }

  public async updateUser(userId: number, userData: User): Promise<User[]> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    // const findUser: User = this.users.find(user => user.id === userId);
    //const findUser: User = (await this.db.getAllUser()).find(user => user.id === userId);
    const findUser: User = await this.db.findUserByID(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await bcrypt.hash(userData.Password, 10);
    // const updateUserData: User[] = this.users.map((user: User) => {
    //   if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword, dob: null,fullname: "",gender: "",phone: null,email: ""};
    //   return user;
    // });
    const updateUserData: User[] = await this.db.updateUserByID(userId, userData);

    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User[]> {
    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const deleteUserData: User[] = this.users.filter((user: { id: number }) => user.id !== findUser.ID);
    return deleteUserData;
  }
  // public async joinEvent(userId: number, eventID: number)
  // {
  //   const userEventData: userEvent = {
        
  //     }
  // }
}

export default UserService;
