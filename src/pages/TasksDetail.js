import React, {useEffect, useState} from "react";
import { promisseApi } from "../utils/promisseApi";
import { useLocation } from 'react-router-dom';
import "../styles/TasksDetail.css";

function TasksDetail() {
  const [tasksDetail, setTasksDetail] = useState({})
  const [employeeSelectList, setEmployeeSelectList] = useState([])

  const location = useLocation();

  const handleFormChange = e =>{
   let key = e.target.name
   let value = e.target.value
   setTasksDetail({...tasksDetail, [key]: value})
  }

  const handleChangeName = () =>{
    promisseApi(
      'put',
      `tarefa/${location.pathname.split('/')[2]}`,
      (data)=>{
        setTasksDetail(data)
      },
      (err)=>{
        console.log(err)
      },
      tasksDetail
    )
  }

  useEffect(()=>{
    promisseApi(
      'get',
      `tarefa/${location.pathname.split('/')[2]}`,
      (data)=>{
        setTasksDetail(data)
      },
      (err)=>{
        console.log(err)

      },
    )

  },[])

  useEffect(()=>{
    promisseApi(
      'get',
      'funcionario',
      (data)=>{
        setEmployeeSelectList(data)
      },
      (error)=>{

      }
    )

  }, [tasksDetail])

  return (
  <div>
    <div className="task-detail-header">Tarefa: {tasksDetail.title}</div>
    <input name="title" value={tasksDetail.title} placeholder="Titulo" onChange={e=>handleFormChange(e)}/>
    <input name="description" value={tasksDetail.description} placeholder="Descrição" onChange={e=>handleFormChange(e)}/>
    <input name="due_date" value={tasksDetail.due_date} placeholder="Data" onChange={e=>handleFormChange(e)}/>
    <select value={tasksDetail.assignee_id} name="assignee_id" onChange={e=>handleFormChange(e)}>
        <option value="">Select an option</option>
        {employeeSelectList.map(employee =>{return(
          <option value={employee.id}>{employee.firstName}</option>
        )})}
      </select>
    <button onClick={()=> handleChangeName()} >Alterar</button>
  </div>
  );
}

export default TasksDetail;
