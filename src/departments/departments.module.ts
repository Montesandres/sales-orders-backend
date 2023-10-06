import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsResolver } from './departments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';

@Module({
  providers: [DepartmentsResolver, DepartmentsService],
  imports:[TypeOrmModule.forFeature([Department])]
})
export class DepartmentsModule {}
