import { Metadata } from "next";
import ProductForm from "@/components/dashboard/product-form";

export const metadata: Metadata = {
  title: "Add Product",
};

export default function NewProductPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Product</h1>
        <p className="text-sm text-white/40 mt-1">
          Fill in the details to add a new product to your store.
        </p>
      </div>
      <ProductForm />
    </div>
  );
}