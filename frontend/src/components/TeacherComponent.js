import React from "react";
import TableComponent from "./TableComponent";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
const styleVariant = "contained";

/**
 * A teacher view component.
 *
 * A teacher view component, that decides
 * if the child component is in admin mode
 * or not.
 *
 * @returns - A tablelist component in admin mode.
 */
function TeacherComponent(props) {
  return (
    <div>
      <Link to="/">
        <Button
          id="BackButton"
          style={{ minWidth: "200px", minHeight: "80px" }}
          variant="outlined"
          variant={styleVariant}
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
