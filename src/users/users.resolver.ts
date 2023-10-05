import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ValidRolesArgs } from './dto/args/roles.args';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { UpdateUserInput } from './dto';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], {
    name: 'users',
    description: 'return all user by user input',
  })
  findAll(
    @CurrentUser([ValidRoles.sadmin])
    @Args() validRoles: ValidRolesArgs
  ): Promise<User[]> {
    return this.usersService.findAll(validRoles.roles);
  }

  @Query(() => User, {
    name: 'findUserByID',
    description: 'return all user by user input',
  })
  findOneByID(
    @CurrentUser([ValidRoles.sadmin])
    @Args('userId') userId: string,   
  ): Promise<User> {
    return this.usersService.finOneById(userId);
  }
  
  @Mutation(() => User)
  updateUser(
    @CurrentUser([ValidRoles.sadmin]) user:User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput):Promise<User> {
      
    return this.usersService.update(updateUserInput.id, updateUserInput, user);
  }

  @Mutation(() => User, { name: 'blockUser' })
  blockUser(
    @CurrentUser([ValidRoles.user])
    @Args('id', { type: () => ID },ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.blockUser(id);
  }
}
