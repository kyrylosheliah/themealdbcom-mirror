import { useEffect, useState } from "react";

export default function CategoryFilter({
  onSelect,
}: {
  onSelect: (cat: string) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(res => res.json())
      .then(data => setCategories(data.meals.map((c: any) => c.strCategory)));
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
