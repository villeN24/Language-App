import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import axios from "axios";

/**
 * A custom component to add new rows to database table.
 *
 * A small component that has 4 text input fields, and a
 * button. Upon pressing the button will try to insert given
 * information to make a new row in database.
 */
function InsertComponent(props) {
  /** A variable to store the finnish translation to be inserted. */
  const [finnish, setFinnish] = useState("");
  /** A variable to store the english translation to be inserted. */
  const [english, setEnglish] = useState("");
  /** A variable to store the swedish translation to be inserted. */
  const [category, setCategory] = useState("");
  /** A variable to store the category of the words to be inserted. */
  const [swedish, setSwedish] = useState("");

  /**
   * Gets data from text fields and sets it to a variable.
   *
   * Gets the data that is typed in the text fields live, and
   * sets the value to a corresponding variable. Will decide
   * to what variable to set it to by from parameter.
   *
   * @param {object} event - A string value from the text field.
   * @param {number} from - A integer to decide from which text
   * field event is from.
   */
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
  /**
   * Sends data to backend to add a new a row in the database.
   *
   * Creates an object of the data to be sent to backend.
   * Then sends the data, logs response to console and
   * triggeres a table refresh in the parent component.
   * @async
   */
  const addRow = async () => {
    let dataPacket = {
      finnish: finnish,
      english: english,
      swedish: swedish,
      category: category,
    };
    // Resets the variables.
    setFinnish("");
    setEnglish("");
    setSwedish("");
    setCategory("");
    // Triggeres table rerefresh in parent component.
    props.afterInsert();
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
