import { NextResponse } from "next/server";
// import { STRIPE_SECRET_KEY } from "@/lib/constants";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "@/lib/utils/apiRoutes";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

console.log(stripe, "///////stripe///////////");
console.log(process.env.STRIPE_SECRET_KEY, "///////process.env.STRIPE_SECRET_KEY///////////");
console.log(STRIPE_SECRET_KEY, "///////STRIPE_SECRET_KEY///////////");
export async function POST(request) {
  try {
    const { paymentIntent } = await request.json();
console.log("///////ddddddd///////////////ddddddd")
    if (!paymentIntent) {
      throw new Error("paymentIntent required");
    }
console.log(paymentIntent)
    const verifyPaymentIntent =
      await stripe.paymentIntents.retrieve(paymentIntent);

    const paymentMethod = await stripe.paymentMethods.retrieve(
      verifyPaymentIntent.payment_method
    );

    return NextResponse.json(
      {
        paymentStatus: verifyPaymentIntent.status === "succeeded",
        billing_details: paymentMethod.billing_details,
      },
      { status: 200 }
    );
  } catch (error) {
    throw error;
  }
}
