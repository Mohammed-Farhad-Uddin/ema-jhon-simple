import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
import {PaymentElement,CardElement} from '@stripe/react-stripe-js';
import SplitForm from './SplitForm';
//module 53
const stripePromise = loadStripe('pk_test_51K6o6hEL0JKKKmq88Yqdhkbol0TG36x5s2gtDunm7GgAebDtzLL4n7540uRlt3TosXCENLuUJmZ9bd2sFAsU0qtW00q3Tg7xxY');


const ProcessPayment = ({handlePayment}) => {//const {handlePayment}=props ei ta na kore direct {handlePayment} ei ta newa hoice

    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: '{{CLIENT_SECRET}}',
    // };

    return (
        <Elements stripe={stripePromise} >
            <h2>Pay To Submit</h2>
            <CheckOutForm handlePayment={handlePayment}></CheckOutForm>
        </Elements>
    );
};

export default ProcessPayment;