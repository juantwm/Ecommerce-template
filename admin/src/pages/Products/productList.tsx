import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Plus, Image as ImageIcon, Pencil } from "lucide-react"; // Iconos

export default function ProductList() {
  const [products, setProducts] = useState([]);

  // 1. Cargar productos al iniciar
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  // 2. Función para eliminar
  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Actualizar la lista visualmente sin recargar
        setProducts(products.filter((p: any) => p.id !== id));
      } else {
        alert("Error al eliminar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Productos</CardTitle>
          {/* Botón que lleva al formulario que ya hiciste */}
          <Link to="/products/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    No hay productos cargados.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-10 w-10 object-cover rounded"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-slate-200 rounded flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-slate-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    {/* Ajusta 'category.name' según cómo te llegue el dato del backend */}
                    <TableCell>{product.category?.name || "Sin Cat."}</TableCell>
                    <TableCell className="text-right space-x-2"> {/* space-x-2 separa los botones */}
                        {/* Botón EDITAR */}
                        <Link to={`/products/edit/${product.id}`}>
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>

                        {/* Botón ELIMINAR */}
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>

                      </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}