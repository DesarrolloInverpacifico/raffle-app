import { httpApiRequest } from "@/lib/request";


const endpoint = '/people';

export const allPeople = ({ params }: Record<string, string>) => {

    return httpApiRequest({
        url: endpoint,
        method: 'GET',
        params: params
    })
}

export const uploadByFilePeople = (data: any) => httpApiRequest({
    url: `${endpoint}/upload`,
    method: 'post',
    data
})

export const checkAssistance = (data: any) => httpApiRequest({
    url: `${endpoint}/checkAssistance`,
    method: 'post',
    data
})

