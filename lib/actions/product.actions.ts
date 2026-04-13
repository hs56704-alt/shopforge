"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  inventory: z.coerce.number().min(0, "Inventory must be positive"),
  published: z.coerce.boolean().optional(),
});

export async function createProduct(formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    inventory: formData.get("inventory"),
    published: formData.get("published") === "true",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const store = await prisma.store.findUnique({
    where: { ownerId: session.user.id },
  });

  if (!store) return { error: "Store not found" };

  await prisma.product.create({
    data: {
      ...parsed.data,
      storeId: store.id,
      images: [],
    },
  });

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    inventory: formData.get("inventory"),
    published: formData.get("published") === "true",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await prisma.product.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
  const session = await auth();
  if (!session) redirect("/login");

  await prisma.product.delete({ where: { id } });

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function togglePublished(id: string, published: boolean) {
  const session = await auth();
  if (!session) redirect("/login");

  await prisma.product.update({
    where: { id },
    data: { published },
  });

  revalidatePath("/dashboard/products");
}