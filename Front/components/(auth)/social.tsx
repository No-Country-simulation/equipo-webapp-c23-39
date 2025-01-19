"use client";


import {FcGoogle} from "react-icons/fc";
import { FaFacebook } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import {FaGithub} from "react-icons/fa"
import { Button } from "../ui/button";



export const Social = () =>{
    return(
        <div className="flex items-center w-full gap-x-2">
            <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() =>{}}
            >
                {/* <FaFacebook 
                color="#1877F2"
                className="h-5 w-5"/>
            </Button>
            <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() =>{}}
            > */}
                <FcGoogle className="h-5 w-5"/>
            </Button>
            {/* <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() =>{}}
            >
                <FaApple className="h-5 w-5"/>
            </Button> */}
        </div>
    );
};