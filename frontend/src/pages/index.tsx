import MealFilterInput from "@/components/MealFilterInput";
import MealList from "@/components/MealList";
import Head from "next/head";
import { useMealSearch } from "@/hooks/useMealSearch";

export default function Home() {
  const { meals, search, searchTitle, setSearch } = useMealSearch();

  return (
    <main className="p-4">
      <Head>
        <title>
          {searchTitle
            ? `${searchTitle} - TheMealDB.com`
            : "TheMealDB.com - mirror"}
        </title>
      </Head>
      <h1 className="text-align-center text-3xl font-bold mb-4">
        {(searchTitle ? searchTitle + " " : "") + "Recipes"}
      </h1>
      <MealFilterInput search={search} select={setSearch} />
      <MealList meals={meals} />
    </main>
  );
}
