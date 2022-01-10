import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudentComponent from "./components/StudentComponent";
import TeacherComponent from "./components/TeacherComponent";
import Button from "@mui/material/Button";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/student"><div className="TopLinks"><Button variant="outlined">Student</Button></div></Link>
        <Link to="/teacher"><div className="TopLinks"><Button variant="outlined">Teacher</Button></div></Link>
        <Routes>
          <Route path="/student" element={<StudentComponent/>} />
          <Route path="/teacher" element={<TeacherComponent/>} />     
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
