import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
const axios = require("axios").default;

function StudentComponent(props) {
  const [visible, setVisible] = useState(false);
  const [visibleLang, setVisileLang] = useState("");
  const [blankLang, setBlankLang] = useState("");
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

  const showList = (visibleLang, blankLang) => {
    setVisible(true);
    setVisileLang(visibleLang);
    setBlankLang(blankLang);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <Link to="/">
        <Button
          id="BackButton"
          style={{ minWidth: "200px", minHeight: "80px" }}
          variant="outlined"
        >
          Go back
        </Button>
      </Link>
      {!visible ? (
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
          <br />
          <div className="LanguageButtons">
            <Button
              variant="outlined"
              onClick={() => showList("finnish", "english")}
            >
              {`Write english words for finnish`}
            </Button>
          </div>
          <div className="LanguageButtons">
            <Button
              className="LanguageButtons"
              variant="outlined"
              onClick={() => showList("english", "finnish")}
            >
              {`Write finnish words for english`}
            </Button>
          </div>
          <div className="LanguageButtons">
            <Button
              variant="outlined"
              onClick={() => showList("swedish", "finnish")}
            >
              {`Write finnish words for swedish`}
            </Button>
          </div>
          <br />
          <div className="LanguageButtons">
            <Button
              className="LanguageButtons"
              variant="outlined"
              onClick={() => showList("finnish", "swedish")}
            >
              {`Write swedish words for finnish`}
            </Button>
          </div>
          <div className="LanguageButtons">
            <Button
              variant="outlined"
              onClick={() => showList("english", "swedish")}
            >
              {`Write swedish words for english`}
            </Button>
          </div>
          <div className="LanguageButtons">
            <Button
              className="LanguageButtons"
              variant="outlined"
              onClick={() => showList("swedish", "english")}
            >
              {`Write english words for swedish`}
            </Button>
          </div>
        </div>
      ) : (
        <TableComponent
          visibleLang={visibleLang}
          blankLang={blankLang}
          category={category}
          admin={false}
        />
      )}
    </div>
  );
}

export default StudentComponent;
