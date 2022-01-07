import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import axios from "axios";

function InsertComponent() {
  const [finnish, setFinnish] = useState(null);
  const [english, setenglish] = useState(null);
  const [category, setCategory] = useState(null);

  const handleChange = (event, from) => {
    event.preventDefault();
    if (from === 1) {
      setFinnish(event.target.value);
    } else if (from === 2) {
      setenglish(event.target.value);
    } else {
      setCategory(event.target.value);
    }
  };
  const printAnswers = async () => {
    let dataPacket = {
      finnish: finnish,
      english: english,
      category: category,
    };
    let res = await axios.post(`http://localhost:8080/colors`, {
      payload: dataPacket,
    });
    console.log(res);
  };

  return (
    <div>
      <Input
        placeholder="Write in finnish"
        onChange={(event) => handleChange(event, 1)}
      />
      <Input
        placeholder="Write in english"
        onChange={(event) => handleChange(event, 2)}
      />
      <Input
        placeholder="Write category"
        onChange={(event) => handleChange(event, 3)}
      />
      <Button variant="outlined" onClick={printAnswers}>
        Insert into table
      </Button>
    </div>
  );
}

export default InsertComponent;
