import React, { FunctionComponent } from 'react';
import ProductItem from '../productitem/ProductItem';
import './products.scss'
import { Product } from '../../interfaces';

interface ProductsProps {
    products: Product[];
    addToCart: (product: Product) => void;
    currency: string;
    loading: boolean;
}

const Products: FunctionComponent<ProductsProps> = React.memo(({
    products,
    addToCart,
    currency,
    loading,
}) => {
    if (loading) {
        return (
            <div className="loading-content">
                <p>Fetching products...</p>
            </div>
        )
    }

    return (
        <div className="products-wrapper">
            <div className="products">
                {products.map((product, index) => (
                    <ProductItem
                        {...product}
                        key={index}
                        addToCart={addToCart}
                        currency={currency} />
                ))}
            </div>
        </div>
    )
})

export default Products