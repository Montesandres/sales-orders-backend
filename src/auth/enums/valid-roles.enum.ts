import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
    sadmin = 'sadmin',
    adminManager = 'adminManager',
    adminEmployee = 'adminEmployee',
    employee = 'employee',
    deliveryEmployee = 'deliveryEmployee',
    user = 'user'
}

registerEnumType(ValidRoles,{name:'ValidRoles', description:'roles that exist'})