/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from './Customer';
import type { Product } from './Product';
import type { SalesPerson } from './SalesPerson';
export type Sale = {
    id?: number;
    productId: number;
    salesPersonId: number;
    customerId: number;
    date: string;
    product?: Product;
    salesPerson?: SalesPerson;
    customer?: Customer;
};

