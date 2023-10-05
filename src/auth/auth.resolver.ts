import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LogInInput, SignUpInput } from './dto';
import { AuthResponse } from './types/auth-responses.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signUp' })
  async singUp(
    @Args('signUpInput') signUpInput: SignUpInput
  ): Promise<AuthResponse> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthResponse, { name: 'logIn' })
  async logIn(
    @Args('logInInput') logInInput: LogInInput
  ): Promise<AuthResponse> {
    return this.authService.logIn(logInInput);
  }

  @Query(()=>AuthResponse, {name:'revalite'})
  @UseGuards(JwtAuthGuard)
  async revalite(
    @CurrentUser() user: User
  ):Promise<AuthResponse>{
    return this.authService.revalidateToken(user);
  }
}
