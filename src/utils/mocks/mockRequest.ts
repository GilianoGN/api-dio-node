import type { Request } from "express";
import type { Params } from 'express-serve-static-core';

interface mockRequest {
    params?: Params;
    body?: any;
}

export function makeMockRequest({ params, body}: mockRequest): Request{
    const request = {
        params: params || {},
        body: body || {}
    } as unknown;

    return request as Request;
}