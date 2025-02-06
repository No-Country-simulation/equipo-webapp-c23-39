'use client';

import { useForm } from 'react-hook-form';
import { useState, useTransition } from "react";
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
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password
      })
    })
    if(response.ok){
      router.push('/admin')
    } else{
      toast({
        title: "Error",
        description: "Se ha producido un error",
        variant: 'destructive'
      })
    }
  };

  return (
    <div className="p-2  rounded-lg">
    <h1 className="text-2xl font-bold text-center mb-6">Regístrate</h1> {/* Título */}  
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name="username"
            render={({field}) =>(
              <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
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
          
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Re-Enter your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full bg-blue-500 hover:bg-blue-600 text-white mt-6' type='submit'>
        Regístrate
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        o
      </div>
      <GoogleSignInButton>
          <FcGoogle className="h-5 w-5" />
      </GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        ¿Ya tienes una cuenta?&nbsp;
        <Link className='text-blue-700 hover:underline' href='/sign-in'>
          Inicia Seccion
        </Link>
      </p>
    </Form>
    </div>
  );
};

export default SignUpForm;
