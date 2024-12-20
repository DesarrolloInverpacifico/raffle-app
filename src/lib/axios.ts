
import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
    },
    withCredentials: true,
    withXSRFToken: true,
})

const axios_api = Axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v${process.env.NEXT_PUBLIC_BACKEND_API_VERSION}`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
    },
    withCredentials: true,
    withXSRFToken: true,
})

export { axios, axios_api }