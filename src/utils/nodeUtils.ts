import { NodeProps } from "@xyflow/react";
import { CustomNodeProps } from "../components/CustomNode";
import { NODE_TYPES } from "../constants/constants";
import { Node } from "../types/types";

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

//Binary search
export const getNodesArrayIndex = (arr: Node[], target: number) => {
  let low = 0;
  let high = arr.length - 1;
  let res = -1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (getLevel(arr[mid].id) < target) low = mid + 1;
    else high = mid - 1;

    if (getLevel(arr[mid].id) === target) res = mid;
  }

  return res;
};
