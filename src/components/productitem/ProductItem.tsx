import React, { FunctionComponent } from 'react';
import { Product } from '../../interfaces';
import './ProductItem.scss';

interface ProductProps extends Product {
    addToCart: (product: Product) => void;
    currency: string;
}

const ProductItem: FunctionComponent<ProductProps> = React.memo(({
    id,
    title,
    image_url,
    price,
    addToCart,
    currency
}) => {
    return (
        <div className="product-item">
            <img
                src={image_url}
                width="auto"
                height={100}
                alt="product-item" />
            <p>{title}</p>
            <p>From {currency}{price}.00</p>
            <button onClick={() => addToCart({
                id,
                title,
                image_url,
                price
            })}>
                Add to Cart
            </button>
        </div>
    )
})

export default ProductItem