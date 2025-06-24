import MealCard from "./MealCard";

export default function MealCol({ meals }: { meals: any[] }) {
  if (meals.length === 0) return <p>No meals found.</p>;
  return (
    <div className="grid grid-cols-1">
      {meals.map(meal => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
