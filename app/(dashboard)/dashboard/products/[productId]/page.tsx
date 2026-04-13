import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import ProductForm from "@/components/dashboard/product-form";
import DeleteProductButton from "@/components/dashboard/delete-product-button";
import { Metadata } from "next";

interface Props {
  params: Promise<{ productId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = await prisma.product.findUnique({ where: { id: productId } });
  return { title: product ? `Edit ${product.name}` : "Product not found" };
}

export default async function EditProductPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/login");

  const { productId } = await params;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-sm text-white/40 mt-1">{product.name}</p>
        </div>
        <DeleteProductButton productId={product.id} />
      </div>
      <ProductForm product={product} />
    </div>
  );
}