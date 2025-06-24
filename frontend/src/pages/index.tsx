import { useEffect, useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import MealList from "@/components/MealList";
import MealsService from "@/services/MealsService";

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState("");

  const fetchMeals = async () => {
    let mealsResponse: any = undefined!;
    if (category) {
      mealsResponse = await MealsService.filter({ category });
    } else {
      mealsResponse = await MealsService.search(category);
    }
    setMeals(mealsResponse || []);
  };

  useEffect(() => {
    fetchMeals();
  }, [category]);

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>
      <CategoryFilter onSelect={setCategory} />
      <MealList meals={meals} />
    </main>
  );
}
