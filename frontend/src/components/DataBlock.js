import React, { useEffect, useState } from "react";

const DataBlock = (props) => {
  let [answer, setAnswer] = useState("");
  let [correctAnswer, setCorrectAnswer] = useState("");
  let [visual, setVisual] = useState("");

  useEffect(() => {
      if (props.checkFor === "english") {
        setCorrectAnswer(props.english)
      } else {
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
    console.log(input, " ", correctAnswer)
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

  // let [data, setData] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let response = await axios.get(
  //       `http://localhost:8080/${props.table}/${props.id}`
  //     );
  //     let json = Object.values(response.data);
  //     if (props.language === "finnish") {
  //       setData(json[1]);
  //       props.dataToParent(json[2]);
  //     } else {
  //       setData(json[2]);
  //       props.dataToParent(json[1]);
  //     }
  //   };
  //   fetchData();
  // }, []);
