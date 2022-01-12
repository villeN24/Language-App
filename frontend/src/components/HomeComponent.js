import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
const buttonStyle = {
  minWidth: "350px",
  minHeight: "100px",
};

const HomeComponent = () => {
  return (
    <div className="flexContainer">
      <Link to="/student">
        <div className="TopLinks">
          <Button style={buttonStyle} variant="outlined">
            Student
          </Button>
        </div>
      </Link>
      <Link to="/teacher">
        <div className="TopLinks">
          <Button style={buttonStyle} variant="outlined">
            Teacher
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default HomeComponent;
