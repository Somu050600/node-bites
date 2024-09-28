import { useState, useEffect, useContext } from "react";
import {
  fetchCategories,
  fetchMealsByCategory,
  fetchMealDetails,
} from "../api/mealAPI";
import { Category, Meal } from "../types/types";
import { MealContext } from "../context/MealContext";

export const useMealData = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mealDetails, setMealDetails } = useContext(MealContext);

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCategories();
        setCategories(data.categories.slice(0, 5));
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getCategories();
  }, []);

  const getMealsByCategory = async (category: string) => {
    setIsLoading(true);
    try {
      const data: { meals: Meal[] } = await fetchMealsByCategory(category);
      setMeals(data.meals.slice(0, 5));
      return data.meals.slice(0, 5);
    } catch (error) {
      console.error("Error fetching meals by category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMealDetails = async (mealId: string) => {
    setIsLoading(true);
    try {
      const data = await fetchMealDetails(mealId);
      setMealDetails(data.meals[0]);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    categories,
    meals,
    mealDetails,
    isLoading,
    getMealsByCategory,
    getMealDetails,
  };
};
