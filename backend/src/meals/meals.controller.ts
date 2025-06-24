import { Controller, Get, Query } from "@nestjs/common";
import { MealsService } from "./meals.service";

@Controller()
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  // Search meals by name
  @Get("search.php")
  async searchMeals(@Query("s") search: string) {
    return this.mealsService.searchMeals(search);
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

  // List all categories
  @Get("categories.php")
  async getCategories() {
    return this.mealsService.getCategories();
  }

  // List all areas
  @Get("list.php")
  async getList(
    @Query("a") area?: string,
    @Query("c") category?: string,
    @Query("i") ingredient?: string,
  ) {
    if (area === "list") return this.mealsService.getAreas();
    if (category === "list") return this.mealsService.getCategoriesList();
    if (ingredient === "list") return this.mealsService.getIngredients();
    return { meals: null };
  }

  // Filter meals by category
  @Get("filter.php")
  async filterMeals(
    @Query("c") category?: string,
    @Query("a") area?: string,
    @Query("i") ingredient?: string,
  ) {
    return this.mealsService.filterMeals({ category, area, ingredient });
  }

  // Search meals by first letter
  @Get("search.php")
  async searchByFirstLetter(@Query("f") firstLetter: string) {
    if (firstLetter) {
      return this.mealsService.searchByFirstLetter(firstLetter);
    }
  }
}
