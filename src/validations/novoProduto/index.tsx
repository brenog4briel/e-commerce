import {z} from "zod"

export const novoProdutoSchema = z.object({
    nome: z
        .string({required_error:"O nome é obrigatório"})
        .trim()
        .min(3,{message:"Nome inválido"})
        .max(255,{message:"O nome não pode possuir mais de 255 caracteres"}),
    proprietario: z
        .string({required_error:"O proprietário é obrigatório"})
        .trim()
        .max(50,{message:"O Proprietário não pode possuir mais de 50 caracteres"}),
})

export type NovoProdutoSchema = z.infer<typeof novoProdutoSchema>;
