import PropTypes from "prop-types";

import styles from "./Cart.module.css";

const {
  cartWrapper,
  cartContainer,
  cartItemsContainerHeader,
  backButton,
  cartHeaderText,
  currencyDropdown,
  cartItemsContainer,
  cartItemCard,
  cartItemTitleContainer,
  cartItemQuantity,
  quantityButton,
  quantityButtonDecrement,
  quantityButtonIncrement,
  cartImageContainer,
  cartItemsSubtotalContainer,
  cartItemsSubtotalWrapper,
  subscriptionButton,
  checkoutButton,
  cartEmpty,
} = styles;

const Cart = ({
  currencies = [],
  items = [],
  toggleCartSideBar,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  currency,
  resetCurrency,
}) => (
  <section className={cartWrapper} style={{ top: window.pageYOffset }}>
    <div className={cartContainer}>
      <div className={cartItemsContainerHeader}>
        <i
          className={`fa fa-chevron-circle-right ${backButton}`}
          onClick={toggleCartSideBar}
        ></i>
        <p className={cartHeaderText}>YOUR CART</p>
        <select
          className={currencyDropdown}
          value={currency}
          onChange={(e) => {
            resetCurrency(e.target.value);
          }}
        >
          {currencies.map((currency) => (
            <option value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className={cartItemsContainer}>
        {items.length === 0 && (
          <div className={cartEmpty}>Your cart is empty</div>
        )}
        {items.map((item) => (
          <div key={item.id} className={cartItemCard}>
            <div className={cartItemTitleContainer}>
              <p>{item.title}</p>
              <i
                className="fa fa-times"
                onClick={() => {
                  removeItem(item.id);
                }}
              ></i>
            </div>
            <span className={cartItemQuantity}>
              <button
                className={`${quantityButton} ${quantityButtonDecrement}`}
                onClick={() => {
                  decreaseQuantity(item.id);
                }}
              >
                -
              </button>
              {item.quantity}
              <button
                className={`${quantityButton} ${quantityButtonIncrement}`}
                onClick={() => {
                  increaseQuantity(item.id);
                }}
              >
                +
              </button>
            </span>
            <p>{item.price}</p>
            <div className={cartImageContainer}>
              <img src={item.image_url} alt="product-image" />
            </div>
          </div>
        ))}
      </div>
      <div className={cartItemsSubtotalWrapper}>
        <div className={cartItemsSubtotalContainer}>
          <p>Subtotal</p>
          <p>{currency}{items.reduce((acc, curr) => acc + curr.price, 0)}</p>
          <button className={subscriptionButton}>
            MAKE THIS A SUBSCRIPTION (SAVE 20%)
          </button>
          <button className={checkoutButton}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  </section>
);

Cart.propTypes = {
  currencies: PropTypes.array,
  items: PropTypes.array,
  toggleCartSideBar: PropTypes.func,
  removeItem: PropTypes.func,
  increaseQuantity: PropTypes.func,
  decreaseQuantity: PropTypes.func,
  currency: PropTypes.string,
  resetCurrency: PropTypes.func,
};

export default Cart;
