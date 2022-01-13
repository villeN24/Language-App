import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentComponent from "./components/StudentComponent";
import TeacherComponent from "./components/TeacherComponent";
import HomeComponent from "./components/HomeComponent";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./components/Theme";

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/student" element={<StudentComponent />} />
          <Route path="/teacher" element={<TeacherComponent />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
};
export default App;
