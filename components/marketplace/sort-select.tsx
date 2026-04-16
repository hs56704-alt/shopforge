"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/marketplace?${params.toString()}`);
  }

  return (
    <select
      defaultValue={currentSort}
      onChange={handleChange}
      className="bg-white/5 border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white/60 focus:outline-none cursor-pointer">
      <option value="newest">Newest first</option>
      <option value="price_asc">Price: Low to high</option>
      <option value="price_desc">Price: High to low</option>
    </select>
  );
}