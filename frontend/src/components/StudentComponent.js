import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import Button from "@mui/material/Button";

function StudentComponent() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState();

  const showList = (selectedLang) => {
    setVisible(true);
    setLang(selectedLang);
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => showList("finnish")}>
        {`Check for english -> finnish words`}
      </Button>
      <Button variant="outlined" onClick={() => showList("english")}>
        {`Check for finnish -> english words`}
      </Button>
      {visible ? (
        <TableComponent language={lang} category="" admin={false} />
      ) : null}
    </div>
  );
}

export default StudentComponent;
