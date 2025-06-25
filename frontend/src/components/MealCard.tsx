import { Meal } from "@/services/MealsService";
import Link from "next/link";

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <Link href={`/recipe/${meal.idMeal}`}>
      <figure className="group hover:shadow-xl m-0">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="p-0 m-0 w-full h-40 object-cover"
        />
        {/* <figcaption className="font-semibold text-center">{meal.strMeal}</figcaption> */}
        <button type="button" className="p-0 m-0 mt-2 w-full">
          {meal.strMeal}
        </button>
      </figure>
    </Link>
  );
}
