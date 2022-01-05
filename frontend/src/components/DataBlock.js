import React, { useEffect, useState } from "react";
const axios = require("axios").default;

const DataBlock = (props) => {
  let [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        `http://localhost:8080/${props.table}/${props.id}`
      );
      let json = Object.values(response.data);
      if (props.language === "finnish") {
        setData(json[1]);
        props.dataToParent(json[2]);
      } else {
        setData(json[2]);
        props.dataToParent(json[1]);
      }
    };
    fetchData();
  }, []);
  return <p>{data}</p>;
};

export default DataBlock;
