/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// ভাইয়া আমি খুব চেষ্টা করেছি, আমি ক্যাটাগরির বাটনগুলো আনতে পারছি কিন্তু এগুলোর লিংক আপ করাতে পারিনি, তা ছাড়া বাকি সব আমি কমপ্লিট করছি।

import React, { useEffect, useState } from "react";
import MealCard from "./MealCard";

const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [mealCat, setMealCat] = useState([]);

  const fetchRandomMeals = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log(data);
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching random meals:", error);
    }
  };

  const searchMeals = async () => {
    if (searchQuery.trim() === "") {
      fetchRandomMeals();
      setSearchResults([]);
      setNotFound(false);
      return;
    }

    const searchURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    try {
      const res = await fetch(searchURL);
      const data = await res.json();
      console.log(data);
      if (data.meals) {
        setSearchResults(data.meals);
        setNotFound(false);
      } else {
        setSearchResults([]);
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error searching meals:", error);
      setSearchResults([]);
      setNotFound(true);
    }
  };

  const fetchMealCategories = async () => {
    const CAT_API = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    try {
      const res = await fetch(CAT_API);
      const data = await res.json();
      console.log(data);
      setMealCat(data.categories);
    } catch (error) {
      console.error("Error fetching meal categories:", error);
    }
  };

  useEffect(() => {
    fetchRandomMeals();
    fetchMealCategories();
  }, []);

  useEffect(() => {
    searchMeals();
  }, [searchQuery]);

  return (
    <>
      <div>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white my-10">
            Search For Your <span className="text-[#d57d1f]">Meal</span>🔍
          </h1>

          <div className="bg-[#d57d1f] w-1/2 mx-auto p-2 border rounded-xl flex justify-between gap-2">
            <input
              type="text"
              placeholder="Ex... chicken"
              className="p-4 w-full rounded-xl border-transparent bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className=" bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-xl;"
              onClick={searchMeals}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-hidden w-[80%] mx-auto">
        <div className="flex justify-center space-x-4 mt-[35px] mb-[35px] overflow-x-scroll">
          {mealCat.map((category) => (
            <button
              key={category.idCategory}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded"
            >
              {category.strCategory}
            </button>
          ))}
        </div>
      </div>

      {notFound ? (
        <div className="container mx-auto border border-gray-600 min-h-[600px] rounded-xl mt-5 p-4">
          <div className="grid grid-cols-4 gap-5">
            <h1 className="text-xl col-span-4 text-center">Not Found</h1>
          </div>
        </div>
      ) : (
        <div className="container mx-auto border border-gray-600 min-h-[600px] rounded-xl mt-5 p-4">
          <div className="grid grid-cols-4 gap-5">
            {(searchQuery.trim() === "" ? meals : searchResults).map((data) => (
              <MealCard key={data.idMeal} data={data} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
