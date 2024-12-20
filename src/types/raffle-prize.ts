export interface RafflePrize {
    id: number;
    type: string;
    attributes: {
        name: string,
        description?: string,
        created_at: string,
        updated_at: string,
    }
}