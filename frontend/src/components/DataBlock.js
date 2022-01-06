import React, { useEffect, useState } from "react";

const DataBlock = (props) => {
  let [answer, setAnswer] = useState("");
  let [correctAnswer, setCorrectAnswer] = useState("");
  let [visual, setVisual] = useState("");

  useEffect(() => {
      if (props.checkFor === "english") {
        setCorrectAnswer(props.english)
      }
      if (props.checkFor === "finnish") {
        setCorrectAnswer(props.finnish)
      }
  }, [])

  const handleChange = (event) => {
    setVisual(event.target.value);
    
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    checkAnswer(visual)
  }
  const checkAnswer = (input) => {
    if (input === correctAnswer) {
      setAnswer("Correct");
    } else {
      setAnswer("Wrong");
    }
  };
  return (
    <div>
       <form
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          type="text"
          placeholder="Write your answer"
          value={visual}
          onChange={(event) => handleChange(event)}
        />
        <input type="submit" value="Submit" />
      </form>
      <p>{props.finnish}</p>
      <p>{answer}</p>
    </div>
  )
};

export default DataBlock;
