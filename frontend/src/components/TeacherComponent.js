import React from "react";
import TableComponent from "./TableComponent";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function TeacherComponent() {
  return (
    <div>
      <Link to="/">
        <Button id="BackButton" variant="outlined">
          Go back
        </Button>
      </Link>
      <TableComponent category="" admin={true} />
    </div>
  );
}

export default TeacherComponent;
