import { z } from "zod";

export const loginSchema = z.object({
  emailOrUsername: z.string().min(1, "Email atau Username wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name wajib diisi"),
    lastName: z.string().min(1, "Last name wajib diisi"),
    countryCode: z.string().min(1, "Country code wajib diisi"),
    phoneNumber: z.string().min(6, "Nomor telepon minimal 6 karakter"),
    country: z.string().min(1, "Country wajib dipilih"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Confirm password wajib diisi"),
    about: z.string().min(1, "About yourself wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan confirm password tidak sama",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
