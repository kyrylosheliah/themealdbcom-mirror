import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "";

const fetchJson = (route: string) =>
  axios.get(BACKEND + route).then(res => res.data);

const search = async (name?: string) =>
  fetchJson(`/search.php?s=${name}`).catch(
    () => [],
  );

const filter = async ({
    category,
    area,
    ingredient,
  }: {
    category?: string;
    area?: string;
    ingredient?: string;
  }) => {
    let url = "/filter.php?";
    if (category) {
      url += `c=${category}`;
    } else if (area) {
      url += `a=${area}`;
    } else if (ingredient) {
      url += `i=${ingredient}`;
    }
    return fetchJson(url);
  };

export default {
  search,
  filter,
};