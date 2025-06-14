/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangeDiscountDto } from '../models/ChangeDiscountDto';
import type { Discount } from '../models/Discount';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DiscountsService {
    /**
     * @returns Discount OK
     * @throws ApiError
     */
    public static getApiDiscounts(): CancelablePromise<Array<Discount>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Discounts',
        });
    }
    /**
     * @param requestBody
     * @returns Discount OK
     * @throws ApiError
     */
    public static postApiDiscounts(
        requestBody?: ChangeDiscountDto,
    ): CancelablePromise<Discount> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Discounts',
            body: requestBody,
            mediaType: 'application/json;odata.metadata=minimal;odata.streaming=true',
        });
    }
    /**
     * @param id
     * @returns Discount OK
     * @throws ApiError
     */
    public static getApiDiscounts1(
        id: number,
    ): CancelablePromise<Discount> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Discounts/{id}',
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
    public static putApiDiscounts(
        id: number,
        requestBody?: ChangeDiscountDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Discounts/{id}',
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
    public static deleteApiDiscounts(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Discounts/{id}',
            path: {
                'id': id,
            },
        });
    }
}
