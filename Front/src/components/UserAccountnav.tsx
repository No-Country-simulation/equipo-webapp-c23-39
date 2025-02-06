'use client';

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { PiSignOutBold } from "react-icons/pi";

const UserAccountnav = () => {
  return (
    <Button 
        onClick={() => 
        signOut({
         redirect: true,
         callbackUrl: `${window.location.origin}/sign-in`,
      })
    } 
    variant='destructive'
    >
    <PiSignOutBold />
  </Button>
  );
};

export default UserAccountnav;
