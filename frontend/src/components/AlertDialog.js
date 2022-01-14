import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/**
 * A component to confirm deletion of a row.
 *
 * Opens an alert to user´s screen, with options
 * to confirm, or cancel deletion.
 */
export default function AlertDialog(props) {
  /** A boolean to control if the alert is visible. */
  const [open, setOpen] = useState(props.display);

  /**
   * Opens the component at the start.
   */
  useEffect(() => {
    setOpen(props.display);
  }, [props.display]);
  /**
   * Closes the alert and does nothing.
   *
   * Hides the alert when cancel is pressed
   * on the alert popup.
   */
  const handleCancel = () => {
    setOpen(false);
    props.stopDisplay();
  };
  /**
   * Closes the alert and confirms deletion.
   *
   * Hides the alert when confirm is pressed, and
   * calls a parent method to delete the row from
   * the list.
   */
  const handleConfirm = () => {
    setOpen(false);
    props.deleteItem();
    props.stopDisplay();
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`You are deleting row
            ${props.finnish} | ${props.english} | ${props.swedish} | ${props.category}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} autoFocus>
            Cancel
          </Button>
          <Button color="error" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
