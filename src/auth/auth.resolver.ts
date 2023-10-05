import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LogInInput, SignUpInput } from './dto';
import { AuthResponse } from './types/auth-responses.type';

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
}
