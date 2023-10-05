import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryEmployeeService } from './delivery-employee.service';

describe('DeliveryEmployeeService', () => {
  let service: DeliveryEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryEmployeeService],
    }).compile();

    service = module.get<DeliveryEmployeeService>(DeliveryEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
