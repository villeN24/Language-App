import React, { useState } from "react";
import DataBlock from "./DataBlock";

const ButtonComponent = () => {
  let [answer, setAnswer] = useState("");
  let [correctAnswer, setCorrectAnswer] = useState("");
  let [result, setResult] = useState("");

  const handleChange = (event) => {
    let tmp = event.target.value;
    setAnswer(tmp);
  };
  const dataToParent = (childData) => {
    setCorrectAnswer(childData);
  };
  const checkAnswer = () => {
    if (answer === correctAnswer) {
      setResult("Correct");
    } else {
      setResult("Wrong");
    }
  };

  return (
    <div>
      <form className="inputComponent">
        <input
          type="text"
          placeholder="Type your answer"
          onChange={(event) => handleChange(event)}
        />
      </form>
      <button onClick={checkAnswer}>Check your answer.</button>
      <DataBlock
        dataToParent={dataToParent}
        table="colors"
        id={1}
        language="finnish"
      />
      <p>{result}</p>
    </div>
  );
};

export default ButtonComponent;
