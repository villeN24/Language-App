import React, { useEffect, useState } from "react";
import DataBlock from "./DataBlock";
import DataBlockAdmin from "./DataBlockAdmin";
import Button from "@mui/material/Button";
import InsertComponent from "./InsertComponent";
const axios = require("axios").default;

/** Variable to store the point score of the user. */
var points = 0;

/**
 * A custom tablecomponent, to map rows dynamically.
 *
 * A component that fetched a database table, and
 * renders every row of the fetched table. Will either
 * render admin or user version of the row component.
 */
const TableComponent = (props) => {
  /** Contains the fetched database table. */
  const [table, setTable] = useState([]);
  /** Helper variable to trigger answer check in child components. */
  const [trigger, setTrigger] = useState(0);
  /** Stores the score of the player. */
  const [displayPoints, setDisplayPoints] = useState(0);
  /** Upon changing, refreshes the useEffect. */
  const [inserted, setInserted] = useState(true);
  /** Boolean to control if user's score is shown. */
  const [showScore, setShowScore] = useState(false);

  /**
   * Fetches the data from database and
   * puts it in a list.
   *
   * Fetches the data from a database from a certain
   * category, and will put it in a variable in a
   * randomized order. Will update the variable if
   * variables inserted or props.category is changed.
   * If given category is null, will fetch everything.
   * @async
   */
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`/dictionary/${props.category}`);
      let json = Object.values(response.data);
      if (!props.admin) {
        json.sort(() => Math.random() - 0.5);
      }
      setTable(json);
    };
    fetchData();
  }, [inserted, props.category]);

  /**
   * Triggers the check function inside the
   * child components.
   *
   * Will change variable trigger from 0 to 1. That
   * will trigger useEffect in child compoenent that
   * checks the answer. Will also display the score
   * of the user.
   */
  const sendAnswers = () => {
    setTrigger(1);
    setShowScore(true);
  };
  /**
   * Will add 1 point to the user's score if triggered.
   */
  const addPoint = () => {
    points = points + 1;
    setDisplayPoints(points);
  };
  /** Triggers refreshing of the table.
   *
   * Changes a variable in the useEffect method to
   * trigger refresh. Is given as a prop to a child
   * method, and triggered from there.
   */
  const afterInsert = () => {
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
          <Button variant="contained" onClick={sendAnswers}>
            Submit answers
          </Button>
          <br />
          {showScore ? (
            <div>
              <p>{`You got ${displayPoints} / ${table.length} answers correct.`}</p>
              <Button
                variant="contained"
                onClick={() => window.location.reload(true)}
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
