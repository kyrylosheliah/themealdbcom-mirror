import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import {
  AreasResponse,
  CategoriesResponse,
  FilteredMealResponse,
  IngredientsResponse,
  MealsResponse,
} from "src/meals/meals.interface";

@Injectable()
export class MealsService {
  private baseUrl = `https://www.themealdb.com/api/json/v1/`;

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.baseUrl += parseInt(
      this.configService.get<string>("THEMEALSDBCOM_API_KEY") || "0",
    );
  }

  private async getCachedOrFetch<T>(key: string, url: string): Promise<T> {
    const cached = await this.cacheManager.get<T>(key);
    if (cached) return cached;
    const result = await axios
      .get<T>(`${this.baseUrl}${url}`)
      .then(res => res.data);
    await this.cacheManager.set(key, result);
    return result;
  }

  async searchMeals(name: string) {
    return this.getCachedOrFetch<MealsResponse>(
      `search_meals_${name}`,
      `/search.php?s=${name}`,
    );
  }

  async getMealById(id: string) {
    if (!id) return { meals: null };
    return this.getCachedOrFetch<MealsResponse>(
      `meal_${id}`,
      `/lookup.php?i=${id}`,
    );
  }

  async getRandomMeal() {
    // no caching
    return axios
      .get<MealsResponse>(`${this.baseUrl}/random.php`)
      .then(res => res.data);
  }

  async getAreas() {
    return this.getCachedOrFetch<AreasResponse>("areas", "/list.php?a=list");
  }

  async getCategories() {
    return this.getCachedOrFetch<CategoriesResponse>(
      "categories_list",
      "/list.php?c=list",
    );
  }

  async getIngredients() {
    return this.getCachedOrFetch<IngredientsResponse>(
      "ingredients",
      "/list.php?i=list",
    );
  }

  async filterByCategory(category: string) {
    return this.getCachedOrFetch<FilteredMealResponse>(
      `filter_by_category_${category}`,
      `/filter.php?c=${category}`,
    );
  }

  async filterByArea(area: string) {
    return this.getCachedOrFetch<FilteredMealResponse>(
      `filter_by_area_${area}`,
      `/filter.php?a=${area}`,
    );
  }

  async filterByIngredient(ingredient: string) {
    return this.getCachedOrFetch<FilteredMealResponse>(
      `filter_by_ingredient_${ingredient}`,
      `/filter.php?i=${ingredient}`,
    );
  }

  async searchByFirstLetter(letter: string) {
    if (!letter || letter.length !== 1) {
      return { meals: null };
    }
    return this.getCachedOrFetch<MealsResponse>(
      `search_by_letter_${letter}`,
      `/search.php?f=${letter}`,
    );
  }
}
