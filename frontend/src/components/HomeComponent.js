//@ts-check
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
const buttonStyle = {
  minWidth: "350px",
  minHeight: "100px",
};

/**
 * The homepage of the project.
 *
 * Contains 2 buttons, to direct the user to either
 * teacher or student view of the application.
 */
const HomeComponent = () => {
  return (
    <div className="flexContainer">
      <Link to="/student">
        <div className="TopLinks">
          <Button style={buttonStyle} variant="contained">
            Student
          </Button>
        </div>
      </Link>
      <Link to="/teacher">
        <div className="TopLinks">
          <Button style={buttonStyle} variant="contained">
            Teacher
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default HomeComponent;
