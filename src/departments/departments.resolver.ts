import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput, UpdateDepartmentInput } from './dto';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => Department)
  createDepartment(@Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput):Promise<Department> {
    return this.departmentsService.create(createDepartmentInput);
  }

  @Query(() => [Department], { name: 'departments' })
  findAll():Promise<Department[]> {
    return this.departmentsService.findAll();
  }

  @Query(() => Department, { name: 'department' })
  findOne(@Args('id', { type: () => ID }) id: string):Promise<Department> {
    return this.departmentsService.findOne(id);
  }

  @Mutation(() => Department)
  updateDepartment(@Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput):Promise<Department> {
    return this.departmentsService.update(updateDepartmentInput.id, updateDepartmentInput);
  }

  @Mutation(() => Department)
  removeDepartment(@Args('id', { type: () => ID }) id: string):Promise<Department> {
    return this.departmentsService.remove(id);
  }
}
