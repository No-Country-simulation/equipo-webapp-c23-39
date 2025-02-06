import { FC, ReactNode, useState } from 'react';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl: 'http://localhost:3000/admin' })
    } catch(err){
      setIsLoading(false);
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <Button 
       disabled={isLoading} 
       onClick={loginWithGoogle} 
       className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 border border-transparent hover:border-blue-500"
    >
      {isLoading &&(
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 animate-spin text-white-500"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      )}
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
