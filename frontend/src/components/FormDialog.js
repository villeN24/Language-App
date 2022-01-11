import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const axios = require("axios").default;

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [finnish, setFinnish] = useState(null);
  const [english, setEnglish] = useState(null);
  const [swedish, setSwedish] = useState(null);
  const [category, setCategory] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editRow = async () => {
    let dataPacket = {
      finnish: finnish,
      english: english,
      swedish: swedish,
      category: category,
      id: props.id,
    };
    props.afterInsert();
    console.log(`Inserting ${finnish} ${english} ${swedish} ${category}`);
    let res = await axios.patch(`http://localhost:8080/dictionary`, {
      payload: dataPacket,
    });
    console.log(res);
  };

  const handleConfirm = () => {
    console.log(
      `New values: ${finnish} ${english} ${swedish} ${category} at id: ${props.id}`
    );
    editRow();
    setOpen(false);
  };

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
      <Button variant="outlined" onClick={handleClickOpen}>
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
