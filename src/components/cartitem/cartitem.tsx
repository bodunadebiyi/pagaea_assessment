import React, { FunctionComponent } from 'react';
import './cartitem.scss';
import { CartItem as CartItemProps } from '../../interfaces';
import ItemCount from '../itemcount/itemCount';

interface ComponentProps extends CartItemProps {
    removeCartItem: (itemId: number) => void;
    updateCartItem: (type: string) => void;
    currency: string;
}

const CartItem: FunctionComponent<ComponentProps> = React.memo(({
    image_url,
    price,
    title,
    id,
    count,
    removeCartItem,
    updateCartItem,
    currency
}) => {
    return (
        <div className="cart-item">
            <span className="close" onClick={() => removeCartItem(id)}>
                x
            </span>
            <p className="product-title">{title}</p>
            <div className="image-section">
                <img
                    src={image_url}
                    height={40}
                    width="auto"
                    alt="product" />
            </div>
            <ItemCount
                value={count}
                onClickMinus={() => updateCartItem('decrement')}
                onClickPlus={() => updateCartItem('increment')} />
            <p className="price">{currency}{price}.00</p>
        </div>
    )
})

export default CartItem