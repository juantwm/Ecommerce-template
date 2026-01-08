import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react"; // Asegúrate de tener lucide-react instalado
import type { Product } from "../types"; // Importamos el tipo

export default function ProductDetail() {
  const { id } = useParams(); // Obtenemos el ID de la URL (ej: /product/5)
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscamos el producto individual en el backend
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Cargando producto...</div>;
  
  if (!product) return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-bold text-red-500">Producto no encontrado 😢</h2>
      <Link to="/">
        <Button variant="link">Volver a la tienda</Button>
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Botón Volver */}
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-black mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* COLUMNA IZQUIERDA: Imagen */}
        <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center aspect-square">
          <img 
            src={product.images?.[0] || "https://placehold.co/600x600?text=No+Image"} 
            alt={product.name}
            className="object-cover w-full h-full max-h-[600px]"
          />
        </div>

        {/* COLUMNA DERECHA: Información */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-blue-600 mt-2">${product.price}</p>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="pt-4 border-t">
            <div className="flex items-center gap-4 mb-4">
               <span className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                 {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Sin Stock'}
               </span>
            </div>

            {/* Botón de Añadir al Carrito (Por ahora solo visual) */}
            <Button size="lg" className="w-full md:w-auto" disabled={product.stock <= 0}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock > 0 ? "Agregar al Carrito" : "Agotado"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}