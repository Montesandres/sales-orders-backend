import { Test, TestingModule } from '@nestjs/testing';
import { ManageEmployeesService } from './manage-employees.service';

describe('ManageEmployeesService', () => {
  let service: ManageEmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageEmployeesService],
    }).compile();

    service = module.get<ManageEmployeesService>(ManageEmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
