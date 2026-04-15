// components/marketplace/marketplace-search.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function MarketplaceSearch({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/marketplace?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/marketplace");
    }
  }

  function handleClear() {
    setQuery("");
    router.push("/marketplace");
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-white/30 pointer-events-none" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products across all stores..."
          className="w-full bg-white/5 border border-white/[0.08] rounded-2xl pl-11 pr-24 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
        />
        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 text-white/20 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
        {/* Search button */}
        <button
          type="submit"
          className="absolute right-2 bg-white text-black text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/90 transition-colors">
          Search
        </button>
      </div>
    </form>
  );
}