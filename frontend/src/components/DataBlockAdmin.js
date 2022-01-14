import React, { useState } from "react";
import { Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "./AlertDialog";
import FormDialog from "./FormDialog";
const axios = require("axios").default;

/**
 * An admin component to control table rows.
 *
 * A custom component for every row of the database
 * table. Displays all of the data of the row, and
 * includes admin controls to delete and edit rows.
 */
const DataBlockAdmin = (props) => {
  /** A boolean to control if the list item is shown. */
  const [visible, setVisible] = useState(true);
  /** A boolean to control if the delete alert dialog is shown. */
  const [display, setDisplay] = useState(false);

  /** Sets the direction where list flexes. */
  document.documentElement.style.setProperty("--flex-direction", "row");

  /**
   * Deletes a row from the database table.
   *
   * Deletes a row from the database table, displays
   * the response and hides the now deleted item
   * from view.
   * @async
   */
  const deleteItem = async () => {
    let response = await axios.delete(
      `http://localhost:8080/dictionary/${props.id}`
    );
    console.log(response);
    // Hides the item so that list refresh is not necessary.
    setVisible(false);
  };
  /** Opens the alert dialog of the delete button. */
  const openConfirmation = () => {
    setDisplay(true);
  };
  /** Closes the alert dialog of the delete button. */
  const stopDisplay = () => {
    setDisplay(false);
  };
  /**
   * Helper function to transfer information.
   *
   * A function to let a child of this component
   * to trigger a function in the parent of this component.
   */
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
