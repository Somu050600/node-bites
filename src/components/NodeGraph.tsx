import React, { memo, useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
  Edge,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";
import { useMealData } from "../hooks/useMealData";
import {
  HANDLE_POSITIONS,
  MEAL_OPTIONS,
  NODE_HEIGHT,
  NODE_TYPES,
  NODE_WIDTH,
} from "../constants/constants";
import "@xyflow/react/dist/style.css";
import Spinner from "./Spinner";
import CustomNode from "./CustomNode";
import { getLevel } from "../utils/nodeUtils";
import { Node } from "../types/types";

const initialNodes: Node[] = [
  {
    id: NODE_TYPES.START_NODE + "_0_0",
    type: "customNode",
    data: { label: "Explore" },
    position: { x: 100, y: 300 },
    ...HANDLE_POSITIONS,
  },
];

const markerEnd = {
  type: MarkerType.ArrowClosed,
};

const nodeType = { customNode: CustomNode };

const NodeGraph: React.FC = () => {
  const {
    categories,
    getMealsByCategory,
    getMealsByIngredient,
    getMealDetails,
    getMealIngredients,
  } = useMealData();
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection: any) =>
      setEdges((eds) => addEdge({ ...connection, markerEnd: markerEnd }, eds)),
    []
  );

  const getNewNode = useCallback(
    (
      id: string,
      data: any,
      position: any,
      nodeType: string = "customNode"
    ): Node => ({
      id,
      data,
      position,
      type: nodeType,
      ...HANDLE_POSITIONS,
    }),
    []
  );

  const addNewNode = useCallback(
    (node: Node, newNode: Node) => {
      setNodes((nds) => [...nds, newNode]);
      onConnect({
        id: `${node?.id}->${newNode?.id}`,
        source: node.id,
        target: newNode.id,
      });
    },
    [onConnect]
  );

  // to remove entire sub-tree nodes
  const removeSubtree = useCallback((level: number) => {
    setNodes((nds) => nds.filter((node) => getLevel(node.id) <= level));
    setEdges((eds) => eds.filter((edge) => getLevel(edge.id) < level));
  }, []);

  const getLoadingNodes = useCallback(
    (node: Node) => {
      const level = getLevel(node.id);
      removeSubtree(level);

      // placehoders for loading
      for (let i = 0; i < 5; i++) {
        addNewNode(
          node,
          getNewNode(
            `${NODE_TYPES.LOADING_NODE}_${level + 1}_${i}`,
            {
              label: (
                <div className="flex items-center justify-center gap-2">
                  <Spinner /> Loading...
                </div>
              ),
            },
            {
              x: node.position.x + NODE_WIDTH,
              y: node.position.y + i * NODE_HEIGHT - 200,
            }
          )
        );
      }
    },
    [addNewNode, getNewNode, removeSubtree]
  );

  const handleOptionClick = useCallback(
    async (node: Node) => {
      const { data, id } = node;
      const level = getLevel(id);

      if (data?.label === MEAL_OPTIONS.VIEW_INGREDIENTS) {
        getLoadingNodes(node);

        const ingredients = await getMealIngredients(node?.data?.data?.idMeal);
        removeSubtree(level);

        ingredients?.forEach((ing, i) => {
          addNewNode(
            node,
            getNewNode(
              `${NODE_TYPES.INGREDIENT_NODE}_${level + 1}_${i}`,
              {
                label: ing,
                data: { ingredient: ing },
              },
              {
                x: node.position.x + NODE_WIDTH,
                y: node.position.y + i * NODE_HEIGHT - 200,
              }
            )
          );
        });
        return;
      } else if (data?.label === MEAL_OPTIONS.VIEW_TAGS) {
        return;
      } else if (data?.label === MEAL_OPTIONS.VIEW_DETAILS) {
        getMealDetails(data?.data?.idMeal);
        return;
      }
    },
    [
      addNewNode,
      getLoadingNodes,
      getMealDetails,
      getMealIngredients,
      getNewNode,
      removeSubtree,
    ]
  );

  const onNodeClick = async (node: Node) => {
    const [nodeType, level, index] = node.id.split("_");

    switch (nodeType) {
      case NODE_TYPES.START_NODE: {
        categories.forEach((category, i) =>
          addNewNode(
            node,
            getNewNode(
              `${NODE_TYPES.CATEGORY_NODE}_${+level + 1}_${i}`,
              { label: category.strCategory, data: category },
              { x: node.position.x + NODE_WIDTH, y: (i + 1) * NODE_HEIGHT }
            )
          )
        );
        break;
      }
      case NODE_TYPES.CATEGORY_NODE: {
        removeSubtree(+level);

        addNewNode(
          node,
          getNewNode(
            `${NODE_TYPES.OPTIONS_NODE_1}_${+level + 1}_${index}`,
            { label: "View Meals", data: node?.data.data },
            { x: node.position.x + NODE_WIDTH, y: node.position.y }
          )
        );
        break;
      }
      case NODE_TYPES.OPTIONS_NODE_1: {
        getLoadingNodes(node);

        const categoryName = node?.data?.data?.strCategory;
        if (categoryName) {
          const meals = await getMealsByCategory(categoryName);
          removeSubtree(+level); // to remove loading nodes

          meals?.forEach((meal, idx) =>
            addNewNode(
              node,
              getNewNode(
                `${NODE_TYPES.MEAL_NODE}_${+level + 1}_${idx}`,
                { label: meal.strMeal, data: meal },
                {
                  x: node.position.x + NODE_WIDTH,
                  y: node.position.y + idx * NODE_HEIGHT - 200,
                }
              )
            )
          );
        }
        break;
      }
      case NODE_TYPES.MEAL_NODE:
        removeSubtree(+level);
        Object.values(MEAL_OPTIONS)?.forEach((opt, idx) =>
          addNewNode(
            node,
            getNewNode(
              `${NODE_TYPES.OPTIONS_NODE_2}_${+level + 1}_${index}_${idx}`,
              { label: opt, data: node?.data?.data },
              {
                x: node.position.x + NODE_WIDTH,
                y: node.position.y + idx * NODE_HEIGHT - 100,
              }
            )
          )
        );
        break;

      case NODE_TYPES.OPTIONS_NODE_2:
        handleOptionClick(node);
        break;

      case NODE_TYPES.INGREDIENT_NODE: {
        getLoadingNodes(node);

        const ingredient = node?.data?.data?.ingredient;
        if (ingredient) {
          const meals = await getMealsByIngredient(ingredient);
          removeSubtree(+level); // to remove loading nodes

          meals?.forEach((meal, idx) =>
            addNewNode(
              node,
              getNewNode(
                `${NODE_TYPES.MEAL_NODE}_${+level + 1}_${idx}`,
                { label: meal.strMeal, data: meal },
                {
                  x: node.position.x + NODE_WIDTH,
                  y: node.position.y + idx * NODE_HEIGHT - 200,
                }
              )
            )
          );
        }
        break;
      }
    }
  };

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeType}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => onNodeClick(node)}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default memo(NodeGraph);
