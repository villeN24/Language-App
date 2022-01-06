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
      if (props.trigger === 1 ) {
        checkAnswer(visual)
      }
  }, [props.trigger])

  const handleChange = (event) => {
    event.preventDefault();
    setVisual(event.target.value);
    
  };

  const checkAnswer = (input) => {
    console.log(`${props.id} ${input} ${correctAnswer}`)
    if (input === correctAnswer) {
      setAnswer("Correct");
      props.addPoint()
    } else {
      setAnswer("Wrong");
    }
  };
  return (
    <div>
       <form

      >
        <input
          type="text"
          placeholder="Write your answer"
          value={visual}
          onChange={(event) => handleChange(event)}
        />
      </form>
      <p>{props.finnish}</p>
      <p>{answer}</p>
    </div>
  )
};

export default DataBlock;
