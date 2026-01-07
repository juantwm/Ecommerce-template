import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateProduct() {
    const navigate = useNavigate();
  
  // 1. Estado para guardar las categorías que traemos del backend
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        imageUrl: "",
    });

  // 2. Fetch para cargar las categorías al abrir la página
    useEffect(() => {
        // Asegúrate de que esta URL sea la correcta en tu backend
        fetch("http://localhost:3000/api/categories")
        .then((res) => res.json())
        .then((data) => {
            setCategories(data); // Guardamos la lista en el estado
        })
        .catch((error) => console.error("Error cargando categorías:", error));
    }, []);

  // Modificado para aceptar select y textarea también
    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => 
    {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try 
        {
            const response = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                stock: Number(formData.stock),
                categoryId: Number(formData.categoryId), // Toma el valor seleccionado
                images: formData.imageUrl ? [formData.imageUrl] : [],
                }),
            });

            if (response.ok) 
            {
                alert("Producto creado!");
                navigate("/products");
            } 
            else
            {
            const error = await response.json();
            alert("Error: " + error.error);
            }
        } 
        catch (error) 
        {
            console.error("Error de red:", error);
        }
    };

    return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Nuevo Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nombre</label>
              <Input
                name="name"
                onChange={handleChange}
                placeholder="Ej: Zapatillas"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Descripción</label>
              <Input
                name="description"
                onChange={handleChange}
                placeholder="Detalles..."
              />
            </div>

            {/* Input para la Imagen */}
            <div>
              <label className="text-sm font-medium">Imagen (URL)</label>
              <Input
                name="imageUrl"
                onChange={handleChange}
                placeholder="https://ejemplo.com/foto.jpg"
              />
              <p className="text-[10px] text-gray-500 mt-1">
                Copia y pega el link de una imagen de Google.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Precio</label>
                <Input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Stock</label>
                <Input
                  type="number"
                  name="stock"
                  onChange={handleChange}
                  placeholder="10"
                  required
                />
              </div>
            </div>

            {/* 3. SELECT DE CATEGORÍAS (Conectado al Backend) */}
            <div>
              <label className="text-sm font-medium">Categoría</label>
              <select
                name="categoryId"
                onChange={handleChange}
                required
                defaultValue=""
                // Estilos para que se parezca a un Input de Shadcn
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {/* Mapeamos el estado 'categories' que vino del fetch */}
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" className="w-full">
              Guardar Producto
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}