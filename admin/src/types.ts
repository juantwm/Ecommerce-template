export interface Product{
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    idCategory: string;
    image: string[];
}

export interface Category{
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    products: Product[];
}

