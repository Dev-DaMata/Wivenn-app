// App.js
import React from "react";
import CreateDepartment from "../components/CreateDepartment";
import CreateEmployee from "../components/CreateEmployee";


function MultiCreate() {
  return (
    <div>
      <CreateDepartment/>
      <CreateEmployee/>
    </div>

  );
}

export default MultiCreate;
