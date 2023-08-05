import React, {useEffect, useState} from "react";
import { promisseApi } from "../utils/promisseApi";
import { useLocation } from 'react-router-dom';
import "../styles/DepartmentDetail.css";

function DepartmentDetail() {
  const [departmentDetail, setDepartmentDetail] = useState({})

  const location = useLocation();

  const handleFormChange = e =>{
   let key = e.target.name
   let value = e.target.value
   setDepartmentDetail({...departmentDetail, [key]: value})
  }

  const handleChangeName = () =>{
    promisseApi(
      'put',
      `departamento/${location.pathname.split('/')[2]}`,
      (data)=>{
        setDepartmentDetail(data)
      },
      (err)=>{
        console.log(err)
      },
      { Name: departmentDetail.Name }
    )
  }

  useEffect(()=>{
    promisseApi(
      'get',
      `departamento/${location.pathname.split('/')[2]}`,
      (data)=>{
        setDepartmentDetail(data)
      },
      (err)=>{
        console.log(err)

      },
    )
  },[])

  return (
  <div>
    <div className="department-detail-header">Departamento: {departmentDetail.Name}</div>
    <input name="Name" value={departmentDetail.Name} placeholder="Nome" onChange={e=>handleFormChange(e)}/>
    <button onClick={()=> handleChangeName()} >Alterar</button>
  </div>
  );
}

export default DepartmentDetail;
