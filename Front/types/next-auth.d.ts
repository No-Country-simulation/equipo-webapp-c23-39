
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; 
    email: string; 
    
  }

  interface Session {
    user: User; 
    accessToken?: string; 
  
  }

  interface JWT {
    accessToken?: string;
   
  }
}

declare module "next-auth" {
    interface Callbacks {
      signIn(params: {
        user: User;
        account: Account;
        profile: Profile;
        email?: string;
        credentials?: Record<string, any>;
      }): Promise<boolean>;
  
      redirect(params: {
        url: string;
        baseUrl: string;
      }): Promise<string>;
  
      session(params: {
        session: Session;
        token: JWT;
        user?: User;
      }): Promise<Session>;
  
      jwt(params: {
        token: JWT;
        user?: User;
        account?: Account;
        profile?: Profile;
        isNewUser?: boolean;
      }): Promise<JWT>;
    }
  }