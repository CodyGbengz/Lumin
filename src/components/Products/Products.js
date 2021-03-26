import PropTypes from "prop-types";
import styles from "./Products.module.css";

const {
  productListWrapper,
  productListHeader,
  productListContainer,
  productCard,
  productImage,
  addToCart,
  loading
} = styles;

const Products = ({
    products = [],
    toggleCartSideBar,
    addItemToCart, 
    currency 
}) => (
    <div className={productListWrapper}>
      <div className={productListHeader}>
        <h1>All Products</h1>
        <p>A 360 look at Lumin</p>
      </div>
      {products.length === 0 && 
      <div className={loading}><h1>Loading...</h1></div>}
      <div className={productListContainer}>
        {products.map((product) => (
          <div key={product.id} className={productCard}>
            <img
              src={product.image_url}
              className={productImage}
              alt="product-image"
            />
            <p>{product.title}</p>
            <p>
              From <b>{currency}{product.price}</b>
            </p>
            <button
              role="button"
              className={addToCart}
              onClick={() => {
                toggleCartSideBar();
                addItemToCart(product.id);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );

Products.propTypes = {
  products: PropTypes.array,
  toggleCartSideBar: PropTypes.func,
  addItemToCart: PropTypes.func,
  currency: PropTypes.string
};

export default Products;
