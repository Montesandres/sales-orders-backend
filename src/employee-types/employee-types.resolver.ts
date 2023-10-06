import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EmployeeTypesService } from './employee-types.service';
import { EmployeeType } from './entities/employee-type.entity';
import { CreateEmployeeTypeInput, UpdateEmployeeTypeInput } from './dto';

@Resolver(() => EmployeeType)
export class EmployeeTypesResolver {


  constructor(private readonly employeeTypesService: EmployeeTypesService) {}

  @Mutation(() => EmployeeType)
  createEmployeeType(
    @Args('createEmployeeTypeInput')
    createEmployeeTypeInput: CreateEmployeeTypeInput
  ):Promise<EmployeeType> {
    return this.employeeTypesService.create(createEmployeeTypeInput);
  }

  @Query(() => [EmployeeType], { name: 'employeeTypes' })
  findAll():Promise<EmployeeType[]>{
    return this.employeeTypesService.findAll();
  }

  @Query(() => EmployeeType, { name: 'employeeType' })
  findOne(@Args('id', { type: () => ID }) id: string):Promise<EmployeeType>{
    return this.employeeTypesService.findOne(id);
  }

  @Mutation(() => EmployeeType)
  updateEmployeeType(
    @Args('updateEmployeeTypeInput')
    updateEmployeeTypeInput: UpdateEmployeeTypeInput
  ):Promise<EmployeeType> {
    return this.employeeTypesService.update(
      updateEmployeeTypeInput.id,
      updateEmployeeTypeInput
    );
  }

  @Mutation(() => EmployeeType)
  removeEmployeeType(@Args('id', { type: () => ID }) id: string):Promise<EmployeeType> {
    return this.employeeTypesService.remove(id);
  }
}
