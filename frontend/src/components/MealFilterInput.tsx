import MealsService, { MealSearch } from "@/services/MealsService";
import { useEffect, useState } from "react";

export default function CategoryFilter({
  search,
  select,
}: {
  search: MealSearch;
  select: (search: MealSearch) => void;
}) {
  const [chips, setChips] = useState<string[]>([]);

  const fetchCategories = async () => {
    const response = await MealsService.getCategories()
      .then(res => res.data)
      .catch(() => []);
    setChips(response.meals.map((c: any) => c.strCategory));
  };

  const fetchIngredients = async () => {
    const response = await MealsService.getIngredients()
      .then(res => res.data)
      .catch(() => []);
    setChips(response.meals.map((c: any) => c.strIngredient));
  };

  const fetchAreas = async () => {
    const response = await MealsService.getAreas()
      .then(res => res.data)
      .catch(() => []);
    setChips(response.meals.map((c: any) => c.strArea));
  };

  const reset = () => setChips([]);

  useEffect(() => {
    switch (search.key) {
      case "c":
        fetchCategories();
        break;
      case "a":
        fetchAreas();
        break;
      case "i":
        fetchIngredients();
        break;
      default:
        reset();
        break;
    }
  }, [search]);

  return (
    <div className="mb-4 flex gap-2 flex-wrap">
      <select
        className="w-30"
        onChange={e => select({ key: e.currentTarget.value, value: "" })}
        value={search.key}
      >
        {MealsService.filterKeys.map(key => (
          <option key={`filter_key_${key}`} value={key}>
            {MealsService.filterKeyToTitle(key)}
          </option>
        ))}
      </select>
      {search.key === "s" || search.key === "i" ? (
        <>
          <input
            type="text"
            value={search.value}
            onInput={e =>
              select({ key: search.key, value: e.currentTarget.value })
            }
            list={search.key === "i" ? "ingredient_picker" : undefined}
            className="flex-grow"
          />
          {search.key === "i" && (
            <datalist id="ingredient_picker">
              {chips.map(chip => (
                <option value={chip}>{chip}</option>
              ))}
            </datalist>
          )}
        </>
      ) : (
        <>
          <button
            onClick={() => select({ key: "s", value: "" })}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            All
          </button>
          {chips.map(chip => (
            <button
              key={`filter_key_${search.key}_value_${chip}`}
              onClick={() => select({ key: search.key, value: chip })}
              className={`px-3 py-1 bg-blue-200 rounded ${search.value === chip && "underline"}`}
            >
              {chip}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
