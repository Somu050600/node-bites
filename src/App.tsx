// src/App.tsx
import { useState } from "react";
import NodeGraph from "./components/NodeGraph";
import Sidebar from "./components/Sidebar";
import { MealDetails } from "./types/types";
import { MealContext } from "./context/MealContext";
import { ReactFlowProvider } from "@xyflow/react";
import Grid from "./components/Grid";

const App = () => {
  const [mealDetails, setMealDetails] = useState<MealDetails>();
  const [country, setCountry] = useState();

  const handleChange = (e) => {
    console.log("#", e.target.value);
    setCountry(e.target.value);
  };

  return (
    <div className="relative border w-full h-[100vh] flex items-center justify-center">
      <Grid />
      {/* <MealContext.Provider value={{ country, mealDetails, setMealDetails }}>
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
        <div className=" absolute top-14 left-4 z-20">
          <select name="" id="country" onChange={handleChange}>
            <option value="British">British</option>
            <option value="French">French</option>
            <option value="Canadian">Canada</option>
          </select>
        </div>
        <ReactFlowProvider>
          <NodeGraph />
        </ReactFlowProvider>
        {mealDetails && <Sidebar />}
      </MealContext.Provider> */}
    </div>
  );
};

export default App;
