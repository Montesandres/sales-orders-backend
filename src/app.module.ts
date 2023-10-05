import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver } from "@nestjs/apollo";
import { join } from "path";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { OrdersModule } from './orders/orders.module';
import { DepartmentsModule } from './departments/departments.module';
import { CitiesModule } from './cities/cities.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersProductsModule } from './orders-products/orders-products.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { EmployeeTypesModule } from './employee-types/employee-types.module';
import { DeliveryEmployeeModule } from './delivery-employee/delivery-employee.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRootAsync({
      driver:ApolloDriver,
      imports:[AuthModule],
      inject:[JwtService],
      useFactory: async(jwtService:JwtService)=>({
          playground:false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          autoSchemaFile: join(process.cwd(), "src/schema.gql"),
          context({req}){
            const token = req.headers.authorization?.replace('Bearer','').trim();
            const payload = jwtService.decode(token)
            if (!token) throw Error('Token needed')
            if (!payload) throw Error('Token not valid')
          }
      })
    }),

    /////// static schema /////////////7
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   playground: false,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    //   autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_EXTERNAL_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    EmployeesModule,
    UsersModule,
    AuthModule,
    OrdersModule,
    DepartmentsModule,
    CitiesModule,
    CustomersModule,
    ProductsModule,
    CategoriesModule,
    OrdersProductsModule,
    OrderDetailsModule,
    EmployeeTypesModule,
    DeliveryEmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
