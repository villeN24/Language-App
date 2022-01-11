import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

const DataBlock = (props) => {
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [visual, setVisual] = useState("");
  const [block, setBlockColor] = useState(null);
  const [dispLang, setDispLang] = useState(null);
  document.documentElement.style.setProperty("--flex-direction", "column");

  useEffect(() => {
    if (props.visibleLang === "english") {
      console.log("Checking for english");
      setDispLang(props.english);
    }
    if (props.visibleLang === "finnish") {
      console.log("Checking for finnish");
      setDispLang(props.finnish);
    }
    if (props.visibleLang === "swedish") {
      console.log("Checking for swedish");
      setDispLang(props.swedish);
    }
    if (props.blankLang === "finnish") {
      setCorrectAnswer(props.finnish);
    }
    if (props.blankLang === "english") {
      setCorrectAnswer(props.english);
    }
    if (props.blankLang === "swedish") {
      setCorrectAnswer(props.swedish);
    }
    if (props.trigger === 1) {
      checkAnswer(visual);
    }
  }, [props.trigger, props.checkFor]);

  const handleChange = (event) => {
    event.preventDefault();
    setVisual(event.target.value);
  };

  const checkAnswer = (input) => {
    console.log(`${props.id} ${input} ${correctAnswer}`);
    if (input === correctAnswer) {
      setAnswer("Correct");
      setBlockColor("#24BF00");
      props.addPoint();
    } else {
      setAnswer("Wrong");
      setBlockColor("#EE1212");
    }
  };
  return (
    <div>
      <Input
        placeholder="Write your answer"
        onChange={(event) => handleChange(event)}
      />
      <p>{dispLang}</p>
      <p>{answer}</p>
      <Box
        style={{ display: "inline-block" }}
        sx={{
          width: 20,
          height: 20,
          backgroundColor: `${block}`,
        }}
      />
    </div>
  );
};

export default DataBlock;
