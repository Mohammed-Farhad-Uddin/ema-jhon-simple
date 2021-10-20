import React, { useEffect, useState } from 'react';
import './Shop.css'
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    // console.log(fakeData)
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart);
        // console.log(productKeys)
        const previousCart = productKeys.map((existingKey) => {
            const product = fakeData.find((pd) => pd.key == existingKey)
            // console.log(existingKey,saveCart[existingKey]);
            product.quantity = saveCart[existingKey]
            return product
        })
        // console.log(previousCart);
        setCart(previousCart);
    }, [])
    const handleAddProduct = (productPara) => {
        // console.log("clicked",productPara);
        const toBeAddedKey = productPara.key
        const sameProduct = cart.find((item) => item.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter((pd) => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct]
        }
        else {
            productPara.quantity = 1;
            newCart = [...cart, productPara]
        }
        setCart(newCart)

        addToDatabaseCart(productPara.key, count)
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map((prod) => <Product key={prod.key} handleAddProduct={handleAddProduct} product={prod} showAddToCart={true}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="add-to-cart-btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;