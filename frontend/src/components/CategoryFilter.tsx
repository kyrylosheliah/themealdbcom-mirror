import MealsService from "@/services/MealsService";
import { useEffect, useState } from "react";

export default function CategoryFilter({
  onSelect,
}: {
  onSelect: (cat: string) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    const categoriesResponse = await MealsService.getCategories();
    setCategories(categoriesResponse.meals.map((c: any) => c.strCategory));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mb-4 flex gap-2 flex-wrap">
      <button
        onClick={() => onSelect("")}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className="px-3 py-1 bg-blue-200 rounded"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
