/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

export default function MealCard({ data }) {
  const {
    strMealThumb,
    strMeal,
    strInstructions,
    strArea,
    strCategory,
    strYoutube,
    idMeal,

    idCategory,
    strCategoryDescription,
    strCategoryThumb,
  } = data;
  return (
    <>
      <div className="card bg-base-100 shadow-xl meal-box border border-gray-500 rounded-xl">
        <figure>
          <img
            src={strMealThumb ? strMealThumb : strCategoryThumb}
            alt={strMeal}
          />
        </figure>

        <div className="p-3">
          <h3 className="heading">{strMeal}</h3>
          <p className="text-gray-400 my-2">
            {" "}
            {strInstructions.slice(0, 90)
              ? strInstructions.slice(0, 90)
              : strCategoryDescription.slice(0, 90)}{" "}
            ...{" "}
          </p>
          <p className="italic text-gray-500">
            <span>{strArea}</span> <span>{strCategory}</span>
          </p>
          <div className="my-4">
            <a href={strYoutube} target="_blank" className="btn">
              Watch
            </a>
            <Link to={`/meals/${idMeal ? idMeal : idCategory}`}>
              <button className="px-3 text-white">view Recipe</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
