import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import axios from "axios";

function InsertComponent(props) {
  const [finnish, setFinnish] = useState("");
  const [english, setEnglish] = useState("");
  const [category, setCategory] = useState("");
  const [swedish, setSwedish] = useState("");

  const handleChange = (event, from) => {
    event.preventDefault();
    if (from === 1) {
      setFinnish(event.target.value);
    } else if (from === 2) {
      setEnglish(event.target.value);
    } else if (from === 3) {
      setSwedish(event.target.value);
    } else {
      setCategory(event.target.value);
    }
  };
  const addRow = async () => {
    let dataPacket = {
      finnish: finnish,
      english: english,
      swedish: swedish,
      category: category,
    };
    setFinnish("");
    setEnglish("");
    setSwedish("");
    setCategory("");
    props.afterInsert();
    console.log(`Inserting ${finnish} ${english} ${swedish} ${category}`);
    let res = await axios.post(`http://localhost:8080/dictionary`, {
      payload: dataPacket,
    });
    console.log(res);
  };

  return (
    <div id="InsertDialog">
      <Input
        placeholder="Write in finnish"
        value={finnish}
        onChange={(event) => handleChange(event, 1)}
      />
      <Input
        placeholder="Write in english"
        value={english}
        onChange={(event) => handleChange(event, 2)}
      />
      <Input
        placeholder="Write in swedish"
        value={swedish}
        onChange={(event) => handleChange(event, 3)}
      />
      <Input
        placeholder="Write category"
        value={category}
        onChange={(event) => handleChange(event, 4)}
      />
      <Button id="InsertButton" variant="contained" onClick={addRow}>
        Insert into table
      </Button>
    </div>
  );
}

export default InsertComponent;
