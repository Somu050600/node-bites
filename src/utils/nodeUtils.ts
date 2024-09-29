import { NodeProps } from "@xyflow/react";
import { CustomNodeProps } from "../components/CustomNode";
import { NODE_TYPES } from "../constants/constants";

export const getNodeType = (node: NodeProps<CustomNodeProps>) => {
  return Object.values(NODE_TYPES).find((f) => node?.id?.startsWith(f));
};

export const getIngredients = (details) => {
  const ingredients = Object.keys(details).reduce((acc, key) => {
    if (key.startsWith("strIngredient") && details[key]) {
      acc.push(details[key]);
    }
    return acc;
  }, []);

  return ingredients.slice(0, 5);
};

export const getLevel = (id: string) => {
  return +id.split("_")[1];
};
