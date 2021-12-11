import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
// import thankYouImg from '../../images/giphy.gif'

const Review = () => {
    const[cart,setCart]=useState([]);
    const[orderPlace,setOrderPlace]=useState(false)
    const history=useHistory()

    const handleProccedCheckOut=()=>{
        // setCart([]);
        // setOrderPlace(true);
        // processOrder();
        history.push("/shipping");
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

        fetch('http://localhost:5000/productsByKeys',{
            method: 'POST',
            body: JSON.stringify(productKeys),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res=>res.json())//post method er res.send tekhe data pawa hocce
        .then(data=>setCart(data))

    //      {nicher ei ta upore database tekhe kora hoice
    //         const cartProducts=productKeys.map((keyItem)=>{ 
    //         //  savedCart[key]
    //         const product=fakeData.find((pd)=>pd.key===keyItem);
    //         product.quantity=savedCart[keyItem]
    //         return product
    //     })
    //     setCart(cartProducts)
    //     // console.log(cartProducts)}
    },[])

    // let thankYou;
    // if(orderPlace){
    //     thankYou=<img src={thankYouImg} alt="" />
    // }

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
           {/* {
               thankYou
           } */}
           <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProccedCheckOut} className="add-to-cart-btn">Procced CheckOut</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;