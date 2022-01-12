import React from "react";
import TableComponent from "./TableComponent";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function TeacherComponent(props) {
  return (
    <div>
      <Link to="/home">
        <Button id="BackButton" variant="outlined" onClick={props.setVis}>
          Go back
        </Button>
      </Link>
      <TableComponent category="" admin={true} />
    </div>
  );
}

export default TeacherComponent;
