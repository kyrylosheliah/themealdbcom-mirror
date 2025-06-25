import axios from "axios";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

export interface MealsResponse {
  meals: Meal[] | null;
}

export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  stdDescription: string;
  strType: string | null;
}

export interface IngredientsResponse {
  meals: Ingredient[] | null;
}

export interface Area {
  strArea: string;
}

export interface AreasResponse {
  meals: Area[] | null;
}

export interface Category {
  strCategory: string;
}

export interface CategoriesResponse {
  meals: Category[] | null;
}

const ingredientKeys: Array<keyof Meal> = Array.from(
  { length: 20 },
  (_, i) => `strIngredient${i + 1}` as keyof Meal,
);

const filterKeys = ["c", "i", "a", "s"];

const filterKeyToTitle = (key: string): string | undefined => {
  switch (key) {
    case "s":
      return "Search";
    case "c":
      return "Category";
    case "a":
      return "Area";
    case "i":
      return "Ingredient";
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

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "";

const emitHttpGet = <T>(route: string) => axios.get<T>(BACKEND + route);

const search = async (name?: string | null) =>
  emitHttpGet<MealsResponse>(`/search.php?s=${name || ""}`);

const filterWithCategory = async (category: string | null) =>
  emitHttpGet<MealsResponse>(`/filter.php?c=${category}`);

const filterWithArea = async (area: string | null) =>
  emitHttpGet<MealsResponse>(`/filter.php?a=${area}`);

const filterWithIngredient = async (ingredient: string | null) =>
  emitHttpGet<MealsResponse>(`/filter.php?i=${ingredient}`);

const getCategories = async () =>
  emitHttpGet<CategoriesResponse>(`/list.php?c=list`);
const getAreas = async () => emitHttpGet<AreasResponse>(`/list.php?a=list`);
const getIngredients = async () =>
  emitHttpGet<IngredientsResponse>(`/list.php?i=list`);

const getById = async (id: string | number) =>
  emitHttpGet<MealsResponse>(`/lookup.php?i=${id}`);

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
