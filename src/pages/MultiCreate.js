// App.js
import React from "react";
import CreateDepartment from "../components/CreateDepartment";
import CreateEmployee from "../components/CreateEmployee";
import CreateTasks from "../components/CreateTasks"


function MultiCreate() {
  return (
    <div>
      <CreateDepartment/>
      <CreateEmployee/>
      <CreateTasks/>
    </div>

  );
}

export default MultiCreate;
