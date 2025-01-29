"use server";

import * as z from "zod";
import {LoginSchema} from "@/schemas";


export const login = async (values: z.infer<typeof LoginSchema>) =>{
 const validatedFields = LoginSchema.safeParse(values);   
 console.log(values);

 if (!validatedFields.success){
    return {error: "Invalid fields!"};
 }
 return {sucess: "Email sent!"};
};