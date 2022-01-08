import React, { useEffect, useState } from "react";
import DataBlock from "./DataBlock";
import DataBlockAdmin from "./DataBlockAdmin";
import Button from "@mui/material/Button";
const axios = require("axios").default;
var points = 0;

const TableComponent = (props) => {
  const [table, setTable] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [displayPoints, setDisplayPoints] = useState(0);
  const [fromChild, setFromChild] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        `http://localhost:8080/dictionary/${props.category}`
      );
      let json = Object.values(response.data);
      setTable(json);
    };
    fetchData();
  }, [fromChild]);

  const sendAnswers = () => {
    setTrigger(1);
  };
  const refreshList = () => {
    setFromChild(1);
  };

  const addPoint = () => {
    points = points + 1;
    setDisplayPoints(points);
  };
  return (
    <div>
      <ul>
        {table.map((id) => (
          <li>
            {!props.admin ? (
              <DataBlock
                id={id.id}
                checkFor="english"
                finnish={id.finnish}
                english={id.english}
                addPoint={addPoint}
                trigger={trigger}
              />
            ) : (
              <DataBlockAdmin
                id={id.id}
                finnish={id.finnish}
                english={id.english}
                category={id.category}
                triggerChange={refreshList}
              />
            )}
          </li>
        ))}
      </ul>
      <Button variant="outlined" onClick={sendAnswers}>
        Submit answers
      </Button>
      <p>{displayPoints}</p>
    </div>
  );
};

export default TableComponent;
