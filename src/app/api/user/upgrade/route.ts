import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update the user to "Pro" status
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        isPro: true,
      },
    });

    return NextResponse.json({
      message: "Successfully upgraded to Pro!",
      user: {
        id: updatedUser.id,
        isPro: updatedUser.isPro,
      },
    });
  } catch (error) {
    console.error("Error upgrading to Pro:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
