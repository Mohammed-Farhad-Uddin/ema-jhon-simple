import React from 'react';
import { useForm } from "react-hook-form";
import { useContext, useState } from 'react/cjs/react.development';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import "./Shipping.css";
import { useHistory } from 'react-router-dom';
import ProcessPayment from '../ProcessPayment/ProcessPayment';


const Shipping = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [shippingData,setShippingData]=useState(null);

  const onSubmit = (data) => {
        setShippingData(data)
  };

  const handlePaymentSuccess=(paymentId)=>{
    const saveCart = getDatabaseCart();
    const orderDetails = {...loggedInUser,
                  products: saveCart,
                  shipment: shippingData,
                  // paymentId:paymentId,
                  paymentId,
                  orderTime: new Date() 
                }

    fetch('http://localhost:5000/addOrder', {
      method: "POST",
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder()
          alert("Your Order Placed Successfully")
          history.push('/')
        }
      })
  }


  return (
    <div className="row">
      
      <div style={{display:shippingData ? 'none' : 'block'}} className="col-md-6">
        {/* shippingData takle display none,na takle block */}

        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>      
        { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */ 

          /* ei kane name, email, phone ,address ei gula name="" ei property hisabe use hocce emample: name="phone"
       <input name="name" className="ship-form-input" {...register({ required: true })} />
        {errors.name && <span className="error">Name is required</span>} */}

          <input className="ship-form-input" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Enter Your Name" />
          {errors.name && <span className="error">Name is required</span>}

          <input className="ship-form-input" defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Enter Your Email" />
          {errors.email && <span className="error">Email is required</span>}

          <input className="ship-form-input" {...register("address", { required: true })} placeholder="Enter Your Address" />
          {errors.address && <span className="error">Address is required</span>}

          <input className="ship-form-input" {...register("phone", { required: true })} placeholder="Enter Your Phone Number" />
          {errors.phone && <span className="error">Phone is required</span>}

          <input className="ship-form-input" type="submit" />
        </form>
      </div>
      <div style={{display:shippingData ? 'block' : 'none',margin:"0 auto"}} className="col-md-6">
        {/* shippingData submit korle display block hoye show hobe payment,noito display none takbe data submit na hole  */}
        <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipping;