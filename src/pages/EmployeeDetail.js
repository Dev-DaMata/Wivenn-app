import React, {useEffect, useState} from "react";
import { promisseApi } from "../utils/promisseApi";
import { useLocation } from 'react-router-dom';
import "../styles/EmployeeDetail.css";

function EmployeeDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({})
  const [departmentsSelectList, setDepartmentsSelectList] = useState([])

  const location = useLocation();

  const handleFormChange = e =>{
   let key = e.target.name
   let value = e.target.value
   setEmployeeDetail({...employeeDetail, [key]: value})
  }

  const handleChangeName = () =>{
    promisseApi(
      'put',
      `funcionario/${location.pathname.split('/')[2]}`,
      (data)=>{
        setEmployeeDetail(data)
      },
      (err)=>{
        console.log(err)
      },
      employeeDetail
    )
  }

  useEffect(()=>{
    promisseApi(
      'get',
      `funcionario/${location.pathname.split('/')[2]}`,
      (data)=>{
        setEmployeeDetail(data)
      },
      (err)=>{
        console.log(err)

      },
    )

  },[])

  useEffect(()=>{
    promisseApi(
      'get',
      'departamento',
      (data)=>{
        setDepartmentsSelectList(data)
      },
      (error)=>{

      }
    )

  }, [employeeDetail])

  return (
  <div>
    <div className="employee-detail-header">Funcionario: {employeeDetail.firstName}</div>
    <input name="firstName" value={employeeDetail.firstName} placeholder="Nome" onChange={e=>handleFormChange(e)}/>
    <input name="lastName" value={employeeDetail.lastName} placeholder="Sobrenome" onChange={e=>handleFormChange(e)}/>
    <input name="email" value={employeeDetail.email} placeholder="email" onChange={e=>handleFormChange(e)}/>
    <input name="phone" value={employeeDetail.phone} placeholder="phone" onChange={e=>handleFormChange(e)}/>
    <select value={employeeDetail.department_id} name="department_id" onChange={e=>handleFormChange(e)}>
        <option value="">Select an option</option>
        {departmentsSelectList.map(department =>{return(
          <option value={department.id}>{department.Name}</option>
        )})}
      </select>
    <button onClick={()=> handleChangeName()} >Alterar</button>
  </div>
  );
}

export default EmployeeDetail;
