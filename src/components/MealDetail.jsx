/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MealDetail() {
  const params = useParams();
  //   console.log(params);

  const MealID_API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;

  const [meal, setMeal] = useState(null);
  const fetchMealDetail = async () => {
    try {
      const res = await fetch(MealID_API);
      const data = await res.json();
      //   console.log(data);
      setMeal(data.meals[0]);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  useEffect(() => {
    fetchMealDetail();
  }, [MealID_API]);

  return (
    <>
      <div>
        <div className="flex items-center justify-center min-h-screen ">
          <div
            id="details"
            className="top-0 left-0 w-full h-full flex items-center justify-center"
          >
            <div className="popup bg-white w-[70%] min-h-[500px] p-10 rounded-xl">
              <figure>
                <img
                  className="mx-auto w-[40%] min-h-[40%] mb-[30px] rounded-xl"
                  src={meal ? meal.strMealThumb : "Loading..."}
                  alt={meal ? meal.strMeal : "Loading..."}
                />
              </figure>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {meal ? meal.strMeal : "Loading..."}
              </h2>
              <h3 className="text-black mb-4 ">
                {meal ? meal.strArea : "Loading..."}
              </h3>
              <p className="mb-6 text-black">
                {meal ? meal.strInstructions : "Loading..."}
              </p>
              <a href={meal ? meal.strYoutube : "Loading..."}>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                  Watch
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
