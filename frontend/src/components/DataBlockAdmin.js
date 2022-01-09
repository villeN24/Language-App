import React, { useEffect, useState } from "react";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AlertDialog from "./AlertDialog";

const axios = require("axios").default;

const DataBlockAdmin = (props) => {
  const [visible, setVisible] = useState(true);
  const [display, setDisplay] = useState(false);

  const deleteItem = async () => {
    console.log(props.id);
    let response = await axios.delete(
      `http://localhost:8080/dictionary/${props.id}`
    );
    console.log(response);
    setVisible(false);
  };
  const openConfirmation = () => {
    setDisplay(true);
  };

  const stopDisplay = () => {
    setDisplay(false);
  };

  return (
    <div>
      {visible ? (
        <div>
          <p>
            {props.id} {props.finnish} {props.english} {props.category}
          </p>
          <Button
            variant="outlined"
            color="error"
            onClick={openConfirmation}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <AlertDialog
            confirmDelete={openConfirmation}
            stopDisplay={stopDisplay}
            deleteItem={deleteItem}
            display={display}
            finnish={props.finnish}
            english={props.english}
            category={props.category}
          />
        </div>
      ) : null}
    </div>
  );
};
export default DataBlockAdmin;
