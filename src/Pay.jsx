import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
//import { useHistory } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import Success from './Success';

const KEY= "pk_test_51MBv7EEiClOmVDcAW44M8GwY5ysAIcsfatBm6LSgQx5FGIXBJfuvMIHAgpABmoZ38CG38zYku5GFdudUKhwux7sq009lfpptTJ";

const Pay = () => {

    const [stripeToken, setStripeToken] = useState(null)
  //  const history = useHistory()
  const navigate = useNavigate ();

    const onToken = (token) =>{
        console.log(token)
        setStripeToken(token)
    }

    useEffect(()=>{
        const makeRequest=async ()=>{
            try {
                    const res= await axios.post(
                        "http://localhost:5000/api/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,
                    },
                    {headers:{"Content-Type" : "application/json"}}
                );
                console.log(res.data);
               // history.push("/suceess")
               navigate("/Success");
            } catch (err) {
                console.log(err)
                switch (err.type) {
                    case 'StripeCardError':
                      console.log(`A payment error occurred: ${err.message}`);
                      break;
                    case 'StripeInvalidRequestError':
                      console.log('An invalid request occurred.');
                      break;
                    default:
                      console.log('Another problem occurred, maybe unrelated to Stripe.');
                      break;
                }
            }
        };
        stripeToken && makeRequest()
    },[stripeToken]);
  return (
    <div
    style={{
        height: "100vh",
        display:"flex",
        justifyContent:"center",
        alignItems: "center"
    }}>
        {stripeToken ? (
            <span>Processing... Please Wait</span>
        ):(
        <StripeCheckout name="Akshata shop"
        image='https://i.pinimg.com/564x/da/9a/34/da9a346fe6e5276526ccb98a9d6c573e.jpg'
        billingAddress
        shippingAddress
        description=' your Total is $20'
        amount={2000}
        token={onToken}
        stripeKey={KEY}
    >
            
        <button
        style={{
            border:"none",
            width:120,
            borderRadius:5,
            padding: "20px",
            backgroundColor: "black",
            color:"white"
        }}>Pay Now</button>
        </StripeCheckout>
        )}
    </div>
  )
}

export default Pay