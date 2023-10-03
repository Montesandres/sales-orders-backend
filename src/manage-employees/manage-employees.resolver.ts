import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ManageEmployeesService } from './manage-employees.service';
import { ManageEmployee } from './entities/manage-employee.entity';
import { CreateManageEmployeeInput } from './dto/create-manage-employee.input';
import { UpdateManageEmployeeInput } from './dto/update-manage-employee.input';

@Resolver(() => ManageEmployee)
export class ManageEmployeesResolver {
  constructor(private readonly manageEmployeesService: ManageEmployeesService) {}

  @Mutation(() => ManageEmployee)
  createManageEmployee(@Args('createManageEmployeeInput') createManageEmployeeInput: CreateManageEmployeeInput) {
    return this.manageEmployeesService.create(createManageEmployeeInput);
  }

  @Query(() => [ManageEmployee], { name: 'manageEmployees' })
  findAll() {
    return this.manageEmployeesService.findAll();
  }

  @Query(() => ManageEmployee, { name: 'manageEmployee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.manageEmployeesService.findOne(id);
  }

  @Mutation(() => ManageEmployee)
  updateManageEmployee(@Args('updateManageEmployeeInput') updateManageEmployeeInput: UpdateManageEmployeeInput) {
    return this.manageEmployeesService.update(updateManageEmployeeInput.id, updateManageEmployeeInput);
  }

  @Mutation(() => ManageEmployee)
  removeManageEmployee(@Args('id', { type: () => Int }) id: number) {
    return this.manageEmployeesService.remove(id);
  }
}
