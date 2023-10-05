import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeliveryEmployeeService } from './delivery-employee.service';
import { DeliveryEmployee } from './entities/delivery-employee.entity';
import { CreateDeliveryEmployeeInput } from './dto/create-delivery-employee.input';
import { UpdateDeliveryEmployeeInput } from './dto/update-delivery-employee.input';

@Resolver(() => DeliveryEmployee)
export class DeliveryEmployeeResolver {
  constructor(private readonly deliveryEmployeeService: DeliveryEmployeeService) {}

  @Mutation(() => DeliveryEmployee)
  createDeliveryEmployee(@Args('createDeliveryEmployeeInput') createDeliveryEmployeeInput: CreateDeliveryEmployeeInput) {
    return this.deliveryEmployeeService.create(createDeliveryEmployeeInput);
  }

  @Query(() => [DeliveryEmployee], { name: 'deliveryEmployee' })
  findAll() {
    return this.deliveryEmployeeService.findAll();
  }

  @Query(() => DeliveryEmployee, { name: 'deliveryEmployee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.deliveryEmployeeService.findOne(id);
  }

  @Mutation(() => DeliveryEmployee)
  updateDeliveryEmployee(@Args('updateDeliveryEmployeeInput') updateDeliveryEmployeeInput: UpdateDeliveryEmployeeInput) {
    return this.deliveryEmployeeService.update(updateDeliveryEmployeeInput.id, updateDeliveryEmployeeInput);
  }

  @Mutation(() => DeliveryEmployee)
  removeDeliveryEmployee(@Args('id', { type: () => Int }) id: number) {
    return this.deliveryEmployeeService.remove(id);
  }
}
