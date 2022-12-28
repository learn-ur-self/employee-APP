import React, { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom'

const AddEmployeeComponent = () => {
    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName]=useState('');
    const [emailId, setEmailId]=useState('');
    const navigate=useNavigate();
    const {id}=useParams();

   const saveOrUpdateEmployee=(e)=>{
    e.preventDefault();
    const employee={
        firstName,
        lastName,
        emailId
    }
    if(id){
EmployeeService.updateEmployee(id,employee).then((res)=>{
    console.log(res);
    navigate("/employees");
}).catch(error=>{
    console.log(error);
})
    }else{
    EmployeeService.createEmployee(employee).then((res)=>{
        console.log(res.data);
        navigate("/employees");
    }).catch(error=>{
        console.log(error);
    })
    }
   }
    useEffect(() => {
     EmployeeService.getEmployeeById(id).then((res)=>{
        console.log(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmailId(res.data.emailId);
     })
    }, [])
    
    const title=()=>{
        if(id){
            return <h2 className='text-center'>Update Employee Details</h2>
        }else{
            return <h2 className='text-center'>Add Employee Details</h2>
        }
    }
  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
        {title()}
        <div className='card-body'>
            <form>
                <div className='form-group mb-2'>
                    <label className='form-label'>
                        First Name:
                    </label>
                    <input className='form-control' type="text" placeholder='Enter First Name' value={firstName || ""} onChange={(e)=>setFirstName(e.target.value)}/>
                </div>


                <div className='form-group mb-2'>
                    <label className='form-label'>
                        Last Name:
                    </label>
                    <input className='form-control' type="text" placeholder='Enter Last Name' value={lastName || ""} onChange={(e)=>setLastName(e.target.value)}/>
                </div>

                
                <div className='form-group mb-2'>
                    <label className='form-label'>
                        Email ID:
                    </label>
                    <input className='form-control' type="Email" placeholder='Enter Email Id' value={emailId || ""} onChange={(e)=>setEmailId(e.target.value)}/>
                </div>
                <div className='d-flex justify-content-center'>
                <button className='btn btn-success' onClick={(e)=>saveOrUpdateEmployee(e)}>Save</button>
                <button className='btn btn-danger ml-2' onClick={()=>navigate("/employees")}>cancel</button>
           
                </div>
             </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployeeComponent