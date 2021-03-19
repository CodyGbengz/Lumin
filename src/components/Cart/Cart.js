import styles from './Cart.module.css';

const {
    cartWrapper, cartContainer, cartItemsContainerHeader,
    backButton, cartHeaderText, currencyDropdown,
    cartItemsContainer, cartItemCard, cartItemTitleContainer,
    cartItemQuantity, quantityButton, quantityButtonDecrement,
    quantityButtonIncrement, cartImageContainer, cartItemsSubtotalContainer,
    cartItemsSubtotalWrapper, subscriptionButton, checkoutButton
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
        <section 
            className={cartWrapper}
            style={{ top: window.pageYOffset }}
        >
            <div className={cartContainer}>
                <div className={cartItemsContainerHeader}>
                    <i 
                        className={`fa fa-chevron-circle-left ${backButton}`}
                        onClick={toggleCartSideBar}
                    >
                    </i>
                    <p className={cartHeaderText}>YOUR CART</p>
                    <select
                        className={currencyDropdown}
                        value={currency}
                        onChange={(e) => {
                            resetCurrency(e.target.value);

                        }}
                    >
                        {currencies.map((currency) => <option value={currency}>{currency}</option>)}
                    </select>
                </div>
                <div className={cartItemsContainer}>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={cartItemCard}>
                            <div className={cartItemTitleContainer}>
                                <p>{item.title}</p>
                                <i
                                    className="fa fa-times"
                                    onClick={
                                        () => {
                                            removeItem(item.id)
                                        }}
                                ></i>
                            </div>
                            <span className={cartItemQuantity}>
                                <button
                                    className={`${quantityButton} ${quantityButtonDecrement}`}
                                    onClick={() => { decreaseQuantity(item.id) }}
                                >-</button>
                                {item.quantity}
                                <button
                                    className={`${quantityButton} ${quantityButtonIncrement}`}
                                    onClick={() => { increaseQuantity(item.id) }}
                                >+
                                </button>
                            </span>
                            <p>{item.price}</p>
                            <div className={cartImageContainer}>
                                <img src={item.image_url} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cartItemsSubtotalWrapper}>
                    <div className={cartItemsSubtotalContainer}>
                        <p>Subtotal</p>
                        <p>{items.reduce((acc, curr) => acc + curr.price, 0)}</p>
                        <button className={subscriptionButton}>MAKE THIS A SUBSCRIPTION (SAVE 20%)</button>
                        <button className={checkoutButton}>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </section>
    )


export default Cart;