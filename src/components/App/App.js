import "./App.css";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import Products from "../Products/Products";
import Cart from "../Cart/Cart";

import { GET_CURRENCY, GET_PRODUCTS } from "../../queries";
import { itemPosition, findItem } from "../../helpers";

const App = () => {
  const [currency, setCurrency] = useState("USD");
  const { data } = useQuery(GET_PRODUCTS, {
    variables: { currency },
  });
  const { data: currencies } = useQuery(GET_CURRENCY);
  const [cartState, setCartState] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const setProductsData = (productsData) => setProducts(productsData);

  useEffect(() => {
    const products = data && data.products;
    if (products) {
      setProductsData(products);
      const updatedCart =
        cart &&
        cart.map((current) => {
          let updatedCartItem = current;
          if (itemPosition(products, current.id) >= 0) {
            const newUnitPrice =
              products[itemPosition(products, current.id)].price;
            const newPrice = newUnitPrice * current.quantity;
            updatedCartItem.price = newPrice;
          }
          return updatedCartItem;
        });
      setCart(updatedCart);
    }
  }, [data && data.products]);

  useEffect(() => {
    if (cartState) {
      document.body.classList.add("overlay-open");
    } else {
      document.body.classList.remove("overlay-open");
    }
  }, [cartState]);

  const addToCart = (id) => {
    const products = data && data.products;
    const itemAlreadyExist = itemPosition(cart, id);
    if (itemAlreadyExist >= 0) {
      incrementQuantity(id);
    } else {
      const item = {
        quantity: 1,
        ...products[itemPosition(products, id)],
      };
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    const items = cart.filter((current) => current.id !== id);
    setCart(items);
  };

  const incrementQuantity = (id) => {
    const itemIndex = itemPosition(cart, id);
    const originalItem = findItem(products, id);
    const unitPrice = originalItem.price;
    const item = {
      ...cart[itemIndex],
      quantity: cart[itemIndex].quantity + 1,
      price: (cart[itemIndex].quantity + 1) * unitPrice,
    };
    cart[itemIndex] = item;
    setCart([...cart]);
  };

  const decrementQuantity = (id) => {
    const itemIndex = itemPosition(cart, id);
    if (cart[itemIndex].quantity === 1) {
      removeFromCart(id);
    } else {
      const originalItem = findItem(products, id);
      const unitPrice = originalItem.price;
      const item = {
        ...cart[itemIndex],
        quantity: cart[itemIndex].quantity - 1,
        price: (cart[itemIndex].quantity - 1) * unitPrice,
      };
      cart[itemIndex] = item;
      setCart([...cart]);
    }
  };

  const resetCurrency = (currency) => {
    setCurrency(currency);
  };

  const toggleCartSideBar = () => {
    setCartState(!cartState);
  };

  return (
    <div className="App">
      <Products
        products={products}
        toggleCartSideBar={toggleCartSideBar}
        addItemToCart={addToCart}
        currency={currency}
      />
      {cartState && (
        <Cart
          currencies={currencies && currencies.currency}
          toggleCartSideBar={toggleCartSideBar}
          items={cart}
          removeItem={removeFromCart}
          increaseQuantity={incrementQuantity}
          decreaseQuantity={decrementQuantity}
          currency={currency}
          resetCurrency={resetCurrency}
        />
      )}
    </div>
  );
};

export default App;
