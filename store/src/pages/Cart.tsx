import { useCartStore } from "@/lib/useCartStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  // Traemos todo lo que necesitamos del store
  const { items, removeItem, clearCart, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <Link to="/">
          <Button>Volver a la tienda</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Lista de Productos */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
              </div>
              <div className="font-bold text-lg">
                ${item.price * item.quantity}
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button variant="outline" onClick={clearCart} className="mt-4">
            Vaciar Carrito
          </Button>
        </div>

        {/* Resumen de Compra */}
        <div className="bg-slate-50 p-6 rounded-lg h-fit">
          <h3 className="text-xl font-bold mb-4">Resumen</h3>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>${getTotalPrice()}</span>
          </div>
          <div className="border-t my-4"></div>
          <div className="flex justify-between mb-6 text-xl font-bold">
            <span>Total</span>
            <span>${getTotalPrice()}</span>
          </div>
          <Link to="/checkout">
            <Button className="w-full" size="lg">
              Finalizar Compra
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}