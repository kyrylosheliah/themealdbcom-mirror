import { Test, TestingModule } from "@nestjs/testing";
import { MealsController } from "./meals.controller";
import { MealsService } from "./meals.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { AreasResponse, CategoriesResponse, IngredientsResponse, Meal } from "src/meals/meals.interface";

const ingredientKeys: Array<keyof Meal> = Array.from(
  { length: 20 },
  (_, i) => `strIngredient${i + 1}` as keyof Meal,
);

describe("MealsController", () => {
  let controller: MealsController;
  let service: MealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
        CacheModule.register(),
      ],
      controllers: [MealsController],
      providers: [MealsService],
    }).compile();

    controller = module.get<MealsController>(MealsController);
    service = module.get<MealsService>(MealsService);
  });

  describe("search()", () => {
    it("should search by name", async () => {
      const result = await controller.search("Chicken", undefined);
      expect(result.meals !== null).toBe(true);
      expect(result.meals!.length).toBeGreaterThan(1);
      const firstItem = result.meals![0];
      expect(typeof firstItem.idMeal).toEqual("string");
      expect(firstItem.idMeal.length).toBeGreaterThan(0);
    });

    it("should search by first letter", async () => {
      const result = await controller.search(undefined, "C");
      expect(result.meals !== null).toBe(true);
      expect(result.meals!.length).toBeGreaterThan(1);
      const firstItem = result.meals![0];
      expect(typeof firstItem.idMeal).toEqual("string");
      expect(firstItem.idMeal.length).toBeGreaterThan(0);
    });
  });

  it("getMealById() should return meal by id", async () => {
    const result = await controller.getMealById("52772");
    expect(result.meals !== null).toBe(true);
    expect(result.meals!.length).toEqual(1);
    const firstItem = result.meals![0];
    expect(typeof firstItem.idMeal).toEqual("string");
    expect(firstItem.idMeal.length).toBeGreaterThan(0);
  });

  it("getRandomMeal() should return random meal", async () => {
    const result = await controller.getRandomMeal();
    expect(result.meals !== null).toBe(true);
    expect(result.meals!.length).toEqual(1);
    const firstItem = result.meals![0];
    expect(typeof firstItem.idMeal).toEqual("string");
    expect(firstItem.idMeal.length).toBeGreaterThan(0);
  });

  describe("getList()", () => {
    it("should return categories", async () => {
      const result = await controller.getList(undefined, "list", undefined) as CategoriesResponse;
      expect(result.meals !== null).toBe(true);
      expect(result.meals!.length).toBeGreaterThan(0);
      expect(typeof result.meals![0].strCategory).toEqual("string");
    });

    it("should return areas", async () => {
      const result = await controller.getList("list", undefined, undefined) as AreasResponse;
      expect(result.meals !== null).toBe(true);
      expect(result.meals!.length).toBeGreaterThan(0);
      expect(typeof result.meals![0].strArea).toEqual("string");
    });

    it("should return ingredients", async () => {
      const result = await controller.getList(undefined, undefined, "list") as IngredientsResponse;
      expect(result.meals !== null).toBe(true);
      expect(result.meals!.length).toBeGreaterThan(0);
      expect(typeof result.meals![0].strIngredient).toEqual("string");
    });

    it("should return null meals if no query matches", async () => {
      const result = await controller.getList(undefined, undefined, undefined);
      expect(result).toEqual({ meals: null });
    });
  });

  describe("filter()", () => {
    it("should filter by category", async () => {
      const result = await controller.filter("Seafood", undefined, undefined);
      expect(result.meals !== null).toBe(true);
      expect(result.meals!.length).toBeGreaterThan(0);
      const entityFetch = await service.getMealById(result.meals![0].idMeal);
      expect(entityFetch.meals !== null).toBe(true);
      expect(entityFetch.meals!.length).toEqual(1);
      const firstEntity = entityFetch.meals![0];
      expect(firstEntity.strCategory.toLowerCase()).toEqual("seafood");
    });

    it("should filter by area", async () => {
      const result = await controller.filter(undefined, "Canadian", undefined);
      expect(result.meals !== null).toBe(true);
      expect(result.meals!.length).toBeGreaterThan(0);
      const entityFetch = await service.getMealById(result.meals![0].idMeal);
      expect(entityFetch.meals !== null).toBe(true);
      expect(entityFetch.meals!.length).toEqual(1);
      const firstEntity = entityFetch.meals![0];
      expect(firstEntity.strArea.toLowerCase()).toEqual("canadian");
    });

    it("should filter by ingredient", async () => {
      const result = await controller.filter(undefined, undefined, "chicken");
      expect(result.meals !== null).toBe(true);
      expect(result.meals!.length).toBeGreaterThan(0);
      const entityFetch = await service.getMealById(result.meals![0].idMeal);
      expect(entityFetch.meals !== null).toBe(true);
      expect(entityFetch.meals!.length).toEqual(1);
      const firstEntity = entityFetch.meals![0];
      const firstItemHasIngredient = result.meals
        ? ingredientKeys.some(i =>
            firstEntity[i] ? firstEntity[i].toLowerCase() === "chicken" : false,
          )
        : false;
      expect(firstItemHasIngredient).toBe(true);
    });

  });
});
