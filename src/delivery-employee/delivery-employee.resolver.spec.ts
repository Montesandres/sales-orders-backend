import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryEmployeeResolver } from './delivery-employee.resolver';
import { DeliveryEmployeeService } from './delivery-employee.service';

describe('DeliveryEmployeeResolver', () => {
  let resolver: DeliveryEmployeeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryEmployeeResolver, DeliveryEmployeeService],
    }).compile();

    resolver = module.get<DeliveryEmployeeResolver>(DeliveryEmployeeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
