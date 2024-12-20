import { httpApiRequest, httpRequest } from "@/lib/request";
import { FormLoginData } from "@/types/auth";

// const endpointAuth = `/user`;

export const getCsrf = () => httpRequest({
    url: '/sanctum/csrf-cookie',
    method: 'get'
});

export const requestLogin = (data: FormLoginData) => httpRequest({
    url: '/login',
    method: 'post',
    data
});

export const requestLogOut = () => httpRequest({
    url: '/logout',
    method: 'post'
});

export const requestMe = () => httpApiRequest({
    url: '/me',
    method: 'get'
});