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
        <Link to="/student"><Button variant="outlined">Student</Button></Link>
        <Link to="/teacher"><Button variant="outlined">Teacher</Button></Link>
        <Routes>
          <Route path="/student" element={<StudentComponent/>} />
          <Route path="/teacher" element={<TeacherComponent/>} />     
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
