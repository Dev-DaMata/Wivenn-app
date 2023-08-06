// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MultiSector from "./pages/MultiSector"
import DepartmentDetail from "./pages/DepartmentDetail"
import MultiCreate from "./pages/MultiCreate"
import EmployeeDetail from "./pages/EmployeeDetail";
import TasksDetail from "./pages/TasksDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<MultiCreate />} />
        <Route path="/view" element={<MultiSector />} />
        <Route path="/departments/:id" element={<DepartmentDetail/>}/>
        <Route path="/employee/:id" element={<EmployeeDetail/>}/>
        <Route path="/tasks/:id" element={<TasksDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
