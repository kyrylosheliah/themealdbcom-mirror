import MealCol from "@/components/MealCol";
import { useMealSearch } from "@/hooks/useMealSearch";
import MealsService, { Meal, MealsResponse } from "@/services/MealsService";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RecipePage() {
  const router = useRouter();
  const id = router.query["id"]
    ? typeof router.query["id"] === "string"
      ? router.query["id"]
      : router.query["id"][0]
    : "";
  const [meal, setMeal] = useState<Meal | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);

  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);
  const toggleSidebar = () => setSidebarIsOpen(!sidebarIsOpen);
  const similar = useMealSearch();

  const get = async () => {
    const recipeResponse = await MealsService.getById(id)
      .then(res => res.data)
      .catch((): MealsResponse => {
        setError(true);
        return { meals: [] };
      });
    if (recipeResponse.meals === null) return;
    if (Array.isArray(recipeResponse.meals)) {
      setMeal(recipeResponse.meals[0]);
      similar.setSearch({
        key: "c",
        value: recipeResponse.meals[0].strCategory,
      });
    }
  };

  const goBack = () => {
    router.push("/").catch(e => console.log(e));
  };

  useEffect(() => {
    if (id) get().catch(e => console.log(e));
    setSidebarIsOpen(false);
  }, [id]);

  if (meal === undefined || error) return <div className="p-4">Loading...</div>;

  if (error) return <div className="p-4">Error</div>;

  return (
    <>
      <Head>
        <title>{meal && `${meal.strMeal} - TheMealDB.com`}</title>
      </Head>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          sidebarIsOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarIsOpen(false)}
      />
      <figure
        className={`fixed top-0 right-0 h-full w-64 shadow-lg z-50 transform transition-transform duration-300 ${
          sidebarIsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-2 pt-2 flex flex-row items-center justify-between">
          <h2 className="self-center text-lg font-bold">Similar</h2>
          <button onClick={() => setSidebarIsOpen(false)} className="self-end">
            Close
          </button>
        </div>
        <Link
          href={`/?c=${meal.strCategory}`}
          className="mx-auto hover:underline"
        >
          <i>in the {meal.strCategory} category</i>
        </Link>
        <div className="flex flex-col items-center overflow-auto">
          <MealCol meals={similar.meals} />
        </div>
      </figure>
      <div className="p-4 flex items-center justify-center w-full max-w-5xl">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <button onClick={goBack}>Back to search</button>
            <button onClick={toggleSidebar}>Similar</button>
          </div>
          <h1 className="text-align-center text-3xl font-bold">
            {meal.strMeal}
          </h1>
          <h3 className="text-align-center">
            <Link href={`/?a=${meal.strArea}`} className="hover:underline">
              <i>{meal.strArea}</i>
            </Link>
          </h3>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="relative w-full min-h-80">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-full object-cover"
              />
            </div>
            <figure className="m-0">
              <h2 className="mb-4 text-xl font-semibold">Ingredients</h2>
              <div className="gap-x-6 gap-y-4 flex flex-row flex-wrap justify-evenly">
                {MealsService.ingredientKeys.map(
                  (key, i) =>
                    meal[key] && (
                      <Link
                        key={`ingredient_${i}`}
                        className="hover:underline whitespace-nowrap"
                        href={`/?i=${MealsService.encodeSearchParameter(meal[key])}`}
                      >
                        <i>{meal[key]}</i>
                      </Link>
                    ),
                )}
              </div>
            </figure>
          </div>
          <figure className="m-0">
            <h2 className="text-xl font-semibold">Instructions</h2>
            <blockquote className="ml-10 whitespace-pre-line">
              {meal.strInstructions}
            </blockquote>
          </figure>
        </div>
      </div>
    </>
  );
}
