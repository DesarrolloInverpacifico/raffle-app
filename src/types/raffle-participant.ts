export interface RaffleParticipant {
    id: number;
    type: string;
    attributes: {
        name: string,
        lastName: string,
        identification_number: string,
        is_winner: boolean,
        is_active: string,
        created_at: string,
        updated_at: string,
    }
}