import { useEffect, useState } from "react";
import MealsService, {
  Meal,
  MealSearch,
  MealsResponse,
} from "@/services/MealsService";
import { useSearchParams } from "next/navigation";

export function useMealSearch() {
  const searchParams = useSearchParams();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchTitle, setSearchTitle] = useState<string | undefined>();
  const initialSearch: MealSearch = { key: "", value: "" };
  const [search, setSearch]: [
    MealSearch,
    React.Dispatch<React.SetStateAction<MealSearch>>,
  ] = useState<MealSearch>(initialSearch);

  useEffect(() => {
    const s = searchParams.get("s");
    const c = searchParams.get("c");
    const a = searchParams.get("a");
    const i = searchParams.get("i");
    if (s) {
      setSearch({ key: "s", value: s });
    } else if (c) {
      setSearch({ key: "c", value: c });
    } else if (a) {
      setSearch({ key: "a", value: a });
    } else if (i) {
      setSearch({ key: "i", value: MealsService.decodeSearchParameter(i) });
    } else {
      setSearch({ key: "s", value: "" });
    }
  }, []);

  const updateVisibleState = () => {
    if (typeof window === "undefined") return;
    let href = window.location.href.split("?")[0];
    if (search.key && search.value) {
      href += `?${search.key}=${search.value}`;
    }
    history.replaceState(history.state, "", href);
    switch (search.key) {
      case "s":
        setSearchTitle(search.value ? "Searching" : "All");
        break;
      default:
        setSearchTitle(
          search.value
            ? MealsService.decodeSearchParameter(search.value)
            : undefined,
        );
        break;
    }
  };

  const fetchMeals = async () => {
    let mealsResponse: MealsResponse = undefined!;
    switch (search.key) {
      case "c":
        mealsResponse = await MealsService.filterWithCategory(
          search.value,
        ).then(res => res.data);
        break;
      case "a":
        mealsResponse = await MealsService.filterWithArea(search.value).then(
          res => res.data,
        );
        break;
      case "i":
        mealsResponse = await MealsService.filterWithIngredient(
          search.value,
        ).then(res => res.data);
        break;
      default:
        mealsResponse = await MealsService.search(search.value).then(
          res => res.data,
        );
        break;
    }
    if (mealsResponse) {
      setMeals(mealsResponse.meals || []);
    }
  };

  useEffect(() => {
    updateVisibleState();
    fetchMeals().catch(e => console.log(e));
  }, [search]);

  return {
    meals,
    search,
    setSearch,
    searchTitle,
  };
}
