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
        .min(10,{message:"Proprietário inválido"})
        .max(50,{message:"O Proprietário não pode possuir mais de 50 caracteres"}),
    categoria: z
        .string({required_error:"A categoria é obrigatória"})
        .trim()
        .min(3,{message:"Categoria inválida"})
        .max(50,{message:"A categoria não pode possuir mais de 50 caracteres"}),
})

export type NovoProdutoSchema = z.infer<typeof novoProdutoSchema>;
