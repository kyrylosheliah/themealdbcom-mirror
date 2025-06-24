import MealsService from "@/services/MealsService";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RecipePage() {
  const router = useRouter();
  const { id } = router.query;
  const [meal, setMeal] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  const get = async () => {
    const recipeResponse = await MealsService.getById(id)
      .then(res => res.data)
      .catch(() => setError(true));
    if (recipeResponse.meals === null) return;
    if (Array.isArray(recipeResponse.meals)) {
      setMeal(recipeResponse.meals[0]);
    }
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (id) get();
  }, [id]);

  if (!(meal || error)) return <div className="p-4">Loading...</div>;

  if (error) return <div className="p-4">Error</div>;

  return (
    <div className="p-4">
      <button onClick={goBack}>Go Back</button>
      <h1 className="text-align-center text-3xl font-bold">{meal.strMeal}</h1>
      <h3 className="text-align-center">
        <Link href={`/?a=${meal.strArea}`}>{meal.strArea}</Link>
      </h3>
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
