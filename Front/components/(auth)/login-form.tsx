"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CardWrapper } from "@/components/(auth)/card-wrapper";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { Button } from "../ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import {FormSuccess} from "@/components/form-sucess";
import { login } from "@/actions/login";


interface PasswordInputProps {
    control: Control<any>; 
}


export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:"",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
       setError("");
       setSuccess("");


       startTransition(() =>{
        login(values)
         .then((data) =>{
            setError(data.error);
            setSuccess(data.sucess);
         });
       });
    };


    return(
        <div className="h-screen flex items-center justify-center"
        style={{ backgroundImage: 'url("/pantalla-inicial.jpg")',
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
            
        }}>
            <div className="w-full max-w-md  p-6 rounded-lg ">
                <CardWrapper
                    headerLabel="Bienvenido de nuevo"
                    backButtonLabel="¿No tienes una cuenta?"
                    backButtonHref="/auth/register"
                    showSocial
                    isLogin={true}
                >
                 <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="correo@email.com"
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="******"
                                                        type={passwordVisible ? "text" : "password"} // Cambia entre tipo "text" y "password"
                                                    />
                                                </FormControl>
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                    onClick={() => setPasswordVisible(!passwordVisible)} // Alterna la visibilidad de la contraseña
                                                >
                                                    {passwordVisible ? (
                                                        <FaEyeSlash size={20} />
                                                    ) : (
                                                        <FaEye size={20} />
                                                    )}
                                                </button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <Button disabled={isPending} type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        </div>
    );
};