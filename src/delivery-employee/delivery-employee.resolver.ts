import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DeliveryEmployeeService } from './delivery-employee.service';
import { DeliveryEmployee } from './entities/delivery-employee.entity';
import {
  CreateDeliveryEmployeeInput,
  UpdateDeliveryEmployeeInput,
} from './dto';

@Resolver(() => DeliveryEmployee)
export class DeliveryEmployeeResolver {
  constructor(
    private readonly deliveryEmployeeService: DeliveryEmployeeService
  ) {}

  @Mutation(() => DeliveryEmployee)
  createDeliveryEmployee(
    @Args('createDeliveryEmployeeInput')
    createDeliveryEmployeeInput: CreateDeliveryEmployeeInput
  ): Promise<DeliveryEmployee> {
    return this.deliveryEmployeeService.create(createDeliveryEmployeeInput);
  }

  @Query(() => [DeliveryEmployee], { name: 'deliveryEmployee' })
  findAll(): Promise<DeliveryEmployee[]> {
    return this.deliveryEmployeeService.findAll();
  }

  @Query(() => DeliveryEmployee, { name: 'deliveryEmployee' })
  findOne(
    @Args('id', { type: () => ID }) id: string
  ): Promise<DeliveryEmployee> {
    return this.deliveryEmployeeService.findOne(id);
  }

  @Mutation(() => DeliveryEmployee)
  updateDeliveryEmployee(
    @Args('updateDeliveryEmployeeInput')
    updateDeliveryEmployeeInput: UpdateDeliveryEmployeeInput
  ): Promise<DeliveryEmployee> {
    return this.deliveryEmployeeService.update(
      updateDeliveryEmployeeInput.id,
      updateDeliveryEmployeeInput
    );
  }

  @Mutation(() => DeliveryEmployee)
  removeDeliveryEmployee(@Args('id', { type: () => ID }) id: string):Promise<DeliveryEmployee> {
    return this.deliveryEmployeeService.remove(id);
  }
}
