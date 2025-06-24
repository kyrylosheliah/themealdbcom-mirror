import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

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
    const result = await axios.get(url).then(res => res.data);
    await this.cacheManager.set(key, result);
    return result;
  }

  async searchMeals(name?: string) {
    name = name || "";
    return this.getCachedOrFetch(
      `search_meals_${name}`,
      `${this.baseUrl}/search.php?s=${name}`,
    );
  }

  async getMealById(id: string) {
    if (!id) return { meals: null };
    return this.getCachedOrFetch(
      `meal_${id}`,
      `${this.baseUrl}/lookup.php?i=${id}`,
    );
  }

  async getRandomMeal() {
    return axios.get(`${this.baseUrl}/random.php`).then(res => res.data);
  }

  async getAreas() {
    return this.getCachedOrFetch("areas", `${this.baseUrl}/list.php?a=list`);
  }

  async getCategories() {
    return this.getCachedOrFetch(
      "categories_list",
      `${this.baseUrl}/list.php?c=list`,
    );
  }

  async getIngredients() {
    return this.getCachedOrFetch(
      "ingredients",
      `${this.baseUrl}/list.php?i=list`,
    );
  }

  async filterMeals({
    category,
    area,
    ingredient,
  }: {
    category?: string;
    area?: string;
    ingredient?: string;
  }) {
    let url = `${this.baseUrl}/filter.php?`;
    let cacheKey = "filter_meals_";
    if (category) {
      url += `c=${category}`;
      cacheKey += `category_${category}`;
    } else if (area) {
      url += `a=${area}`;
      cacheKey += `area_${area}`;
    } else if (ingredient) {
      url += `i=${ingredient}`;
      cacheKey += `ingredient_${ingredient}`;
    } else {
      return { meals: null };
    }
    return this.getCachedOrFetch(cacheKey, url);
  }

  async searchByFirstLetter(letter: string) {
    if (!letter || letter.length !== 1) {
      return { meals: null };
    }
    return this.getCachedOrFetch(
      `search_by_letter_${letter}`,
      `${this.baseUrl}/search.php?f=${letter}`,
    );
  }
}
