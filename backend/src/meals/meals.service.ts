import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import axios from "axios";

const API_KEY = process.env.THEMEALSDBCOM_API_KEY || "0";

@Injectable()
export class MealsService {
  private readonly baseUrl = `https://www.themealdb.com/api/json/v1/${API_KEY}`;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private async getCachedOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
  ): Promise<T> {
    const cached = await this.cacheManager.get<T>(key);
    if (cached) return cached;
    const result = await fetchFn();
    await this.cacheManager.set(key, result);
    return result;
  }

  async searchMeals(searchTerm: "c" | "a" | "i") {
    if (!searchTerm) return { meals: null };
    return this.getCachedOrFetch(`search_meals_${searchTerm}`, async () =>
      axios
        .get(`${this.baseUrl}/search.php?s=${searchTerm}`)
        .then(res => res.data),
    );
  }

  async getMealById(id: string) {
    if (!id) return { meals: null };
    return this.getCachedOrFetch(`meal_${id}`, async () =>
      axios.get(`${this.baseUrl}/lookup.php?i=${id}`).then(res => res.data),
    );
  }

  async getRandomMeal() {
    return axios.get(`${this.baseUrl}/random.php`).then(res => res.data);
  }

  async getCategories() {
    return this.getCachedOrFetch("categories", async () =>
      axios.get(`${this.baseUrl}/categories.php`).then(res => res.data),
    );
  }

  async getAreas() {
    return this.getCachedOrFetch("areas", async () =>
      axios.get(`${this.baseUrl}/list.php?a=list`).then(res => res.data),
    );
  }

  async getCategoriesList() {
    return this.getCachedOrFetch("categories_list", async () =>
      axios.get(`${this.baseUrl}/list.php?c=list`).then(res => res.data),
    );
  }

  async getIngredients() {
    return this.getCachedOrFetch("ingredients", async () =>
      axios.get(`${this.baseUrl}/list.php?i=list`).then(res => res.data),
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
    return this.getCachedOrFetch(cacheKey, async () => axios.get(url));
  }

  async searchByFirstLetter(letter: string) {
    if (!letter || letter.length !== 1) {
      return { meals: null };
    }
    return this.getCachedOrFetch(`search_by_letter_${letter}`, async () =>
      axios.get(`${this.baseUrl}/search.php?f=${letter}`).then(res => res.data),
    );
  }
}
