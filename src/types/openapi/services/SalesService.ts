/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangeSaleDto } from '../models/ChangeSaleDto';
import type { Sale } from '../models/Sale';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SalesService {
    /**
     * @returns Sale OK
     * @throws ApiError
     */
    public static getApiSales(): CancelablePromise<Array<Sale>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Sales',
        });
    }
    /**
     * @param requestBody
     * @returns Sale OK
     * @throws ApiError
     */
    public static postApiSales(
        requestBody?: ChangeSaleDto,
    ): CancelablePromise<Sale> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Sales',
            body: requestBody,
            mediaType: 'application/json;odata.metadata=minimal;odata.streaming=true',
        });
    }
    /**
     * @param id
     * @returns Sale OK
     * @throws ApiError
     */
    public static getApiSales1(
        id: number,
    ): CancelablePromise<Sale> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Sales/{id}',
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
    public static putApiSales(
        id: number,
        requestBody?: ChangeSaleDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Sales/{id}',
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
    public static deleteApiSales(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Sales/{id}',
            path: {
                'id': id,
            },
        });
    }
}
