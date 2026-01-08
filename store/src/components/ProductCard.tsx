import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "../types"; // Asegúrate de que este import coincida con tu archivo de tipos

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      {/* 1. SECCIÓN DE IMAGEN */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.images[0] || "https://placehold.co/400x400?text=No+Image"} 
          alt={product.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 2. SECCIÓN DE CONTENIDO (Nombre y Precio) */}
      <CardContent className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <span className="font-bold text-lg text-blue-600">
            ${product.price}
          </span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
      </CardContent>

      {/* 3. SECCIÓN DE ACCIÓN (Botón) */}
      <CardFooter className="p-4 pt-0">
        <Link to={`/product/${product.id}`} className="w-full">
          <Button className="w-full">
            Ver Detalle
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}