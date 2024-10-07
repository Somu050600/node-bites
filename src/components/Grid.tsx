import React, { useEffect, useState } from "react";

const INPUT = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

const Grid = () => {
  const [boxes, setBoxes] = useState(INPUT.flat());
  const [selected, setSelected] = useState([]);
  const [startPop, setStartPop] = useState(false);

  const isComplete = () => {
    console.log("#");
    return selected.length === boxes.filter((f) => f === 1).length;
  };

  const handleSelect = (idx) => {
    let arr = [...selected];
    if (selected.includes(idx)) {
      arr = arr.filter((f) => f !== idx);
    } else arr.push(idx);

    setSelected(arr);

    if (arr.length === boxes.filter((f) => f === 1).length) {
      //   setStartPop(true);
      handleRemove(arr);
    }
  };

  const handleRemove = (selected) => {
    const len = boxes.filter((f) => f === 1).length;
    for (let index = 0; index < len; index++) {
      setTimeout(() => {
        const arr = selected.slice(0, len - index);
        arr.pop();
        setSelected(arr);
      }, 500 * (index + 1));
    }
  };

  const isSelected = (idx) => {
    return selected.includes(idx);
  };

  return (
    <div className="box-grid">
      {boxes.map((item, idx) => {
        return item !== 0 ? (
          <button
            key={idx}
            className={`w-[100px] h-[100px] border ${
              isSelected(idx) ? "bg-green-500" : ""
            } `}
            onClick={() => handleSelect(idx)}
          ></button>
        ) : (
          <span></span>
        );
      })}
    </div>
  );
};

export default Grid;
