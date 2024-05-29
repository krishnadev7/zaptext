import {z} from 'zod'

export const ThreadValidation = z.object({
    thread: z.string().min(3,{message: "Minimum 3 charachters"}),
    accountId: z.string()
})

export const CommentValidation = z.object({
    text: z.string().min(3,{message: "Minimum 3 characters"}) 
})