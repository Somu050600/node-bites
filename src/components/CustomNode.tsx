import React, { memo } from "react";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { getNodeType } from "../utils/nodeUtils";
import { ICONS, NODE_TYPES } from "../constants/constants";

export type CustomNodeProps = Node<
  {
    label: string;
    data?: any;
  },
  "custom-node"
>;

const CustomNode: React.FC<NodeProps<CustomNodeProps>> = (props) => {
  const nodeType = getNodeType(props);
  const Icon = nodeType ? ICONS[nodeType] : null;
  const isOption = [
    NODE_TYPES.OPTIONS_NODE_1,
    NODE_TYPES.OPTIONS_NODE_2,
  ]?.includes(nodeType ?? "");

  return (
    <div
      className={`px-4 py-2 w-40  shadow-md ${
        isOption ? "rounded-3xl" : "rounded-md"
      }  bg-white border-2 border-stone-400`}
    >
      <div className="flex items-center justify-start gap-1">
        {Icon && (
          <div>
            <Icon width={20} height={20} className="rounded" />
          </div>
        )}
        <div className="m-0">
          <div className=" text-xs overflow-hidden text-ellipsis line-clamp-3">
            {props?.data?.label}
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={props?.isConnectable}
        className="h-0 w-0 opacity-0"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={props?.isConnectable}
        className="h-0 w-0 opacity-0"
      />
    </div>
  );
};

export default memo(CustomNode);
