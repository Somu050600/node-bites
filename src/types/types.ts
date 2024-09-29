import { Node as XyflowNode } from "@xyflow/react";

export interface Node extends XyflowNode {
  data: {
    label: string;
    data?: any;
  };
}

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type MealDetails = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
  strTags: string;
  strYoutube: string;
  strSource: string;
  strMealThumb: string;
};
