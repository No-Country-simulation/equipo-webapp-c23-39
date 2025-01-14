const AuthLayout = ({children}: any) =>{
    return(
        <div>
            <nav className="bg-red-500 text-white">
                This is auth navbar
            </nav>
            {children}
        </div>
    );
}

export default AuthLayout;