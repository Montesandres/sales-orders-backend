import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums/valid-roles.enum';
import { User } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user:User = ctx.getContext().req.user;
    if (!user)
      throw new InternalServerErrorException(
        'No user inside the request -make sure that we used the AuthGuard'
      );

    if (roles.length === 0) return user;
    
    for (const role of user.employee.employeeType.roles){
        if (roles.includes(role as ValidRoles)){
            return user;
        }
    }
     
     throw  new ForbiddenException(`user: ${user.userName} need a valid role [${roles}]`);
  }
);
