import React, { useEffect, useState } from "react";
import DataBlock from "./DataBlock";
const axios = require("axios").default;
var points = 0

const TableComponent = (props) => {
let [table, setTable] = useState([])
let [trigger, setTrigger] = useState(0)
let [displayPoints, setDisplayPoints] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        `http://localhost:8080/${props.category}`
      );
      let json = Object.values(response.data);
      setTable(json)
    }
    console.log("in hook")
    fetchData()
  }, [])

  const sendAnswers = (event) => {
      setTrigger(1)
  }

  const addPoint = () => {
      points = points + 1
      setDisplayPoints(points)
  }
  return (
    <div>
        <ul>
          {table.map((id) => (
              <li>
                  <DataBlock 
                    id={id.id}
                    checkFor="english"
                    finnish={id.finnish}
                    english={id.english}
                    addPoint={addPoint}
                    trigger={trigger}
                    />
                </li>
          ))}
        </ul>
        <button onClick={sendAnswers}>Submit answers</button>
        <p>{displayPoints}</p>
    </div>)
}

export default TableComponent