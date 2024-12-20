import { z, ZodType } from "zod";

export interface RaffleType {
    id: number;
    type: string,
    attributes: {
        name: string;
        description?: string;
        date: string;
        created_at: string;
        updated_at: string;
    },
    relationships?: []
}

export type raffleData = {
    name: string;
};

export const raffleSchema: ZodType<raffleData> = z.object({
    name: z.string().min(2, { message: "El usuario es requerido" }),
});