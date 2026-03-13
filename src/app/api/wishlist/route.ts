import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { WishlistModel } from "@/models/wishlist";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ items: [] });

  await connectToDatabase();
  const wishlist = (await WishlistModel.findOne({ user: session.user.id }).lean()) as any;
  const items = wishlist?.products?.map((productId: any) => productId.toString()) ?? [];
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 401 });
  }

  const { productId } = await request.json();
  await connectToDatabase();
  await WishlistModel.findOneAndUpdate(
    { user: session.user.id },
    { $addToSet: { products: productId } },
    { upsert: true },
  );

  return GET();
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 401 });
  }

  const { productId } = await request.json();
  await connectToDatabase();
  await WishlistModel.findOneAndUpdate(
    { user: session.user.id },
    { $pull: { products: productId } },
  );

  return GET();
}
