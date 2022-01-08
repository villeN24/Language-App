import React, { useState, useEffect } from "react";
const axios = require("axios").default;

function DeleteComponent() {
  let [table, setTable] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`http://localhost:8080/dictionary/`);
      let json = Object.values(response.data);
      setTable(json);
    };
    fetchData();
  }, []);
  return <div></div>;
}

export default DeleteComponent;
