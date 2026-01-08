import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Trash2, Plus, Pencil } from "lucide-react";
import { Category } from '@/types';


export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  // Función para cargar datos
  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/categories');
      const data = await res.json();
      
      // --- CORRECCIÓN AQUÍ ---
      // Verificamos si lo que llegó es una lista (Array).
      // Si el backend devolvió un error { error: "..." }, esto evita el crash.
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error("El backend no devolvió una lista:", data);
        setCategories([]); // Ponemos lista vacía por seguridad
      }
      // -----------------------

    } catch (error) {
      console.error("Error cargando categorías:", error);
      setCategories([]);
    }
  };

  // Cargar al iniciar
  useEffect(() => {
    fetchCategories();
  }, []);

  // Función para borrar
  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres borrar esta categoría?")) return;
    
    try {
      const res = await fetch(`http://localhost:3000/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCategories(); // Recargar la lista
      } else {
        alert("Error al eliminar (¿Quizás tiene productos?)");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categorías</h1>
        <Link to="/categories/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nueva Categoría
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg p-4 bg-white shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Slug (URL)</th>
              <th className="p-3">Productos</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-slate-50">
                <td className="p-3">#{cat.id}</td>
                <td className="p-3 font-medium">{cat.name}</td>
                <td className="p-3 text-gray-500">{cat.slug}</td>
                {/* Agregamos el chequeo seguro (?.) para evitar errores si _count no viene */}
                <td className="p-3">{cat._count?.products || 0}</td>
                <td className="p-3 text-right space-x-2">

                <Link to={`/categories/edit/${cat.id}`}>
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>
                </Link>

                <Button variant="destructive" size="sm" onClick={() => handleDelete(cat.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No hay categorías creadas (o el backend no responde).
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}