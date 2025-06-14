/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from '../models/Customer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomersService {
    /**
     * @returns Customer OK
     * @throws ApiError
     */
    public static getApiCustomers(): CancelablePromise<Array<Customer>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Customers',
        });
    }
    /**
     * @param requestBody
     * @returns Customer OK
     * @throws ApiError
     */
    public static postApiCustomers(
        requestBody?: Customer,
    ): CancelablePromise<Customer> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Customers',
            body: requestBody,
            mediaType: 'application/json;odata.metadata=minimal;odata.streaming=true',
        });
    }
    /**
     * @param id
     * @returns Customer OK
     * @throws ApiError
     */
    public static getApiCustomers1(
        id: number,
    ): CancelablePromise<Customer> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Customers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putApiCustomers(
        id: number,
        requestBody?: Customer,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Customers/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json;odata.metadata=minimal;odata.streaming=true',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiCustomers(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Customers/{id}',
            path: {
                'id': id,
            },
        });
    }
}
