import { Position } from "@xyflow/react";
import {
  GlobeIcon,
  CategoryIcon,
  ViewDetailsIcon,
  MealIcon,
  IngredientIcon,
} from "../assets";

export const HANDLE_POSITIONS = {
  targetPosition: Position.Left,
  sourcePosition: Position.Right,
};

// **important** Do not alter the order(hierarchy) of the following keys
export const NODE_TYPES = {
  START_NODE: "start-node",
  CATEGORY_NODE: "category-node",
  OPTIONS_NODE_1: "view-meals-node",
  MEAL_NODE: "meal-node",
  OPTIONS_NODE_2: "view-options-node",
  INGREDIENT_NODE: "ingredient-node",
  LOADING_NODE: "loading-node",
};

export const ICONS = {
  [NODE_TYPES.START_NODE]: GlobeIcon,
  [NODE_TYPES.CATEGORY_NODE]: CategoryIcon,
  [NODE_TYPES.OPTIONS_NODE_1]: ViewDetailsIcon,
  [NODE_TYPES.MEAL_NODE]: MealIcon,
  [NODE_TYPES.OPTIONS_NODE_2]: ViewDetailsIcon,
  [NODE_TYPES.INGREDIENT_NODE]: IngredientIcon,
};

export const MEAL_OPTIONS = {
  VIEW_INGREDIENTS: "View Ingredients",
  VIEW_TAGS: "View Tags",
  VIEW_DETAILS: "View Details",
};

export const NODE_WIDTH = 200;
export const NODE_HEIGHT = 100;
