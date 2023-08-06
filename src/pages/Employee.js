import React, {useEffect, useState} from "react";
import { promisseApi } from "../utils/promisseApi";
import EditIcon from '@mui/icons-material/Edit';
import "../styles/Employee.css";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function Employee() {
    const [employee, setEmployee] = useState([])
    const [firstName, setFirstName] = useState('')
    const navigate = useNavigate();

    const getGrid = () =>{
        let filtro = {};
        if(firstName.length) filtro.firstName = firstName

        promisseApi(
            'get',
            'funcionario',
            (data)=>{
                setEmployee(data)
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
            `funcionario/${id}`,
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
        <div className="employee-container">
            <div className="employee-filter">
                <input className="employee-filter-input" name="firstName" type="text" placeholder="Nome do funcionario" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                <button className="employee-filter-button" onClick={()=>getGrid()} ><FilterAltIcon fontSize="12" className="employee-filter-button-icon"/>Filtrar!</button>
            </div>
            <div className="employee-list">
            {employee.map((employee, idx) => {return(
                <div className={idx % 2 == 0 ? "employee-list-item-dark" : "employee-list-item-light"} key={idx}>
                    <h1 className="employee-list-item-title">{employee.firstName}</h1>
                    <div className="employee-list-item-icon-container" >
                        <div className="employee-list-item-icon" onClick={()=>{handleDelete(employee.id)}}><DeleteIcon/></div>
                        <div className="employee-list-item-icon" onClick={()=>{navigate(`/employee/${employee .id}`)}}><EditIcon/></div>
                    </div>
                </div>
            )})}
            </div>
        </div>
    )
}

export default Employee;