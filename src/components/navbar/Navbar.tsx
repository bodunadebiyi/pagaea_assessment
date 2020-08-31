import React, { FunctionComponent } from 'react';
import './Navbar.scss';
import cart from '../../cart.png';

interface NavbarProps {
    cartItemCount: number;
    toggleSidebar: () => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({
    cartItemCount,
    toggleSidebar
}) => {
    const openCart = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        toggleSidebar();
    }

    return (
        <div className="navbar-wrapper">
            <div className="left-section">
                <h1>LUMIN</h1>
                <div className="menu">
                    <a className="menu-item" href="/">Shop</a>
                    <a className="menu-item" href="/">Learn</a>
                </div>
            </div>
            <div className="right-section">
                <a href="/">Account</a>
                <a href="/" onClick={openCart}>
                    <img 
                        src={cart} 
                        alt="cart-sub" 
                        width={21} 
                        height={14} />
                    <span>{cartItemCount}</span>
                </a>
            </div>
        </div>
    )
}

export default Navbar;