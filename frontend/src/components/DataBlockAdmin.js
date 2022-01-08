import React, { useEffect, useState } from "react";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const axios = require("axios").default;

const DataBlockAdmin = (props) => {
  const deleteItem = async () => {
    console.log(props.id);
    let response = await axios.delete(
      `http://localhost:8080/dictionary/${props.id}`
    );
    console.log(response);
    props.triggerChange();
  };
  return (
    <div>
      <p>
        {props.id} {props.finnish} {props.english} {props.category}
      </p>
      <Button
        variant="outlined"
        color="error"
        onClick={deleteItem}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </div>
  );
};

export default DataBlockAdmin;
