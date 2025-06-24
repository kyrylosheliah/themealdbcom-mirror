import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "";

const emitHttpGet = (route: string) =>
  axios.get(BACKEND + route);

const ingredientKeys = Array.from({ length: 20 }, (_, i) => `strIngredient${i + 1}`);

const filterKeys = ["c", "i", "a", "s"];

const filterKeyToTitle = (key: string): string | undefined => {
  switch (key) {
    case "s": return "Search";
    case "c": return "Category";
    case "a": return "Area";
    case "i": return "Ingredient";
  }
  return "";
};

export interface MealSearch {
  key: string;
  value: string;
}

const encodeSearchParameter = (parameter: string) =>
  parameter.toLowerCase().replaceAll(" ", "_");

const decodeSearchParameter = (parameter: string) =>
  parameter.charAt(0).toUpperCase() + parameter.replaceAll("_", " ").slice(1);

const search = async (name?: string | null) =>
  emitHttpGet(`/search.php?s=${name || ""}`);

const filterWithCategory = async (category: string | null) =>
  emitHttpGet(`/filter.php?c=${category}`);

const filterWithArea = async (area: string | null) =>
  emitHttpGet(`/filter.php?a=${area}`);

const filterWithIngredient = async (ingredient: string | null) =>
  emitHttpGet(`/filter.php?i=${ingredient}`);

const getCategories = async () => emitHttpGet(`/list.php?c=list`);
const getAreas = async () => emitHttpGet(`/list.php?a=list`);
const getIngredients = async () => emitHttpGet(`/list.php?i=list`);

const getById = async (id: any) => emitHttpGet(`/lookup.php?i=${id}`);

export default {
  filterKeys,
  filterKeyToTitle,
  search,
  encodeSearchParameter,
  decodeSearchParameter,
  ingredientKeys,
  filterWithCategory,
  filterWithArea,
  filterWithIngredient,
  getCategories,
  getAreas,
  getIngredients,
  getById,
};
