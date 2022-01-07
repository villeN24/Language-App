import React, { useEffect, useState } from "react";
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';

const DataBlock = (props) => {
  let [answer, setAnswer] = useState("");
  let [correctAnswer, setCorrectAnswer] = useState("");
  let [visual, setVisual] = useState("");
  const [block, setBlockColor] = useState(null)

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
      setBlockColor("#24BF00")
      props.addPoint()
    } else {
      setAnswer("Wrong"); 
      setBlockColor("#EE1212")
    }
  };
  return (
    <div>
      <Input placeholder="Write your answer" onChange={(event) => handleChange(event)} />
      <p>{props.finnish}</p>
      <p>{answer}</p>
      <Box style={{"display": "inline-block"}}
      sx={{
        width: 20,
        height: 20,
        backgroundColor: `${block}`
      }}
    />
    </div>
  )
};

export default DataBlock;
