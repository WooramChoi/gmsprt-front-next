import axios, { AxiosRequestConfig, Method, isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

function getAxiosConfig(method: string, request: NextRequest, parts: string[]) {
    console.log(`${method} ${request.nextUrl.pathname}`);

    let url = 'http://127.0.0.1:8080/';
    url += parts.join('/');

    // const axios = axiosFactory(req.user);
    let config: AxiosRequestConfig<any> = {
        url: url,
        method: method as Method
    };

    if (method === 'GET') {
        config.params = request.nextUrl.searchParams;
    } else {
        config.data = request.body
    }

    return config;
}

function handleError(error: any) {
    let body: any;
    let init: ResponseInit;
    if (isAxiosError(error)) {
        if (error.response) {
            console.error(`AXIOS_RESPONSE[${error.response.status}]`);
            if (error.response.headers['content-type'] === 'application/json') {
                body = error.response.data;
            } else {
                console.debug(`content-type: ${error.response.headers['content-type']}`);
                body = {message: error.message};
            }
            init = {status: error.response.status};
        } else if (error.request) {
            console.error(`AXIOS_REQUEST[${error.message}]`);
            console.error(error.request);
            body = {message: error.message};
            init = {status: 500};
        } else {
            console.error(`AXIOS[${error.message}]`)
            console.error(error);
            body = {message: error.message};
            init = {status: 500};
        }
    } else {
        console.error(`NOT_AXIOS`);
        console.error(error);
        body = {message: 'Internal Server Error'};
        init = {status: 500};
    }

    return NextResponse.json(body, init);
}

export async function GET(request: NextRequest, { params }: { params: { parts: string[] } }) {

    let config = getAxiosConfig('GET', request, params.parts);

    try {
        let response = await axios(config);
        return NextResponse.json(response.data, {status: 200});
    } catch(error) {
        return handleError(error);
    }
}

export async function POST(request: NextRequest, { params }: { params: { parts: string[] } }) {

    let config = getAxiosConfig('POST', request, params.parts);

    try {
        let response = await axios(config);
        return NextResponse.json(response.data, {status: 200});
    } catch(error) {
        return handleError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { parts: string[] } }) {

    let config = getAxiosConfig('PATCH', request, params.parts);

    try {
        let response = await axios(config);
        return NextResponse.json(response.data, {status: 200});
    } catch(error) {
        return handleError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { parts: string[] } }) {

    let config = getAxiosConfig('DELETE', request, params.parts);

    try {
        let response = await axios(config);
        return NextResponse.json(response.data, {status: 200});
    } catch(error) {
        return handleError(error);
    }
}