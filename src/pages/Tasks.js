import React, {useEffect, useState} from "react";
import { promisseApi } from "../utils/promisseApi";
import EditIcon from '@mui/icons-material/Edit';
import "../styles/Tasks.css";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function Tasks() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const navigate = useNavigate();

    const getGrid = () =>{
        let filtro = {};
        if(title.length) filtro.title = title

        promisseApi(
            'get',
            'tarefa',
            (data)=>{
                setTasks(data)
                console.log(data)
            },
            (err)=>{
                //tratar erro
            },
            {},
            {
                params: filtro
            }//configs diversas
        )
    }

    const handleDelete=(id)=>{
        promisseApi(
            'delete',
            `tarefa/${id}`,
            (data)=>{
                console.log(data)
                getGrid()
            }
            )
    }
    
    useEffect(()=>{
        getGrid()
    },[])

    return (
        <div className="task-container">
            <div className="task-filter">
                <input className="task-filter-input" name="title" type="text" placeholder="tarefra" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                <button className="task-filter-button" onClick={()=>getGrid()} ><FilterAltIcon fontSize="12" className="task-filter-button-icon"/>Filtrar!</button>
            </div>
            <div className="task-list">
            {tasks.map((tasks, idx) => {return(
                <div className={idx % 2 == 0 ? "task-list-item-dark" : "task-list-item-light"} key={idx}>
                    <h1 className="task-list-item-title">{tasks.title}</h1>
                    <div className="task-list-item-icon-container" >
                        <div className="task-list-item-icon" onClick={()=>{handleDelete(tasks.id)}}><DeleteIcon/></div>
                        <div className="task-list-item-icon" onClick={()=>{navigate(`/tasks/${tasks .id}`)}}><EditIcon/></div>
                    </div>
                </div>
            )})}
            </div>
        </div>
    )
}

export default Tasks;