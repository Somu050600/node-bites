import { NodeProps } from "@xyflow/react";
import { CustomNodeProps } from "../components/CustomNode";
import { NODE_TYPES } from "../constants/constants";

export const getNodeType = (node: NodeProps<CustomNodeProps>) => {
  return Object.values(NODE_TYPES).find((f) => node?.id?.startsWith(f));
};

export const getIngredients = (details: Record<string, any>) => {
  return Object.keys(details).reduce((acc: string[], key: string) => {
    if (key.startsWith("strIngredient") && details[key]) acc.push(details[key]);
    return acc;
  }, []);
};

export const getLevel = (id: string) => {
  return +id.split("_")[1];
};
