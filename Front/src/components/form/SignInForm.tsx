'use client';

import { useState } from "react";
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Se ha producido un error",
        variant: 'destructive'
      });
    } else {
      router.refresh();
      router.push('/admin');
    }
  };

  return (
    <div className="p-8  rounded-lg  w-full max-w-md"> {/* Padding y estilos */}
      <h1 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h1> {/* Título */}
      <Form {...form}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
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
                  <FormLabel>Contraseña</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
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
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-6" type="submit">
            Iniciar sesión
          </Button>
          <p className="text-center text-sm text-gray-600 mt-2">
          ¿No tienes una cuenta?&nbsp;
          <Link className="text-blue-500 hover:underline" href="/sign-up">
            Regístrate
          </Link>
        </p>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          o inicia con
        </div>
        <GoogleSignInButton>
          <FcGoogle className="h-5 w-5" />
        </GoogleSignInButton>
        
      </Form>
    </div>
  );
};

export default SignInForm;
