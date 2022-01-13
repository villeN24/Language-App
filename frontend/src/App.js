import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentComponent from "./components/StudentComponent";
import TeacherComponent from "./components/TeacherComponent";
import HomeComponent from "./components/HomeComponent";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/student" element={<StudentComponent />} />
        <Route path="/teacher" element={<TeacherComponent />} />
      </Routes>
    </div>
  );
};
export default App;
