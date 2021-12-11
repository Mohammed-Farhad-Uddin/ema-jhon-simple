import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    // console.log(fakeData)
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])

    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart);
        // console.log(products,productKeys)
        fetch('http://localhost:5000/productsByKeys',{
            method: 'POST',
            body: JSON.stringify(productKeys),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res=>res.json())//post method er res.send tekhe data pawa hocce
        .then(data=>setCart(data))


// {  ei part upore kora hoice  
//        if(products.length){
//             const previousCart = productKeys.map((existingKey) => {
//             const product = products.find((pd) => pd.key == existingKey)
//             // console.log(existingKey,saveCart[existingKey]);
//             product.quantity = saveCart[existingKey]
//             return product
//             })
//             // console.log(previousCart);
//             setCart(previousCart);
//         }}
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