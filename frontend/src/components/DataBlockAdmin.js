import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

const DataBlockAdmin = (props) => {
  return (
    <div>
      <p>
        {props.id} {props.finnish} {props.english} {props.category}
      </p>
    </div>
  );
};

export default DataBlockAdmin;
