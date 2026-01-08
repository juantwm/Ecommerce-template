import { create } from "zustand";
import { persist } from "zustand/middleware"; // Esto hace que no se borre al recargar la página

// Definimos cómo es un Item del carrito (Producto + Cantidad)
export interface CartItem {
    id: number;
    name: string;
    price: number;
    images: string[];
    quantity: number;
    stock: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: any) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
        items: [],

        addItem: (product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === product.id);

            if (existingItem) {
            // Si ya existe, aumentamos la cantidad
            set({
                items: currentItems.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
            });
            } else {
            // Si es nuevo, lo agregamos con cantidad 1
            set({ items: [...currentItems, { ...product, quantity: 1 }] });
            }
        },

        removeItem: (id) => {
            set({ items: get().items.filter((item) => item.id !== id) });
        },

        clearCart: () => {
            set({ items: [] });
        },

        getTotalPrice: () => {
            return get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
            );
        },
        }),
        {
        name: "cart-storage", // Nombre clave para guardar en localStorage
        }
    )
);