import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table"; // Asegúrate que esta ruta coincida con donde Shadcn instaló la UI
import { Button } from "@/components/ui/button";

// Definimos la "forma" de un producto para que TypeScript no se queje
interface Product {
    id: number;
    name: string;
    price: string; // A veces viene como string desde la DB decimal
    stock: number;
    category: {
    name: string;
    };
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

  // 1. Cargar productos al entrar a la página
    useEffect(() => {
        fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error cargando productos:", err));
    }, []);

  // 2. Función para eliminar
const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try 
    {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            // Actualizar la tabla visualmente quitando el producto borrado
            setProducts(products.filter((product) => product.id !== id));
        } else {
            alert("Error al eliminar");
        }
    } 
    catch (error) 
    {
        console.error(error);
    }
};

return (
    <div className="p-6">
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Productos</h1>
        <Link to="/products/new">
            <Button>+ Crear Producto</Button>
        </Link>
    </div>

    <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                    {/* Aquí usamos el include: { category: true } del backend */}
                    <span className="bg-slate-100 px-2 py-1 rounded text-xs">
                        {product.category?.name || "Sin Cat"}
                    </span>
                </TableCell>
                <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right gap-2">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}