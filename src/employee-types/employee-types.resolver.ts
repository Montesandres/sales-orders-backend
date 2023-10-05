import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeeTypesService } from './employee-types.service';
import { EmployeeType } from './entities/employee-type.entity';
import { CreateEmployeeTypeInput } from './dto/create-employee-type.input';
import { UpdateEmployeeTypeInput } from './dto/update-employee-type.input';

@Resolver(() => EmployeeType)
export class EmployeeTypesResolver {
  constructor(private readonly employeeTypesService: EmployeeTypesService) {}

  @Mutation(() => EmployeeType)
  createEmployeeType(@Args('createEmployeeTypeInput') createEmployeeTypeInput: CreateEmployeeTypeInput) {
    return this.employeeTypesService.create(createEmployeeTypeInput);
  }

  @Query(() => [EmployeeType], { name: 'employeeTypes' })
  findAll() {
    return this.employeeTypesService.findAll();
  }

  @Query(() => EmployeeType, { name: 'employeeType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.employeeTypesService.findOne(id);
  }

  @Mutation(() => EmployeeType)
  updateEmployeeType(@Args('updateEmployeeTypeInput') updateEmployeeTypeInput: UpdateEmployeeTypeInput) {
    return this.employeeTypesService.update(updateEmployeeTypeInput.id, updateEmployeeTypeInput);
  }

  @Mutation(() => EmployeeType)
  removeEmployeeType(@Args('id', { type: () => Int }) id: number) {
    return this.employeeTypesService.remove(id);
  }
}
