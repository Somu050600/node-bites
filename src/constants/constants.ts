import { Position } from "@xyflow/react";

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
  OPTIONS_NODE_2: "view-options-nodes",
  LOADING_NODE: "loading-node",
};

export const MEAL_OPTIONS = {
  VIEW_INGREDIENTS: "View Ingredients",
  VIEW_TAGS: "View Tags",
  VIEW_DETAILS: "View Details",
};

export const NODE_WIDTH = 200;
export const NODE_HEIGHT = 100;
