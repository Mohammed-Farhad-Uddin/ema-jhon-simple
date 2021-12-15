import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { useState } from 'react/cjs/react.development';

const CheckOutForm = ({handlePayment}) => {//const {handlePayment}=props ei ta na kore direct {handlePayment} ei ta newa hoice
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError,setPaymentError]=useState(null);
  const [paymentSuccess,setPaymentSuccess]=useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement=elements.getElement(CardElement);


    const {error,paymentMethod} = await stripe.createPaymentMethod({
      //`Elements` instance that was used to create the Payment Element
      type:"card",
      card:cardElement,
    });

    if (error) {
      // Show error to your customer (e.g., payment details incomplete)
      setPaymentError(error.message)
      setPaymentSuccess(null)
    } else {
        console.log('[PaymentMethod]',paymentMethod)
        setPaymentSuccess(paymentMethod.id);
        setPaymentError(null);
        handlePayment(paymentMethod.id)
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button button disabled={!stripe}>Pay</button>
        </form>
        {
            paymentError && <p style={{color:'red'}}>{paymentError}</p>
        }
        {
            paymentSuccess && <p style={{color:'green'}}>Payment has done</p>
        }
    </div>
  )
};

export default CheckOutForm;