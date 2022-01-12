import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const HomeComponent = () => {
  return (
    <div>
      <Link to="/student">
        <div className="TopLinks">
          <Button variant="outlined">Student</Button>
        </div>
      </Link>
      <Link to="/teacher">
        <div className="TopLinks">
          <Button variant="outlined">Teacher</Button>
        </div>
      </Link>
    </div>
  );
};

export default HomeComponent;
