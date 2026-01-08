import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button"; // Usamos componentes de Shadcn

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo / Nombre de la tienda */}
        <Link to="/" className="text-xl font-bold tracking-tight">
            Mi Tienda
        </Link>

        {/* Enlaces y Carrito */}
        
        <div className="flex items-center gap-4">
          {/* Enlaces de navegación (puedes agregar más luego) */}
          <Link to="/" className="text-sm font-medium hover:text-blue-600">
            Inicio
          </Link>
          
          {/* Botón del Carrito */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {/* Aquí luego pondremos un 'badge' con el número de items */}
              {/* <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span> */}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}