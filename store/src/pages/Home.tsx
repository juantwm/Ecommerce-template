import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/useCartStore";

// Definimos la interfaz básica del producto para TypeScript
interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  stock: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // Fetch a tu Backend
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    alert("¡Agregado al carrito!"); // Feedback temporal
  };

  if (loading) {
    return <div className="text-center py-20">Cargando productos...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner o Título Principal */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Nuestros Productos</h1>
        <p className="text-gray-500">Encuentra lo mejor al mejor precio</p>
      </div>

      {/* Grilla de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
            
            {/* Imagen del producto */}
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
            <Link to={`/product/${product.id}`} className="w-full h-full">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Sin imagen</span>
              )}
              </Link>
            </div>

            {/* Información */}
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg truncate" title={product.name}>
              <Link to={`/product/${product.id}`} className="hover:underline hover:text-blue-600 transition-colors">
                {product.name}
                </Link>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 pt-2 flex-grow">
              <p className="text-xl font-bold text-blue-600">${product.price}</p>
              {product.stock <= 0 && (
                <p className="text-xs text-red-500 mt-1">Sin Stock</p>
              )}
            </CardContent>

            {/* Botón de Acción */}
            <CardFooter className="p-4 pt-0">
              <Button 
                  className="w-full" 
                  disabled={product.stock <= 0}
                  onClick={() => handleAddToCart(product)}
                >
                  {product.stock > 0 ? "Añadir al Carrito" : "Agotado"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}