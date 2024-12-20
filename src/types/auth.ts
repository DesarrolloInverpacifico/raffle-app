import { ZodType, z } from 'zod'

export type FormLoginData = {
    username: string
    password: string
}


export type UserLoggedType = {
    username: string,
    name: string
}

export const LoginSchema: ZodType<FormLoginData> = z.object({
    username: z.string().min(2, { message: 'El usuario es requerido' }),
    password: z.string().min(8, { message: 'La contraseña debe tener minimo 8 caracteres' })
})