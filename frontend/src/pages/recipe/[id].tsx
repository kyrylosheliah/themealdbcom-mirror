import MealsService from "@/services/MealsService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RecipePage() {
  const router = useRouter();
  const { id } = router.query;
  const [meal, setMeal] = useState<any>(null);

  const get = async () => {
    const recipeResponse = await MealsService.getById(id);
    if (recipeResponse.meals === null) return;
    if (Array.isArray(recipeResponse.meals)) {
      setMeal(recipeResponse.meals[0]);
    }
  };

  useEffect(() => {
    if (id) get();
  }, [id]);

  if (!meal) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="my-4 w-full max-w-md"
      />
      <h2 className="text-xl font-semibold">Instructions</h2>
      <p className="whitespace-pre-line mt-2">{meal.strInstructions}</p>
    </div>
  );
}
