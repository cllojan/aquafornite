import {loadStripe} from "@stripe/stripe-js"
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export async function redirectToCheckout(items:any[]){
    const res = await fetch('api/checkout',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        
    })
    const data = await res.json();
    const stripe = await stripePromise
    if(stripe){
        stripe.redirectToCheckout({sessionId: data.id})
    }
}