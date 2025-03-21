import { z, ZodType } from "zod";

export interface People {
    id: number;
    type: string;
    attributes: {
        name: string,
        lastName: string,
        identification_number: string,
        created_at: string,
        updated_at: string,
    }
}

export type assistanceData = {
    identification: string;
};

export const assistenceSchema: ZodType<assistanceData> = z.object({
    identification: z.string().min(1, { message: "El usuario es requerido" }),
});