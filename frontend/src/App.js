import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudentComponent from "./components/StudentComponent";
import TeacherComponent from "./components/TeacherComponent";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/student">Student</Link>
        <Link to="/teacher">teacher</Link>
        <Routes>
          <Route path="/student" element={<StudentComponent/>} />
          <Route path="/teacher" element={<TeacherComponent/>} />     
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
