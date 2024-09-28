import React, { memo, useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
  Node,
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

const initialNodes: Node[] = [
  {
    id: NODE_TYPES.START_NODE,
    data: { label: "Explore" },
    position: { x: 100, y: 300 },
    ...HANDLE_POSITIONS,
  },
];

const NodeGraph: React.FC = () => {
  const { categories, meals, getMealsByCategory, getMealDetails } =
    useMealData();
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
      setEdges((eds) =>
        addEdge({ ...connection, markerEnd: MarkerType.Arrow }, eds)
      ),
    []
  );

  const getNewNode = useCallback(
    (id: string, data: any, position: any): Node => ({
      id,
      data,
      position,
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

  const getLoadingNodes = useCallback(
    (node: Node) => {
      // placehoders for loading
      for (let i = 0; i < 5; i++) {
        addNewNode(
          node,
          getNewNode(
            `${NODE_TYPES.LOADING_NODE}_${i}`,
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
    [addNewNode, getNewNode]
  );

  // to remove entire sub-tree nodes
  const removeSubtree = useCallback((nodeType: string) => {
    const types = Object.values(NODE_TYPES);
    const isSubtreeNode = (id: string) =>
      types.slice(types.indexOf(nodeType)).some((type) => id.includes(type));

    setNodes((nds) => nds.filter((node) => !isSubtreeNode(node.id)));
    setEdges((eds) => eds.filter((edge) => !isSubtreeNode(edge.id)));
  }, []);

  const handleOptionClick = useCallback(
    (node: Node) => {
      const { data, id } = node;
      const [_, index] = id.split("_");
      if (data?.label === MEAL_OPTIONS.VIEW_INGREDIENTS) {
        return false;
      } else if (data?.label === MEAL_OPTIONS.VIEW_TAGS) {
        return;
      } else if (data?.label === MEAL_OPTIONS.VIEW_DETAILS) {
        getMealDetails(meals[+index].idMeal);
        return;
      }
    },
    [getMealDetails, meals]
  );

  const onNodeClick = async (node: Node) => {
    const [nodeType, index] = node.id.split("_");

    switch (nodeType) {
      case NODE_TYPES.START_NODE: {
        categories.forEach((category, i) =>
          addNewNode(
            node,
            getNewNode(
              `${NODE_TYPES.CATEGORY_NODE}_${i}`,
              { label: category.strCategory },
              { x: node.position.x + NODE_WIDTH, y: (i + 1) * NODE_HEIGHT }
            )
          )
        );
        break;
      }
      case NODE_TYPES.CATEGORY_NODE: {
        removeSubtree(NODE_TYPES.OPTIONS_NODE_1);

        addNewNode(
          node,
          getNewNode(
            `${NODE_TYPES.OPTIONS_NODE_1}_${index}`,
            { label: "View Meals" },
            { x: node.position.x + NODE_WIDTH, y: node.position.y }
          )
        );
        break;
      }
      case NODE_TYPES.OPTIONS_NODE_1: {
        getLoadingNodes(node);

        const categoryName = categories[+index]?.strCategory;
        if (categoryName) {
          const meals = await getMealsByCategory(categoryName);
          removeSubtree(NODE_TYPES.MEAL_NODE); // to remove loading nodes

          meals?.forEach((meal, idx) =>
            addNewNode(
              node,
              getNewNode(
                `${NODE_TYPES.MEAL_NODE}_${idx}`,
                { label: meal.strMeal },
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
        removeSubtree(NODE_TYPES.OPTIONS_NODE_2);
        Object.values(MEAL_OPTIONS)?.forEach((opt, idx) =>
          addNewNode(
            node,
            getNewNode(
              `${NODE_TYPES.OPTIONS_NODE_2}_${index}_${idx}`,
              { label: opt },
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
    }
  };

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
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
