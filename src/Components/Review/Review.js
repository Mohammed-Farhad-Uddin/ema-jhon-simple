import React,{useEffect,useState} from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import thankYouImg from '../../images/giphy.gif'

const Review = () => {
    const[cart,setCart]=useState([]);
    const[orderPlace,setOrderPlace]=useState(false)

    const handlePlaceOrder=()=>{
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }
    const removeProduct=(productKey)=>{
        // console.log("item removed",productKey);
        const newCart=cart.filter((pd)=>pd.key !== productKey);
        setCart(newCart);

        removeFromDatabaseCart(productKey)
    }
    useEffect(() => {    
        //cart
        const savedCart = getDatabaseCart()
        const productKeys=Object.keys(savedCart)
        const cartProducts=productKeys.map((keyItem)=>{ 
            //  savedCart[key]
            const product=fakeData.find((pd)=>pd.key===keyItem);
            product.quantity=savedCart[keyItem]
            return product
        })
        setCart(cartProducts)
        // console.log(cartProducts)
    },[])

    let thankYou;
    if(orderPlace){
        thankYou=<img src={thankYouImg} alt="" />
    }

    return (
        <div className="twin-container">
           <div className="product-container">
           <h1>Cart Items {cart.length}</h1>
            {
                cart.map((pd)=><ReviewItem product={pd}
                removeProduct={removeProduct}
                key={pd.key}></ReviewItem>)
            }
           </div>
           {
               thankYou
           }
           <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="add-to-cart-btn">Place Order</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;