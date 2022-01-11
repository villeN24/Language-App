import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
const axios = require("axios").default;

function StudentComponent() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`http://localhost:8080/dictionary/unique`);
      let json = Object.values(response.data);
      setCategories(json);
    };
    fetchData();
  }, []);

  const showList = (selectedLang) => {
    setVisible(true);
    setLang(selectedLang);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select category</FormLabel>
        <RadioGroup
          aria-label="Select category"
          defaultValue="All"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value=""
            control={<Radio onChange={handleChange} />}
            label="All"
          />
          {categories.map((id) => (
            <FormControlLabel
              value={id.category}
              control={<Radio onChange={handleChange} />}
              label={id.category}
            />
          ))}
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
