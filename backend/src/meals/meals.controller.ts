import { Controller, Get, Query } from "@nestjs/common";
import { MealsService } from "./meals.service";

@Controller()
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get("search.php")
  async search(
    @Query("s") name?: string,
    @Query("f") firstLetter?: string,
  ) {
    // Search meals by name
    if (name !== undefined) return this.mealsService.searchMeals(name);
    // Search by first letter
    if (firstLetter) return this.mealsService.searchByFirstLetter(firstLetter);
    return { meals: null };
  }

  // Get meal details by ID
  @Get("lookup.php")
  async getMealById(@Query("i") id: string) {
    return this.mealsService.getMealById(id);
  }

  // Get random meal
  @Get("random.php")
  async getRandomMeal() {
    return this.mealsService.getRandomMeal();
  }

  // List all search filters
  @Get("list.php")
  async getList(
    @Query("a") area?: string,
    @Query("c") category?: string,
    @Query("i") ingredient?: string,
  ) {
    if (area === "list") return this.mealsService.getAreas();
    if (category === "list") return this.mealsService.getCategories();
    if (ingredient === "list") return this.mealsService.getIngredients();
    return { meals: null };
  }

  // Filter meals by category
  @Get("filter.php")
  async filter(
    @Query("c") category?: string,
    @Query("a") area?: string,
    @Query("i") ingredient?: string,
  ) {
    if (category) return this.mealsService.filterByCategory(category);
    if (area) return this.mealsService.filterByArea(area);
    if (ingredient) return this.mealsService.filterByIngredient(ingredient);
    return { meals: null };
  }
}
