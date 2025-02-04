import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
    isLogin?: boolean; // Prop adicional para determinar el tipo de encabezado
}

export const Header = ({ 
    label,  
    isLogin = true, // Valor predeterminado para isLogin
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn(
                "text-2xl font-semibold", 
                font.className,
            )}>
                {isLogin ? "Iniciar Sesión" : "Regístrate"} {/* Cambia el texto basado en isLogin */}
            </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    );
};
