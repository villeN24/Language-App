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
const styleVariant = "contained";

/**
 * A student view component.
 *
 * A custom component that includes the list
 * of all wordpairs. Decides if the child
 * component is in admin mode or not.
 */
function StudentComponent(props) {
  /** A boolean that controls if either list of words, or
   * category and language select is visible. */
  const [visible, setVisible] = useState(false);
  /** Contains the language that is displayed to the player. */
  const [visibleLang, setVisileLang] = useState("");
  /** Contains the language that is not displayed to the player. */
  const [blankLang, setBlankLang] = useState("");
  /** Contains the currently selected category. */
  const [category, setCategory] = useState("");
  /** A list containing all the unique categories. */
  const [categories, setCategories] = useState([]);

  /**
   * Fetches categories from database and puts it to a list.
   *
   * Fetches all unique categories from the database, and
   * puts the returned values to a list.
   * @async
   */
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`/dictionary/unique`);
      let json = Object.values(response.data);
      setCategories(json);
    };
    fetchData();
  }, []);
  /**
   * Displays the list of wordpairs.
   *
   * Sets the list of wordpairs visible to the players, and
   * dynamically decides which language is visible, and which
   * is not.
   *
   * @param {string} visibleLang - The language of the word that
   * is displayed to the player.
   * @param {string} blankLang - The language of the word that
   * is the correct answer.
   */
  const showList = (visibleLang, blankLang) => {
    setVisible(true);
    setVisileLang(visibleLang);
    setBlankLang(blankLang);
  };
  /**
   * Gets the chosen category and sets it to a variable.
   *
   * Gets the selected value from a list of radio buttons, and
   * puts it to a variable to choose category.
   * @param {object} event
   */
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <Link to="/">
        <Button
          id="BackButton"
          style={{ minWidth: "200px", minHeight: "80px" }}
          variant={styleVariant}
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
              variant={styleVariant}
              onClick={() => showList("finnish", "english")}
            >
              {`Write english words for finnish`}
            </Button>
          </div>
          <div className="LanguageButtons">
            <Button
              className="LanguageButtons"
              variant={styleVariant}
              onClick={() => showList("english", "finnish")}
            >
              {`Write finnish words for english`}
            </Button>
          </div>
          <div className="LanguageButtons">
            <Button
              variant={styleVariant}
              onClick={() => showList("swedish", "finnish")}
            >
              {`Write finnish words for swedish`}
            </Button>
          </div>
          <br />
          <div className="LanguageButtons">
            <Button
              className="LanguageButtons"
              variant={styleVariant}
              onClick={() => showList("finnish", "swedish")}
            >
              {`Write swedish words for finnish`}
            </Button>
          </div>
          <div className="LanguageButtons">
            <Button
              variant={styleVariant}
              onClick={() => showList("english", "swedish")}
            >
              {`Write swedish words for english`}
            </Button>
          </div>
          <div className="LanguageButtons">
            <Button
              className="LanguageButtons"
              variant={styleVariant}
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
