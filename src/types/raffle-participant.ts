export interface RaffleParticipant {
    id: number;
    type: string;
    attributes: {
        name: string,
        email: string,
        identification_number: string,
        is_winner: boolean,
        won_at: string,
        created_at: string,
        updated_at: string,
    }
}