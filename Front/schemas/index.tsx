import * as  z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        // message: "El email es obligatorio",
    }),
    password: z.string().min(6).max(8).regex(/^(?=.*[a-zA-Z])(?=.*[\W_]).*$/,
        // "La contraseña debe contener al menos un alfenumerico y un caracter especial"
    )  
});


export const RegisterSchema = z.object({
    email: z.string().email({
        // message: "El email es obligatorio",
    }),
    password: z.string().min(6).max(8).regex(/^(?=.*[a-zA-Z])(?=.*[\W_]).*$/,
        // "La contraseña debe contener al menos un alfenumerico y un caracter especial"
    ),
    name: z.string().min(3, {
        message:"Name is required",
    }),  
});
