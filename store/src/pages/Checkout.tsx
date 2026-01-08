import { useState } from "react";
import { useCartStore } from "@/lib/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Si no hay ítems, lo mandamos al inicio
  if (items.length === 0 && !success) {
    return (
        <div className="p-10 text-center">
            <h2 className="text-xl font-bold">No hay nada que pagar 🤷‍♂️</h2>
            <Button className="mt-4" onClick={() => navigate('/')}>Ir a comprar</Button>
        </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Preparamos los datos como los espera TU backend
      const orderData = {
        guestName: formData.name,
        guestEmail: formData.email,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      // 2. Enviamos al Backend
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Error al procesar la compra");
      }

      // 3. ¡Éxito! Limpiamos carrito y mostramos mensaje
      setSuccess(true);
      clearCart();
      
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear la orden. Revisa el stock o la consola.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-green-100 text-green-800 p-8 rounded-full inline-block mb-4 text-4xl">
          ✅
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">¡Compra Realizada con Éxito!</h1>
        <p className="text-gray-600 mb-8">Gracias por tu compra, {formData.name}.</p>
        <Button onClick={() => navigate("/")}>Seguir Comprando</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>
      
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold text-lg">Resumen</h3>
          <p className="text-gray-500">Total a pagar: <span className="font-bold text-black text-xl">${getTotalPrice()}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Juan Pérez"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="juan@ejemplo.com"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Procesando..." : "Confirmar Pago 💳"}
          </Button>
        </form>
      </div>
    </div>
  );
}