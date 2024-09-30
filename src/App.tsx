// src/App.tsx
import { useState } from "react";
import NodeGraph from "./components/NodeGraph";
import Sidebar from "./components/Sidebar";
import { MealDetails } from "./types/types";
import { MealContext } from "./context/MealContext";
import { ReactFlowProvider } from "@xyflow/react";

const App = () => {
  const [mealDetails, setMealDetails] = useState<MealDetails>();

  return (
    <div className=" relative">
      <MealContext.Provider value={{ mealDetails, setMealDetails }}>
        <div className=" flex flex-row items-center justify-between absolute top-0 w-full shadow-md px-4 py-2 bg-white z-10 ">
          <span className=" text-xl font-medium">Food Explorer</span>
          <a
            href="https://github.com/somu050600/node-bites"
            target="_blank"
            rel="noopener noreferrer"
            className=" sm:bg-slate-200 rounded-lg p-1 sm:px-3 sm:py-1 "
          >
            <i className="fa-brands fa-square-github fa-xl sm:fa-lg mr-1" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
        <ReactFlowProvider>
          <NodeGraph />
        </ReactFlowProvider>
        {mealDetails && <Sidebar />}
      </MealContext.Provider>
    </div>
  );
};

export default App;
