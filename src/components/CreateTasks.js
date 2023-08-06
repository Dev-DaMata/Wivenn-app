import React, {useEffect, useState} from "react";
import { promisseApi } from "../utils/promisseApi";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../styles/TasksDetail.css";

function CreateTasks() {
  const [tasksData, setTasksData] = useState({})
  const [employeeSelectList, setEmployeeSelectList] = useState([])
  const navigate = useNavigate();

  const location = useLocation();

  const handleFormChange = e =>{
   let key = e.target.name
   let value = e.target.value
   setTasksData({...tasksData, [key]: value})
  }

  const handleSubmitTasks = () =>{
    promisseApi(
      'post',
      `tarefa`,
      (data)=>{
        navigate('/view')
      },
      (err)=>{
        console.log(err)
      },
      tasksData
    )
  }


  useEffect(()=>{
    promisseApi(
      'get',
      'funcionario',
      (data)=>{
        setEmployeeSelectList(data)
      },
      (error)=>{
        console.log(error);
      }
    )

  }, [tasksData])

  return (
  <div>
    <div className="tasks-detail-header">Tarefa: {tasksData.title}</div>
    <input name="title" value={tasksData.title} placeholder="Titulo" onChange={e=>handleFormChange(e)}/>
    <input name="description" value={tasksData.description} placeholder="Descrição" onChange={e=>handleFormChange(e)}/>
    <input name="due_date" value={tasksData.due_date} placeholder="Data" onChange={e=>handleFormChange(e)}/>
    <select value={tasksData.assignee_id} name="assignee_id" onChange={e=>handleFormChange(e)}>
        <option value="">Select an option</option>
        {employeeSelectList.map(employee =>{return(
          <option value={employee.id}>{employee.firstName}</option>
        )})}
      </select>
      
    <button onClick={()=> {handleSubmitTasks()}} >Criar</button>
  </div>
  );
}

export default CreateTasks;
