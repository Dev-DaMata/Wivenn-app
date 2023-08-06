import React, {useEffect, useState} from "react";
import { promisseApi } from "../utils/promisseApi";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../styles/EmployeeDetail.css";

function CreateEmployee() {
  const [employeeData, setEmployeeData] = useState({})
  const [departmentsSelectList, setDepartmentsSelectList] = useState([])
  const navigate = useNavigate();

  const location = useLocation();

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const isValidPhone = (phone) => {
    const phonePattern = /^[0-9]{9}$/; // Supondo um formato de número de telefone de 10 dígitos
    return phonePattern.test(phone);
  };

  const handleFormChange = e =>{
   let key = e.target.name
   let value = e.target.value
   setEmployeeData({...employeeData, [key]: value})
  }

  const handleSubmitEmployee = () => {
    if (!employeeData.firstName || !employeeData.lastName) {
      alert("Nome e sobrenome são obrigatórios.");
      return;
    }
  
    if (!isValidEmail(employeeData.email)) {
      alert("Formato de email inválido.");
      return;
    }
  
    if (!isValidPhone(employeeData.phone)) {
      alert ("Formato de número de telefone inválido. Por favor, insira um número de 9 dígitos.");
      return;
    }
  
    promisseApi(
      'post',
      `funcionario`,
      (data) => {
        navigate('/view');
      },
      (err) => {
        console.log(err);
      },
      employeeData
    );
  };


  useEffect(()=>{
    promisseApi(
      'get',
      'departamento',
      (data)=>{
        setDepartmentsSelectList(data)
      },
      (error)=>{
        console.log(error);
      }
    )

  }, [employeeData])

  return (
  <div className="create-employee-container">
    <div className="employee-detail-header">Funcionario: {employeeData.firstName}</div>
    <input name="firstName" value={employeeData.firstName} placeholder="Nome" onChange={e=>handleFormChange(e)}/>
    <input name="lastName" value={employeeData.lastName} placeholder="Sobrenome" onChange={e=>handleFormChange(e)}/>
    <input name="email" value={employeeData.email} placeholder="email" onChange={e=>handleFormChange(e)}/>
    <input name="phone" value={employeeData.phone} placeholder="phone" onChange={e=>handleFormChange(e)}/>
    <select value={employeeData.department_id} name="department_id" onChange={e=>handleFormChange(e)}>
        <option value="">Select an option</option>
        {departmentsSelectList.map(department =>{return(
          <option value={department.id}>{department.Name}</option>
        )})}
      </select>
      
    <button onClick={()=> handleSubmitEmployee()} >Criar</button>
  </div>
  );
}

export default CreateEmployee;
