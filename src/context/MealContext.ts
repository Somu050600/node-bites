import { createContext } from "react";
import { MealDetails } from "../types/types";

interface MealContextType {
  mealDetails?: MealDetails;
  setMealDetails: (mealDetails?: MealDetails) => void;
}

export const MealContext = createContext<MealContextType>(
  {} as MealContextType
);
