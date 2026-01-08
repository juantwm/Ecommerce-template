import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button"; // Usamos componentes de Shadcn
import { useCartStore } from "@/lib/useCartStore";

export default function Navbar() {

  const items = useCartStore((state) => state.items);

  // Sumamos la cantidad de cada item para obtener el total real
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
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
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}