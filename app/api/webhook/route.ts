import { NextRequest  , NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const signature = request.headers.get("x-razorpay-signature");

        if (!signature) {
            return NextResponse.json(
                { error: "Signature missing" },
                { status: 400 },
            );
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body)
            .digest("hex");

        if (signature !== expectedSignature) {
            return NextResponse.json(
                { error: "Invalid signature" },
                { status: 400 },
            );
        }

        const event = JSON.parse(body);

        if (event.event === "payment.captured") {
            const payment = event.payload.payment.entity;
            const notes = payment.notes;

            const store = await prisma.store.findUnique({
                where: { id: notes.storeId },
            });

            if (store) {
                const order = await prisma.order.create({
                    data: {
                        total: payment.amount / 100,
                        status: "PAID",
                        storeId: store.id,
                        items: {
                            create: {
                                quantity: 1,
                                price: payment.amount / 100,
                                productId: notes.productId,
                            },
                        },
                    },
                });

                await prisma.product.update({
                    where: { id: notes.productId },
                    data: { inventory: { decrement: 1 } },
                });
                console.log("Order created:", order.id);
            }
                        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Failed to process webhook" },
            { status: 500 },
        );
                    }
    }