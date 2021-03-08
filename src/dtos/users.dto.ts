import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  public Email: string;
  @IsString()
  public Password: string;
}
export class CreateUserDto {
  @IsEmail()
  public Email: string;
  @IsString()
  public Username: string;
  @IsPhoneNumber()
  @IsString()
  public Phone: string;
  @IsString()
  public Password: string;
  @IsString()
  public Fullname: string;
  @IsString()
  public Gender: string;
  @IsString()
  public Dob: string;
  
  
}

export class UserDto {
  ID: number;
  Fullname: string;
  Phone: string;
  Dob: string; // type of date in SQL
  Gender: string;
  Email: string;
  //profile picture type here
}
