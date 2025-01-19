"use server";

import * as z from "zod";
import {RegisterSchema} from "@/schemas";


export const register = async (values: z.infer<typeof RegisterSchema>) =>{
 const validatedFields = RegisterSchema.safeParse(values);   
 console.log(values);

 if (!validatedFields.success){
    return {error: "Invalid fields!"};
 }
 return {sucess: "Email sent!"};
};