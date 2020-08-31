export interface Product {
    id: number;
    title: string;
    image_url: string;
    price: number;
}

export interface CartItem extends Product {
    count: number
}