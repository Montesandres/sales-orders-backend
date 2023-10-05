import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInInput, SignUpInput } from './dto';
import { AuthResponse } from './types/auth-responses.type';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.userService.create({
      ...signUpInput,
      password: bcrypt.hashSync(signUpInput.password, 10),
    });
    const token = this.getToken(user.id, user.userName);
    return { token, user };
  }

  async logIn(logInInput: LogInInput): Promise<AuthResponse> {
    const user = await this.userService.finOneByUserName(logInInput.userName);
    if (!bcrypt.compareSync(logInInput.password, user.password)) {
      throw new UnauthorizedException('User name or password invalid');
    }
    const token = this.getToken(user.id, user.userName);
    return { token, user };
  }

  async validateUser(id:string):Promise<User>{
    const user = await this.userService.finOneById(id);
    if (!user.isActive) 
      throw new UnauthorizedException(`User ${user.userName} is inactive, talk with an admin`);
    delete user.password;
    return user
  }

  async revalidateToken(user:User):Promise<AuthResponse>{
    const token = this.getToken(user.id,user.userName);
    return {
      token,
      user
    }
  }


  private getToken(id: string, userName: string) {
    return this.jwtService.sign({ id, userName });
  }
}
