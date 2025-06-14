/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from './Product';
export type Discount = {
    id?: number;
    productId: number;
    beginDate: string;
    endDate: string;
    percentage: number;
    product?: Product;
};

