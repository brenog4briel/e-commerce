import {z} from "zod"

export const registroSchema = z.object({
    nome: z
        .string({required_error:"O nome é obrigatório"})
        .trim()
        .min(3,{message:"Nome inválido"})
        .max(255,{message:"O nome não pode possuir mais de 255 caracteres"}),
    senha: z
        .string({required_error:"A senha é obrigatória"})
        .trim()
        .min(6,{message:"A senha precisa ser mais robusta"})
        .max(255,{message:"A senha não pode possuir mais de 255 caracteres"}),
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
        .min(14,{message:"CEP inválido"}),
    imagem: z
        .string({required_error:"A senha é obrigatória"})
        .trim()
})

export type RegistroSchema = z.infer<typeof registroSchema>;