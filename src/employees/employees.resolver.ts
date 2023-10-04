import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput, UpdateEmployeeInput } from './dto/index';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation(() => Employee)
  createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ):Promise<Employee> {
    return this.employeesService.create(createEmployeeInput);
  }

  @Query(() => [Employee], { name: 'employees' })
  findAll():Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id', { type: () => ID }) id: string):Promise<Employee>{
    return this.employeesService.findOne(id);
  }

  @Mutation(() => Employee)
  updateEmployee(
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  ):Promise<Employee> {
    return this.employeesService.update(
      updateEmployeeInput.id,
      updateEmployeeInput,
    );
  }

  @Mutation(() => Employee)
  removeEmployee(@Args('id', { type: () => ID }) id: string):Promise<Employee> {
    return this.employeesService.remove(id);
  }
}
