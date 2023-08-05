import React, {useEffect, useState} from "react";
import { promisseApi } from "../utils/promisseApi";
import EditIcon from '@mui/icons-material/Edit';
import "../styles/Departments.css";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Modal from "../components/Modal";

function Departaments() {
    const [departments, setDepartments] = useState([])
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)

    const getGrid = () =>{
        let filtro = {};
        if(name.length) filtro.Name = name

        promisseApi(
            'get',
            'departamento',
            (data)=>{
                setDepartments(data)
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
    
    useEffect(()=>{
        getGrid()
    },[])

    return (
        <div className="deparment-container">
            <div className="deparment-filter">
                <input className="department-filter-input" name="Name" type="text" placeholder="Nome do departemento" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <button className="department-filter-button" onClick={()=>getGrid()} ><FilterAltIcon fontSize="12" className="department-filter-button-icon"/>Filtrar!</button>
                <button onClick={()=>setOpen(true)}>Criar Departamento</button>
            </div>
            <div className="department-list">
            {departments.map((department, idx) => {return(
                <div className={idx % 2 == 0 ? "department-list-item-dark" : "department-list-item-light"} key={idx}>
                    <h1 className="deparment-list-item-title">{department.Name}</h1>
                    <div className="department-list-item-icon"><EditIcon/></div>
                </div>
            )})}
            </div>
            <Modal open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Departaments;