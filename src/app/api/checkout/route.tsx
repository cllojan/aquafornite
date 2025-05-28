import { NextResponse, NextRequest } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil"
})

export async function POST(req: NextRequest) {
  const body = await req.json();

    const items = body.items as {
      id: string;
      name: string,
      price: number
      quantity: number;
    }[]
    console.log(items)
  try {
    
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No hay productos." }, { status: 400 })
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });
    return NextResponse.json({ url: session.url, status: 200 })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    )

  }
}