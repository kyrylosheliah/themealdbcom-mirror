import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "";

const emitHttpGet = (route: string) =>
  axios.get(BACKEND + route);

export interface MealSearch {
  s: string | null;
  c: string | null;
  a: string | null;
}

const emptySearch = (): MealSearch => ({
  s: null,
  c: null,
  a: null,
});

const searchKeyToTitle = (key: string): string | undefined => {
  switch (key) {
    case "s": return "Search";
    case "c": return "Category";
    case "a": return "Area";
  }
  return undefined;
};

const search = async (name?: string | null) =>
  emitHttpGet(`/search.php?s=${name || ""}`);

const filterWithCategory = async (category: string | null) =>
  emitHttpGet(`/filter.php?c=${category}`);

const filterWithArea = async (area: string | null) =>
  emitHttpGet(`/filter.php?a=${area}`);

const filterWithIngredient = async (ingredient: string | null) =>
  emitHttpGet(`/filter.php?i=${ingredient}`);

const getCategories = async () => emitHttpGet(`/list.php?c=list`);

const getById = async (id: any) => emitHttpGet(`/lookup.php?i=${id}`);

export default {
  emptySearch,
  searchKeyToTitle,
  search,
  filterWithCategory,
  filterWithArea,
  filterWithIngredient,
  getCategories,
  getById,
};
