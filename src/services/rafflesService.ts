import { httpApiRequest } from "@/lib/request";
import { raffleData } from "@/types/raffle";


const endpoint = '/raffles';

export const allRaffles = () => {

    return httpApiRequest({
        url: endpoint,
        method: 'GET',
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

export const resetParticipants = (id: string) => {
    return httpApiRequest({
        url: `${endpoint}/${id}/resetParticipants`,
        method: 'POST',
    });
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

export const saveParticipants = (id: string, data: FormData) => httpApiRequest({
    url: `${endpoint}/${id}/participants`,
    method: 'post',
    data
})

export const updateWinner = (id: string, data: { people_id: string }) => httpApiRequest({
    url: `${endpoint}/${id}/winner`,
    method: 'put',
    data
})