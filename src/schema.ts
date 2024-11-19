import { z } from 'zod';

export const userRegisterSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O campo nome precisa ser preenchido' })
    .max(255, { message: 'O nome deve ter no máximo 255 caracteres' }),
  email: z
    .string()
    .min(1, { message: 'O campo email precisa ser preenchido' })
    .email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(8, { message: 'O campo senha deve ter no mínimo 8 caracteres' }),
  password_confirmation: z.string().min(8, {
    message: 'O campo confirmação de senha deve ter no mínimo 8 caracteres',
  }),
  phone: z
    .string()
    .min(1, { message: 'O campo número de celular precisa ser preenchido' })
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
      message: 'Número de celular inválido',
    }),
  cpf: z
    .string()
    .min(1, { message: 'O campo CPF precisa ser preenchido' })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: 'Número de celular inválido',
    }),
  zipcode: z
    .string()
    .min(1, { message: 'O campo CEP precisa ser preenchido' })
    .regex(/^\d{5}-\d{3}$/, {
      message: 'CEP inválido',
    }),
  address: z
    .string()
    .min(1, { message: 'O campo endereço precisa ser preenchido' }),
  city: z.string().min(1, { message: 'O campo cidade precisa ser preenchido' }),
  terms: z.boolean().refine((value) => value === true, {
    message: 'Você precisa aceitar os termos de uso',
  }),
});

export type UserRegister = z.infer<typeof userRegisterSchema>;
