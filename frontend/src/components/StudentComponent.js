import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import Button from "@mui/material/Button";
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';

function StudentComponent() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState("");
  const [category, setCategory] = useState("")

  const showList = (selectedLang) => {
    setVisible(true);
    setLang(selectedLang);
  };

  const handleChange = (event) => {
    setCategory(event.target.value)
    console.log(`Category is set as ${category}`)
  }

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select category</FormLabel>
          <RadioGroup
            aria-label="Select category"
            defaultValue="All"
            name="radio-buttons-group"
          >
              <FormControlLabel value="" control={<Radio onChange={handleChange}/>} label="All" />
              <FormControlLabel value="Pets" control={<Radio onChange={handleChange}/>} label="Pets" />
              <FormControlLabel value="Colors" control={<Radio onChange={handleChange}/>} label="Colors" />
        </RadioGroup>
      </FormControl>
      <Button variant="outlined" onClick={() => showList("finnish")}>
        {`Write english words for finnish`}
      </Button>
      <Button variant="outlined" onClick={() => showList("english")}>
        {`Write finnish words for english`}
      </Button>
      {visible ? (
        <TableComponent language={lang} category={category} admin={false} />
      ) : null}
    </div>
  );
}

export default StudentComponent;
