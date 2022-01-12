import React from "react";
import TableComponent from "./TableComponent";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function TeacherComponent(props) {
  return (
    <div>
      <Link to="/home">
        <Button
          id="BackButton"
          style={{ minWidth: "200px", minHeight: "80px" }}
          variant="outlined"
        >
          Go back
        </Button>
      </Link>
      <br style={{ lineHeight: "80px" }} />
      <TableComponent category="" admin={true} />
    </div>
  );
}

export default TeacherComponent;
