import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RecipePage() {
  const router = useRouter();
  const { id } = router.query;
  const [meal, setMeal] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => setMeal(data.meals[0]));
    }
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
