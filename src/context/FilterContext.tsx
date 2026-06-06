import { createContext, useContext, useState, type ReactNode } from "react";
import type { CategoryFilter, SortId } from "@/data/products";

type FilterCtx = {
  query: string;
  setQuery: (q: string) => void;
  category: CategoryFilter;
  setCategory: (c: CategoryFilter) => void;
  sort: SortId;
  setSort: (s: SortId) => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const Ctx = createContext<FilterCtx | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [sort, setSort] = useState<SortId>("featured");
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <Ctx.Provider
      value={{
        query, setQuery, category, setCategory, sort, setSort,
        searchOpen, openSearch: () => setSearchOpen(true), closeSearch: () => { setSearchOpen(false); setQuery(""); },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useFilters() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useFilters must be used inside FilterProvider");
  return c;
}
