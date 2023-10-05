import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeTypesService } from './employee-types.service';

describe('EmployeeTypesService', () => {
  let service: EmployeeTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeTypesService],
    }).compile();

    service = module.get<EmployeeTypesService>(EmployeeTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
