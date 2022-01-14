import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
const axios = require("axios").default;

/**
 * A component that is used to edit existing wordpairs.
 *
 * This component is triggered when edit button is pressed
 * in the parent component. Opens up a form with 4 text
 * fields. When submitted, will send data to backend in
 * order to edit a row in a database table.
 *
 */
export default function FormDialog(props) {
  /** A boolean to control if the form dialog is shown. */
  const [open, setOpen] = useState(false);
  /** A variable to store the finnish translation to be inserted. */
  const [finnish, setFinnish] = useState(null);
  /** A variable to store the english translation to be inserted. */
  const [english, setEnglish] = useState(null);
  /** A variable to store the swedish translation to be inserted. */
  const [swedish, setSwedish] = useState(null);
  /** A variable to store the category of the words to be inserted. */
  const [category, setCategory] = useState(null);

  /** Opens the dialog form of the edit button. */
  const handleClickOpen = () => {
    setOpen(true);
  };
  /** Closes the dialog form of the edit button. */
  const handleClose = () => {
    setOpen(false);
  };
  /** Sends data to backend to edit a row in the database.
   *
   * Creates an object of the data to be sent to backend.
   * Then sends the data, logs response to console and
   * triggeres a table refresh in the parent component.
   * @async
   */
  const editRow = async () => {
    let dataPacket = {
      finnish: finnish,
      english: english,
      swedish: swedish,
      category: category,
      id: props.id,
    };
    // Triggeres table rerefresh in parent component.
    props.afterInsert();
    let res = await axios.patch(`http://localhost:8080/dictionary`, {
      payload: dataPacket,
    });
    console.log(res);
  };
  /** Closes the edit form and triggeres editRow(). */
  const handleConfirm = () => {
    editRow();
    setOpen(false);
  };

  /**
   * Gets data from the form´s text fields and sets it to a variable.
   *
   * Gets the data that is typed in the text fields live, and
   * sets the value to a corresponding variable. Will decide
   * to what variable to set it to by from parameter.
   *
   * @param {object} event - A string value from the form text field.
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

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<EditIcon />}
      >
        Edit item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit an existing row</DialogTitle>
        <DialogContent>
          <DialogContentText>Type the new information</DialogContentText>
          <TextField
            autoFocus
            defaultValue={props.finnish}
            margin="dense"
            label="Finnish translation"
            fullWidth
            variant="standard"
            onChange={(event) => handleChange(event, 1)}
          />
          <TextField
            defaultValue={props.english}
            margin="dense"
            label="English translation"
            fullWidth
            variant="standard"
            onChange={(event) => handleChange(event, 2)}
          />
          <TextField
            defaultValue={props.swedish}
            margin="dense"
            label="Swedish translation"
            fullWidth
            variant="standard"
            onChange={(event) => handleChange(event, 3)}
          />
          <TextField
            defaultValue={props.category}
            margin="dense"
            label="Category"
            fullWidth
            variant="standard"
            onChange={(event) => handleChange(event, 4)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
