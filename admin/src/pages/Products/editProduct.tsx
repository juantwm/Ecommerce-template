import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams es clave
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtenemos el ID de la URL (ej: /products/edit/5)

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        imageUrl: "",
    });

  // 1. Cargar Categorías (igual que antes)
    useEffect(() => {
        fetch("http://localhost:3000/api/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error(err));
    }, []);

  // 2. NUEVO: Cargar el Producto a editar
    useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // Rellenamos el formulario con los datos que vinieron
            setFormData({
                name: data.name,
                description: data.description || "",
                price: data.price,
                stock: data.stock,
                categoryId: data.categoryId, // O data.category?.id según tu backend
                imageUrl: data.images && data.images.length > 0 ? data.images[0] : "",
            });
        })
        .catch((err) => console.error("Error cargando producto:", err));
    }, [id]);

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

    try 
    {
      // CAMBIO: Usamos PUT y la URL con el ID
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            stock: Number(formData.stock),
            categoryId: Number(formData.categoryId),
            images: formData.imageUrl ? [formData.imageUrl] : [],
            }),
        });

        if (response.ok) {
            alert("Producto actualizado!");
            navigate("/products");
        } else {
            const error = await response.json();
            alert("Error: " + error.error);
        }
    } 
    catch (error) {
        console.error("Error de red:", error);
    }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Editar Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ... (Aquí van los mismos inputs que en CreateProduct: Nombre, Descripción, etc) ... */}
            
            {/* Solo te pongo uno de ejemplo para no hacer spam, copia y pega los inputs de CreateProduct aquí */}
            <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div>
                <label className="text-sm font-medium">Descripción</label>
                <Input name="description" value={formData.description} onChange={handleChange} />
            </div>

            {/* ... Copia el resto de inputs de CreateProduct ... */}
            
            {/* SELECT DE CATEGORÍA */}
             <div>
              <label className="text-sm font-medium">Categoría</label>
              <select
                name="categoryId"
                value={formData.categoryId} // Importante: value={formData.categoryId}
                onChange={handleChange}
                required
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="" disabled>Selecciona una opción</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}