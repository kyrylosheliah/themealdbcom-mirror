import MealCard from "./MealCard";

export default function MealList({ meals }: { meals: any[] }) {
  if (!meals.length) return <p>No meals found.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {meals.map(meal => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
