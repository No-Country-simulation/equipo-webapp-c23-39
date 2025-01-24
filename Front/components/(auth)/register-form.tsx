"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CardWrapper } from "@/components/(auth)/card-wrapper";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas";
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
import { FormSuccess} from "@/components/form-sucess";
import { register } from "@/actions/register";


interface PasswordInputProps {
    control: Control<any>; 
}


export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [passwordVisible, setPasswordVisible] = useState(false);


    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues:{
            email:"",
            password:"",
            name:"",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
       setError("");
       setSuccess("");


       startTransition(() =>{
        register(values)
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
            <div className="w-full max-w-md  p-6 rounded-lg "
           >
        <CardWrapper 
        headerLabel="Asi no pierdes el historial de tus charlas con Migo-Trip"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
        isLogin={false}
        >
        <Form {...form}>
            <form 
             onSubmit={form.handleSubmit(onSubmit)}
             className="space-y-6"
            >
            <div className="space-y-4">
            <FormField
                 control={form.control}
                 name="name"
                 render={({field}) =>(
                    <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                         <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Nombre Completo"
                         />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                 )}
                />
                <FormField
                 control={form.control}
                 name="email"
                 render={({field}) =>(
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
                                        type={passwordVisible ? "text" : "password"} 
                                    />
                                </FormControl>
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setPasswordVisible(!passwordVisible)} 
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
            <FormError message={error}/>
            <FormSuccess message={success} />
            <Button
             disabled={isPending}
             type="submit"
             className="w-full"
            >
                 Sign up
            </Button>
            </form>
        </Form>
        </CardWrapper>
        </div>
        </div>
    )
}