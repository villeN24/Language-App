import React, { useState } from "react";
import { Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "./AlertDialog";
import FormDialog from "./FormDialog";

const axios = require("axios").default;

const DataBlockAdmin = (props) => {
  const [visible, setVisible] = useState(true);
  const [display, setDisplay] = useState(false);
  document.documentElement.style.setProperty("--flex-direction", "row");

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
  const middleMan = () => {
    props.afterInsert();
  };

  return (
    <div>
      {visible ? (
        <div className="AdminBlock">
          <p className="bubble">FIN = {props.finnish}</p>
          <Divider />
          <p className="bubble">ENG = {props.english}</p>
          <Divider />
          <p className="bubble">SWE = {props.swedish}</p>
          <Divider />
          <p className="bubble">CAT = {props.category}</p>
          <Button
            id="DeleteButton"
            variant="outlined"
            color="error"
            onClick={openConfirmation}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <AlertDialog
            id="EditButton"
            confirmDelete={openConfirmation}
            stopDisplay={stopDisplay}
            deleteItem={deleteItem}
            display={display}
            finnish={props.finnish}
            english={props.english}
            swedish={props.swedish}
            category={props.category}
          />
          <FormDialog
            id={props.id}
            afterInsert={middleMan}
            finnish={props.finnish}
            english={props.english}
            swedish={props.swedish}
            category={props.category}
          />
        </div>
      ) : null}
    </div>
  );
};
export default DataBlockAdmin;
