import React, { FunctionComponent } from 'react';
import CartItem from '../cartitem/cartitem';
import { CartItem as CartItemType } from '../../interfaces'
import caretRight from '../../caret-right.png';
import './sidebar.scss';

interface SidebarProps {
    currency: string;
    currencies: string[];
    toggleSidebar: () => void;
    removeCartItem: (id: number) => void;
    updateCurrency: (currency: string) => void;
    displaySidebar: boolean;
    cartItems: CartItemType[],
    updateCartItem: (id: number, type: string) => void;
}

const Sidebar: FunctionComponent<SidebarProps> = React.memo(({
    currencies,
    displaySidebar,
    toggleSidebar,
    removeCartItem,
    updateCartItem,
    cartItems,
    currency,
    updateCurrency
}) => {
    if (!displaySidebar) return null;
    const total = cartItems.reduce((x, y) => x + y.price * y.count, 0)
    const changeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateCurrency(e.target.value);
        console.log('usd:: ', e.target.value)
    }

    return (
        <div className="sidebar-wrapper">
            <div className="sidebar">
                <div className="collapse-button" onClick={toggleSidebar}>
                    <img src={caretRight} height={15} width="auto" alt="caret-right" />
                </div>
                <p className="title">YOUR CART</p>
                <select onChange={changeCurrency} value={currency}>
                    {currencies.map(currency => <option value={currency} key={currency}>{currency}</option>)}
                </select>
                <div className="cart-list">
                    {cartItems.map((item, index) => (
                        <CartItem
                            currency={currency}
                            updateCartItem={(type: string) => updateCartItem(item.id, type)}
                            removeCartItem={removeCartItem}
                            {...item}
                            key={index} />
                    ))}
                </div>
                <div className="action">
                    <div className="pricing">
                        <p>Subtotal</p>
                        <p>{currency}{total}.00</p>
                    </div>
                    <button>Make this a subscription (Save 20%)</button>
                    <button>Proceed to checkout</button>
                </div>
            </div>
        </div>
    )
})

export default Sidebar