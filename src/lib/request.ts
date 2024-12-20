import { AxiosRequestConfig } from "axios";
import { axios, axios_api } from "./axios";

export const httpRequest = async ({ url, method, data, params }: AxiosRequestConfig): Promise<any> => {
    const config = {
        url,
        method,
        data,
        params
    };

    return new Promise((resolve, reject) => {
        axios(config)
            .then(resp => resolve(resp.data))
            .catch(err => reject(err.response))
    })
};

export const httpApiRequest = async ({ url, method, data, params }: AxiosRequestConfig): Promise<any> => {
    const config = {
        url,
        method,
        data,
        params
    };

    return new Promise((resolve, reject) => {
        axios_api(config)
            .then(resp => resolve(resp.data))
            .catch(err => reject(err.response))
    })
};