import {z} from "zod"

export const changeProfileSchema = z.object({
    nome: z
        .string({required_error:"O nome é obrigatório"})
        .trim()
        .min(3,{message:"Nome inválido"})
        .max(255,{message:"O nome não pode possuir mais de 255 caracteres"}),
    email: z
        .string({required_error:"O email é obrigatório"})
        .trim()
        .min(10,{message:"O email precisa ter no mínimo 10 caracteres"})
        .max(255,{message:"O email não pode possuir mais de 255 caracteres"}),
    endereco: z
        .string({required_error:"O endereco é obrigatória"})
        .trim()
        .min(10,{message:"Endereço inválido"})
        .max(50,{message:"O endereco não pode possuir mais de 50 caracteres"}),
    CEP: z
        .string({required_error:"O CEP é obrigatório"})
        .trim()
        .min(8,{message:"CEP inválido"}),
})

export type ChangeProfileSchema = z.infer<typeof changeProfileSchema>;