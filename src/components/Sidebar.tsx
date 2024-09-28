import React, { memo, useContext } from "react";
import { MealContext } from "../context/MealContext";

const Sidebar: React.FC = () => {
  const { mealDetails, setMealDetails } = useContext(MealContext);
  const tags = mealDetails?.strTags?.split(",");

  return (
    <div className="w-96 flex flex-col gap-3 bg-gray-100 p-3 fixed right-0 top-0 h-full  shadow-lg z-50 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-row items-center justify-between border-0 border-b border-b-1 border-b-gray-300">
        <h2 className="my-2 text-xl font-medium ">{mealDetails?.strMeal}</h2>
        <button className="text-right text-xl" onClick={() => setMealDetails()}>
          &#x2715;
        </button>
      </div>
      {mealDetails && (
        <>
          <img
            src={mealDetails?.strMealThumb}
            alt={mealDetails?.strMeal}
            className="mb-4 bg-slate-300 w-full h-auto aspect-square"
          />
          {tags?.length && (
            <div>
              {tags.map((tag, index) => (
                <span
                  key={tag + index}
                  className="border rounded-3xl px-2 py-1 border-purple-900 bg-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className=" grid grid-cols-2 gap-1 text-md ">
            <span>Category</span>
            <span>{mealDetails?.strCategory}</span>
            <span>Area</span>
            <span>{mealDetails?.strArea}</span>
            <span>YouTube</span>
            <a
              href={mealDetails?.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="underline break-words text-wrap leading-none"
            >
              {mealDetails?.strYoutube ?? "-"}
            </a>
            <span>Recipe</span>
            <a
              href={mealDetails?.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="underline break-words text-wrap leading-none"
            >
              {mealDetails?.strSource ?? "-"}
            </a>
          </div>
          <div className="flex flex-col border rounded p-2 overflow-y-auto overflow-x-hidden">
            <h3 className="font-bold mb-2">Instructions</h3>
            <p className="text-sm">{mealDetails?.strInstructions}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Sidebar);
