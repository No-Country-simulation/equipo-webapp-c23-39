"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "./header";
import { BackButton } from "./back-button";
import GoogleSignInButton from '../GoogleSignInButton'; 
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  isLogin?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  isLogin = true,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} isLogin={isLogin} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter className="flex justify-center">
          <GoogleSignInButton>
            <Social />
          </GoogleSignInButton>
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
