import React, { useEffect, useState } from "react";
import DataBlock from "./DataBlock";
import DataBlockAdmin from "./DataBlockAdmin";
import Button from "@mui/material/Button";
import InsertComponent from "./InsertComponent";
const axios = require("axios").default;
var points = 0;

const TableComponent = (props) => {
  const [table, setTable] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [displayPoints, setDisplayPoints] = useState(0);
  const [inserted, setInserted] = useState(true);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        `http://localhost:8080/dictionary/${props.category}`
      );
      let json = Object.values(response.data);
      setTable(json);
    };
    fetchData();
  }, [inserted, props.category]);

  const sendAnswers = () => {
    setTrigger(1);
    setShowScore(true);
  };
  const addPoint = () => {
    points = points + 1;
    setDisplayPoints(points);
  };
  const afterInsert = () => {
    console.log("In afterInsert");
    setInserted(!inserted);
  };
  return (
    <div>
      <ul>
        {table.map((id) => (
          <li key={id.id}>
            {!props.admin ? (
              <div className="UserBlock">
                <DataBlock
                  id={id.id}
                  visibleLang={props.visibleLang}
                  blankLang={props.blankLang}
                  finnish={id.finnish}
                  english={id.english}
                  swedish={id.swedish}
                  addPoint={addPoint}
                  trigger={trigger}
                />
              </div>
            ) : (
              <DataBlockAdmin
                id={id.id}
                finnish={id.finnish}
                english={id.english}
                swedish={id.swedish}
                category={id.category}
                afterInsert={afterInsert}
              />
            )}
          </li>
        ))}
      </ul>
      {!props.admin ? (
        <div id="SubmitButton">
          <Button variant="outlined" onClick={sendAnswers}>
            Submit answers
          </Button>
          <br />
          {showScore ? (
            <div>
              <p>{`You got ${displayPoints} / ${table.length} answers correct.`}</p>
              <Button
                variant="outlined"
                onClick={() => window.location.reload(false)}
              >
                Try again
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <InsertComponent afterInsert={afterInsert} />
        </div>
      )}
    </div>
  );
};

export default TableComponent;
