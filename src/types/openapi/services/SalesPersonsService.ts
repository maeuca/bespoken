/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SalesPerson } from '../models/SalesPerson';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SalesPersonsService {
    /**
     * @returns SalesPerson OK
     * @throws ApiError
     */
    public static getApiSalesPersons(): CancelablePromise<Array<SalesPerson>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/SalesPersons',
        });
    }
    /**
     * @param requestBody
     * @returns SalesPerson OK
     * @throws ApiError
     */
    public static postApiSalesPersons(
        requestBody?: SalesPerson,
    ): CancelablePromise<SalesPerson> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/SalesPersons',
            body: requestBody,
            mediaType: 'application/json;odata.metadata=minimal;odata.streaming=true',
        });
    }
    /**
     * @param id
     * @returns SalesPerson OK
     * @throws ApiError
     */
    public static getApiSalesPersons1(
        id: number,
    ): CancelablePromise<SalesPerson> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/SalesPersons/{id}',
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
    public static putApiSalesPersons(
        id: number,
        requestBody?: SalesPerson,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/SalesPersons/{id}',
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
    public static deleteApiSalesPersons(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/SalesPersons/{id}',
            path: {
                'id': id,
            },
        });
    }
}
