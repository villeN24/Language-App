import React, { useState } from "react";
import DataBlock from "./DataBlock";

const ButtonComponent = () => {
  let [answer, setAnswer] = useState("");

  return (
    <div>
      <button>Check your answer.</button>
      <DataBlock choice={1} />
      <DataBlock choice={2} />
      <p>{answer}</p>
    </div>
  );
};

export default ButtonComponent;
