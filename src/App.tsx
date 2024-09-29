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
        <div className=" absolute top-0 w-full shadow-md px-4 py-2 bg-white z-10 ">
          Food Explorer
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
