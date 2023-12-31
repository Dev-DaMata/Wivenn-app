// App.js
import React, {useState} from "react";
import { promisseApi } from "../utils/promisseApi";
import { useNavigate } from 'react-router-dom';
import "../styles/Departments.css";


function CreateDepartment() {
  const [values, setValues]=useState({})
  const navigate = useNavigate();

  const handleFormChange = e =>{
    const {name, value} = e.target
    setValues({...values, [name]:value})
  }

  const handleSubmitDepartment=()=>{
    promisseApi(
        "post",
        "departamento",
        (data) =>{
          navigate('/view')
        },
        (erro) =>{

        },
        values,
    )
  }

  return (
   <div className="create-department-container">
      <div className="create-department-header">
      Departemanto:
      </div>
    <div>
      <input placeholder="Nome do departamento" value={values.Name} name="Name" onChange={(e)=>handleFormChange(e)}/>
      <button onClick={()=>{ handleSubmitDepartment() }} >Criar!</button>
    </div>
  </div>

  );
}

export default CreateDepartment;
