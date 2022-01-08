import React from "react";
import DeleteComponent from "./DeleteComponent";
import InsertComponent from "./InsertComponent";
import TableComponent from "./TableComponent";

function TeacherComponent() {
  return (
    <div>
      <InsertComponent />
      <DeleteComponent />
      <TableComponent category="" admin={true} />
    </div>
  );
}

export default TeacherComponent;
