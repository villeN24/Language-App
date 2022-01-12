import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudentComponent from "./components/StudentComponent";
import TeacherComponent from "./components/TeacherComponent";
import Button from "@mui/material/Button";

const App = () => {
  const [disp, setDisp] = useState(true);

  const setVis = () => {
    setDisp(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {disp ? (
          <div>
            <Link to="/student">
              <div className="TopLinks">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setDisp(false)}
                >
                  Student
                </Button>
              </div>
            </Link>
            <Link to="/teacher">
              <div className="TopLinks">
                <Button variant="outlined" onClick={() => setDisp(false)}>
                  Teacher
                </Button>
              </div>
            </Link>
          </div>
        ) : null}
        <Routes>
          <Route
            path="/student"
            element={<StudentComponent setVis={setVis} />}
          />
          <Route
            path="/teacher"
            element={<TeacherComponent setVis={setVis} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
