import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditCategory() {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Cargar los datos de la categoría al entrar
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // Truco: Reutilizamos el endpoint que trae todas y filtramos (o podrías crear un getOne en el backend)
        const res = await fetch('http://localhost:3000/api/categories'); 
        const data = await res.json();
        const found = data.find((c: any) => c.id === Number(id));
        
        if (found) {
          setName(found.name);
        } else {
          alert("Categoría no encontrada");
          navigate('/categories');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id, navigate]);

  // 2. Guardar los cambios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: 'PUT', // Usamos PUT para actualizar
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      if (res.ok) {
        navigate('/categories'); // Volver a la lista
      } else {
        alert("Error al actualizar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="p-10">Cargando...</p>;

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Editar Categoría #{id}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Categoría</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => navigate('/categories')} className="w-full">
                Cancelar
              </Button>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Guardar Cambios
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}