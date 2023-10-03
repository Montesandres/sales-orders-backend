import { Test, TestingModule } from "@nestjs/testing";
import { ManageEmployeesResolver } from "./manage-employees.resolver";
import { ManageEmployeesService } from "./manage-employees.service";

describe("ManageEmployeesResolver", () => {
  let resolver: ManageEmployeesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageEmployeesResolver, ManageEmployeesService]
    }).compile();

    resolver = module.get<ManageEmployeesResolver>(ManageEmployeesResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
