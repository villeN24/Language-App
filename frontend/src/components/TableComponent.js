import React, { useEffect, useState } from "react";
import DataBlock from "./DataBlock";
const axios = require("axios").default;

const TableComponent = () => {
let [table, setTable] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        `http://localhost:8080/pets/`
      );
      let json = Object.values(response.data);
      setTable(json)
    }
    console.log("in hook")
    fetchData()
  }, [])

  return (
    <div>
        <ul>
          {table.map((ID) => (
              <li><DataBlock ID={ID.ID} checkFor="english" finnish={ID.suomeksi} english={ID.englanniksi}/></li>
          ))}
        </ul>
    </div>)
}

export default TableComponent