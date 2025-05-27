import { NextResponse, NextRequest } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest, response: NextResponse){
    const body = await req.json();
    /*
    const items = body.items as {
        id: string;
        name:string,
        price:number
        quantity: number;    
    }[]
    */
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: 'Your Product Name',
                  },
                  unit_amount: 1000, // Price in cents
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${req.nextUrl.origin}/success`,
            cancel_url: `${req.nextUrl.origin}/cancel`,
          });
      return NextResponse.json({url:session.url,status:200})
    }catch(err:any){
      return NextResponse.json(
        { error: err.message || "Internal server error" },
        { status: 500 }
      )
    
    }
}