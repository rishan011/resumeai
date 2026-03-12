import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { razorpay } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (user.isPro) {
      return new NextResponse("User is already subscribed to Pro", { status: 400 });
    }

    // Amount in paise (100 paise = 1 INR)
    const amount = 99900; // e.g. 999 INR
    const options = {
      amount: amount, 
      currency: "INR",
      receipt: `receipt_${user.id}_${Date.now()}`,
    };

    // Create a new Razorpay Order
    const order = await razorpay.orders.create(options);

    // Save the order to DB so we can map it to the user during verification
    await prisma.user.update({
      where: { id: user.id },
      data: { razorpayOrderId: order.id },
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("RAZORPAY_ORDER_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
