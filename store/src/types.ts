export interface Product {
    id: number;           // Cambiado de String a Number para coincidir con Prisma
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;   // Cambiado de 'idCategory' a 'categoryId'
    images: string[];     // Cambiado de 'image' a 'images' (plural)
    
    // Opcional: A veces el backend devuelve la categoría completa
    category?: Category; 
}

export interface Category {
    id: number;
    name: string;
    slug?: string;
    
    // 👇 Agrega esto para que no te dé error la tabla
    _count?: {
        products: number;
    };
}