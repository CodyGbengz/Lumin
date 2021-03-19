import styles from './Products.module.css';

const {
    productListWrapper,
    productListHeader,
    productListContainer,
    productCard,
    productImage,
    addToCart,
} = styles;

const Products = ({
    products = [],
    toggleCartSideBar,
    addItemToCart
}) => {
    return (
    <div className={productListWrapper}>
        <div className={productListHeader}>
            <h1>All Products</h1>
            <p>A 360 look at Lumin</p>
        </div>
        <div className={productListContainer}>
            {products.map((product) => (
                <div
                    key={product.id}
                    className={productCard}>
                    <img
                        src={product.image_url}
                        className={productImage}
                    />
                    <p>{product.title}</p>
                    <p>From <b>${product.price}</b></p>
                    <button 
                        className={addToCart}
                        onClick={() => {
                            toggleCartSideBar(); 
                            addItemToCart(product.id) 
                        }}
                        >Add to Cart
                    </button>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Products;