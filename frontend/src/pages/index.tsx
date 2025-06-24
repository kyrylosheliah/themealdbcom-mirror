import { useEffect, useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import MealList from "@/components/MealList";
import MealsService, { MealSearch } from "@/services/MealsService";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState<MealSearch>(MealsService.emptySearch());
  const [searchTitle, setSearchTitle] = useState<string | undefined>(undefined);

  const setCategory = (category: string | null) => {
    const newSearch = MealsService.emptySearch();
    setSearch({...newSearch, ...{ c: category }});
  };

  const fetchMeals = async () => {
    let mealsResponse: any = undefined!;
    if (search.c) {
      mealsResponse = await MealsService.filterWithCategory(search.c).then(
        res => res.data,
      );
    } else if (search.a) {
      mealsResponse = await MealsService.filterWithArea(search.a).then(
        res => res.data,
      );
    } else {
      mealsResponse = await MealsService.search(search.s).then(res => res.data);
    }
    if (mealsResponse) {
      setMeals(mealsResponse.meals || []);
    }
  };

  useEffect(() => {
    const newSearch = MealsService.emptySearch();
    const s = searchParams.get("s");
    const c = searchParams.get("c");
    const a = searchParams.get("a");
    const i = searchParams.get("i");
    if (s) {
      setSearch({...newSearch, ...{ s }});
    } else if (c) {
      setSearch({...newSearch, ...{ c }});
    } else if (a) {
      setSearch({...newSearch, ...{ a }});
    } else if (i) {
      setSearch({...newSearch, ...{ i }});
    }
  }, []);

  const updateSearchParameters = () => {
    let href = window.location.origin + window.location.pathname;
    let newSearchTitle = undefined;
    for (const key in search) {
      const value = search[key as keyof MealSearch];
      if (!value) continue;
      href += `?${key}=${value}`;
      newSearchTitle = value;
      break;
    }
    setSearchTitle(
      newSearchTitle
        ? MealsService.decodeSearchParameter(newSearchTitle)
        : "",
    );
    history.replaceState(history.state, "", href);
  };

  useEffect(() => {
    updateSearchParameters();
    fetchMeals();
  }, [search]);

  return (
    <main className="p-4">
      <Head>
        <title>
          {searchTitle ? `${searchTitle} - TheMealDB.com` : "TheMealDB.com - mirror"}
        </title>
      </Head>
      <h1 className="text-align-center text-3xl font-bold mb-4">
        {(searchTitle || "All") + " Recipes"}
      </h1>
      <CategoryFilter onSelect={setCategory} />
      <MealList meals={meals} />
    </main>
  );
}
