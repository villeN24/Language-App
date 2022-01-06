import React, { useEffect, useState } from "react";
import DataBlock from "./DataBlock";
const axios = require("axios").default;

const TableComponent = (props) => {
let [table, setTable] = useState([])
let [points, setPoints] = useState(0)
let [trigger, setTrigger] = useState(0)

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
      console.log(event)
      setTrigger(1)
  }

  const addPoint = () => {
      setPoints(points + 1)
  }
  return (
    <div>
        <ul>
          {table.map((id) => (
              <li>
                  <DataBlock 
                    ID={id.id}
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
    </div>)
}

export default TableComponent