import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/Theme";
import StudentComponent from "./components/StudentComponent";
import TeacherComponent from "./components/TeacherComponent";
import HomeComponent from "./components/HomeComponent";

/**
 * The main component of the project.
 *
 * Includes routes in order to simulate MPA application
 * and to divide the app in different pages. Everything
 * is wrapped inside a <ThemeProvider> a component, to
 * allow every component inside the project to use a
 * custom material.ui theme.
 */
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/student" element={<StudentComponent />} />
          <Route path="/teacher" element={<TeacherComponent />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
