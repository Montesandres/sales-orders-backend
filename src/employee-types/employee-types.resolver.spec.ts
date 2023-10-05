import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeTypesResolver } from './employee-types.resolver';
import { EmployeeTypesService } from './employee-types.service';

describe('EmployeeTypesResolver', () => {
  let resolver: EmployeeTypesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeTypesResolver, EmployeeTypesService],
    }).compile();

    resolver = module.get<EmployeeTypesResolver>(EmployeeTypesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
