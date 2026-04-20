import { NextRequest , NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
    try {
        const { productId , storeSlug , price , name } = await request.json();

        const product = await prisma.product.findUnique({
            where: {id : productId},
            include: {store : true},
        });

        if(!product || !product.published) {
            return NextResponse.json(
                {error : "Product not found or not available for purchase"}, 
                {status : 404},
            );
        }

        if(product.inventory === 0) {
            return NextResponse.json(
                {error : "Product is out of stock"}, 
                {status : 400},
            );
        }

        const order = await razorpay.orders.create({
            amount: Math.round(price * 100),
            currency: "INR",
            receipt: `receipt_${productId}_${Date.now()}`,
            notes: {
                productId: productId,
                storeSlug: storeSlug,
                productName: name,
                storeId: product.storeId,
            },
        });

        return NextResponse.json({ 
            orderId: order.id,
            amount : order.amount,
            currency : order.currency,
            productName : name,
            storeSlug,
            productId,
        });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            {error : "Failed to create order"}, 
            {status : 500},
        );
    }



    }