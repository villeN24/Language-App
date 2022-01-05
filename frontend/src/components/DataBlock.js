import React, { useEffect, useState } from "react";
const axios = require("axios").default;

const DataBlock = (props) => {
  let [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("http://localhost:8080/words/1");
      let json = Object.values(response.data);
      console.log(json);
      setData(json[props.choice]);
    };
    fetchData();
  }, []);
  return <p>{data}</p>;
};

export default DataBlock;
