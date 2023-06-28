import axios from "axios";

export const getFood = (query: string): Promise<any> => {
  const headers = {
    "x-app-id": "da2df0ba",
    "x-app-key": "74f415d5045d41936dad3eaa2bd55cd9",
  };

  return axios
    .get("https://trackapi.nutritionix.com/v2/search/instant", {
      headers,
      params: {
        query: query,
      },
    })
    .then((res) => {
      return res.data;
    }); // .data is specific to axios (returns JSON response)
};
