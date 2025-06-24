import Link from "next/link";

export default function MealCard({ meal }: { meal: any }) {
  return (
    <Link href={`/recipe/${meal.idMeal}`}>
      <div className="border p-2 rounded hover:shadow cursor-pointer">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-40 object-cover rounded"
        />
        <h3 className="mt-2 font-semibold text-center">{meal.strMeal}</h3>
      </div>
    </Link>
  );
}
