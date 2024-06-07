import {z} from "zod"

export const loginSchema = z.object({
    email: z
        .string({required_error:"O email é obrigatório"})
        .trim()
        .min(10,{message:"O email precisa ter no mínimo 10 caracteres"})
        .max(255,{message:"O email não pode possuir mais de 255 caracteres"}),
    senha: z
        .string({required_error:"A senha é obrigatória"})
        .trim()
        .min(10,{message:"A senha precisa ter no mínimo 10 caracteres"})
        .max(255,{message:"A senha não pode possuir mais de 255 caracteres"})
})

export type LoginSchema = z.infer<typeof loginSchema>;