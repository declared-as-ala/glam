import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { CartModel } from "@/models/cart";
import { ProductModel } from "@/models/product";

const CART_COOKIE = "glam_cart_sid";

function serializeCartItem(item: any) {
  const product = item.product;
  const image =
    product.images?.find((entry: { isPrimary?: boolean }) => entry.isPrimary)?.url ??
    product.images?.[0]?.url ??
    "";
  return {
    productId: product._id.toString(),
    slug: product.slug,
    name: product.name,
    brand: product.brand?.name,
    image,
    price: product.regularPrice,
    promoPrice: product.promoPrice,
    quantity: item.quantity,
    stockQuantity: product.stockQuantity,
  };
}

async function getCartContext() {
  const session = await auth();
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(CART_COOKIE)?.value;

  if (!session?.user && !sessionId) {
    sessionId = crypto.randomUUID();
    cookieStore.set(CART_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return { session, sessionId };
}

export async function GET() {
  await connectToDatabase();
  const { session, sessionId } = await getCartContext();

  const cart = (await CartModel.findOne(
    session?.user ? { user: session.user.id } : { sessionId },
  )
    .populate({
      path: "items.product",
      populate: [{ path: "brand", select: "name" }],
    })
    .lean()) as any;

  const items = cart?.items?.map(serializeCartItem) ?? [];
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  await connectToDatabase();
  const { productId, quantity = 1 } = await request.json();
  const { session, sessionId } = await getCartContext();

  const product = (await ProductModel.findById(productId).lean()) as any;
  if (!product || !product.isActive || !product.isVisible) {
    return NextResponse.json({ message: "Produit indisponible." }, { status: 404 });
  }

  const selector = session?.user ? { user: session.user.id } : { sessionId };
  const existingCart = await CartModel.findOne(selector);
  if (!existingCart) {
    await CartModel.create({
      ...selector,
      items: [{ product: productId, quantity }],
    });
  } else {
    const item = existingCart.items.find(
      (entry: any) => entry.product.toString() === productId,
    );
    if (item) {
      item.quantity += quantity;
    } else {
      existingCart.items.push({ product: productId, quantity });
    }
    await existingCart.save();
  }

  return GET();
}

export async function PATCH(request: Request) {
  await connectToDatabase();
  const { productId, quantity } = await request.json();
  const { session, sessionId } = await getCartContext();

  const cart = await CartModel.findOne(
    session?.user ? { user: session.user.id } : { sessionId },
  );

  if (!cart) return NextResponse.json({ items: [] });

  cart.items = cart.items.filter((item: any) => {
    if (item.product.toString() !== productId) return true;
    item.quantity = quantity;
    return quantity > 0;
  });
  await cart.save();

  return GET();
}

export async function DELETE(request: Request) {
  await connectToDatabase();
  const body = await request.json().catch(() => ({}));
  const { productId } = body as { productId?: string };
  const { session, sessionId } = await getCartContext();

  const cart = await CartModel.findOne(
    session?.user ? { user: session.user.id } : { sessionId },
  );

  if (!cart) return NextResponse.json({ items: [] });

  if (productId) {
    cart.items = cart.items.filter((item: any) => item.product.toString() !== productId);
    await cart.save();
  } else {
    cart.items = [];
    await cart.save();
  }

  return GET();
}
