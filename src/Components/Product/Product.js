import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


const Product = (props) => {
    // console.log(props)
    // console.log(props.product)
    const {seller,price,stock}=props.product;
    return (
        <div className="product">
            <div>
                <img src={props.product.img} alt="" />
            </div>
            <div>
                <h4 className="product-name"><Link to={"/product/"+props.product.key}>{props.product.name}</Link></h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock-Order soon</small></p>  
                {
                    props.showAddToCart===true &&
                    <button onClick={()=>props.handleAddProduct(props.product)} className="add-to-cart-btn"><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
                }
            </div>
        </div>
    );
};

export default Product;