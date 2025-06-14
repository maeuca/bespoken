/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * @returns Product OK
     * @throws ApiError
     */
    public static getApiProducts(): CancelablePromise<Array<Product>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Products',
        });
    }
    /**
     * @param requestBody
     * @returns Product OK
     * @throws ApiError
     */
    public static postApiProducts(
        requestBody?: Product,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Products',
            body: requestBody,
            mediaType: 'application/json;odata.metadata=minimal;odata.streaming=true',
        });
    }
    /**
     * @param id
     * @returns Product OK
     * @throws ApiError
     */
    public static getApiProducts1(
        id: number,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Products/{id}',
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
    public static putApiProducts(
        id: number,
        requestBody?: Product,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Products/{id}',
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
    public static deleteApiProducts(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Products/{id}',
            path: {
                'id': id,
            },
        });
    }
}
