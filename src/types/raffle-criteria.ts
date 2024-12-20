export interface RaffleCriteria {
    id: number;
    type: string;
    attributes: {
        prize: string,
        position: number,
        created_at: string,
        updated_at: string,
    }
}