import { httpApiRequest, httpRequest } from "@/lib/request";
import { raffleData } from "@/types/raffle";


const endpoint = '/raffles';

export const allRaffles = ({ params }: Record<string, string>) => {

    return httpApiRequest({
        url: endpoint,
        method: 'GET',
        params: params
    })
}

export const saveRaffle = (data: raffleData) => httpApiRequest({
    url: endpoint,
    method: 'post',
    data
});

export const getRaffle = (id: string) => {

    return httpApiRequest({
        url: `${endpoint}/${id}`,
        method: 'GET',
    })
}

export const getParticipants = (id: string) => {
    return httpApiRequest({
        url: `${endpoint}/${id}/participants`,
        method: 'GET',
    })
}

export const getPrizes = (id: string) => {
    return httpApiRequest({
        url: `${endpoint}/${id}/prizes`,
        method: 'GET',
    })
}

export const getCriterias = (id: string) => {
    return httpApiRequest({
        url: `${endpoint}/${id}/criterias`,
        method: 'GET',
    })
}

export const saveParticipants = (id: string, data: any) => httpApiRequest({
    url: `${endpoint}/${id}/participants`,
    method: 'post',
    data
})