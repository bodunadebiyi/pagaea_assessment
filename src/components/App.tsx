import React from 'react';
import './App.scss';
import Navbar from './navbar/Navbar';
import HeaderSection from './headersection/HeaderSection';
import Products from './products/products';
import Sidebar from './sidebar/sidebar';
import { Product, CartItem } from '../interfaces';
import { fetchProducts, fetchCurrencies } from '../helpers/apiRequests';

interface State {
  products: Product[],
  cartItems: CartItem[],
  currencies: string[],
  currency: string,
  loadingProducts: boolean,
  displaySidebar: boolean,
}

interface Props {}

class App extends React.Component<Props, State> {
  state = {
    products: [],
    currencies: [],
    cartItems: [],
    currency: 'USD',
    loadingProducts: false,
    failed: false,
    displaySidebar: false,
  }

  componentDidMount() {
    this.loadCurrencies();
    this.loadProducts();
  }

  loadProducts = async (currency: string='USD') => {
    const { cartItems, currency: oldCurrency } = this.state;
    const previousCurrency = oldCurrency;
    this.setState({ loadingProducts: true, currency })
    
    try {
      const products = await fetchProducts(currency)
      const { data: { products: allProducts } } = products
      const updatedCartList = this.updateCartList(cartItems, allProducts)
      this.setState({
        loadingProducts: false,
        products: allProducts,
        cartItems: updatedCartList 
      })
    } catch {
      alert('failed to load products, please try again!')
      this.setState({ loadingProducts: false, currency: previousCurrency })
    }
  }

  updateCartList = (cartItems: CartItem[], products: Product[]) => {
    return cartItems.map(cartItem => {
      const product = products.find((product) => product.id === cartItem.id)
      if (product) cartItem.price = product.price

      return cartItem;
    })
  }

  loadCurrencies = async () => {
    try {
      const currencies = await fetchCurrencies()
      const { data: { currency: allCurrencies }} = currencies;
      this.setState({ currencies: allCurrencies });
    } catch {
      alert('Failed to load currencies, please try again!')
    }
  }

  addItemToCart = (product: Product) => {
    const { cartItems } = this.state;
    const cartItem: any = cartItems.find((x: CartItem) => product.id === x.id)
    let newItems: CartItem[];

    if (cartItem) {
      cartItem.count +=  1
      newItems = cartItems.filter((x: CartItem) => x.id !== cartItem.id)
      newItems.push(cartItem);
    } else {
      newItems = [...cartItems, {...product, count: 1}]
    }

    this.setState({ cartItems: newItems })
  }

  removeItemFromCart = (id: number) => {
    const { cartItems } = this.state;
    const newCartItems: CartItem[] = cartItems.filter((cartItem: CartItem) => cartItem.id !== id)
    this.setState({ cartItems: newCartItems })
  }

  toggleSidebar = () => {
    this.setState({displaySidebar: !this.state.displaySidebar})
  }

  updateCartItemCount = (id: number, type: string) => {
    const { cartItems } = this.state;
    const newList = [...cartItems]
    const itemToUpdate: any = newList.find((cartItem: CartItem) => cartItem.id === id)

    if (type === 'increment') {
      if (itemToUpdate !== undefined) itemToUpdate.count += 1
    } else {
      if (itemToUpdate !== undefined && itemToUpdate.count > 1) {
        itemToUpdate.count -= 1
      }
    }

    this.setState({ cartItems: newList})
  }

  render() {
    const {
      cartItems,
      products,
      displaySidebar,
      currencies,
      currency,
      loadingProducts
    } = this.state;

    return (
      <div className="App">
        <Navbar 
          cartItemCount={cartItems.length}
          toggleSidebar={this.toggleSidebar} />
        <HeaderSection />
        <Products
          products={products}
          addToCart={this.addItemToCart}
          currency={currency}
          loading={loadingProducts} />
        <Sidebar
          updateCurrency={this.loadProducts}
          currency={currency}
          updateCartItem={this.updateCartItemCount}
          removeCartItem={this.removeItemFromCart}
          cartItems={cartItems}
          currencies={currencies}
          displaySidebar={displaySidebar}
          toggleSidebar={this.toggleSidebar} />
      </div>
    );
  }
}

export default App;
