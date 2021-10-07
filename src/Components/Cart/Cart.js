import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart=props.cart;
    // const total=cart.reduce((total,prd)=> total + prd.price ,0)
    let total=0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i]
        total=total+product.price;
    }
     
    let shippingCost=0;
    if(total>300){
        shippingCost=0
    }
    else if(total>200){
        shippingCost=30
    }
    else if(total>0){
        shippingCost=50
    }

    let tax=(total/10).toFixed(2);//tofixed korle ei ta string hoye jai.tai abr Number diye intiger a ante hoi
                                //ei kane abr Math.round(total/10) kora jai.
    let granTotal=(total+shippingCost+Number(tax)).toFixed(2);//ei kane abr onek value asbe tax tekhe tai to fixed kore dite hoi
  
    const formatNumber=(num)=>{ //ei function sob gula diye to fixed a ante pari alada alada na kore
        const precision=num.toFixed(2);
        return Number(precision)
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered : {cart.length}</p>
            <p>Product Price : {formatNumber(total)}</p>
            <p><small>Shipping Cost : {shippingCost}</small></p>
            <p><small>Tax + VAT : {tax}</small></p>
            <p>Total Price : {granTotal}</p>            
        </div>
    );
};

export default Cart;