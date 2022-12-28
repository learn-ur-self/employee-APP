import React,{useState,useEffect} from 'react'
import EmployeeService from '../services/EmployeeService'
import { Link } from 'react-router-dom'
const ListEmployeeComponent = () => {
const [employees, setEmployees] = useState([])

const deleteEmployee=(employeeId)=>{
    EmployeeService.deleteEmployeeById(employeeId).then((res)=>{
        getAllEmployees();
    }).catch(error=>{
        console.log(error);
    })

}

const getAllEmployees=()=>{
    EmployeeService.getAllEmployees().then((res)=>{
        setEmployees(res.data);
        console.log(res.data);
     }).catch(error=>{
        console.log(error);
     })
}
useEffect(() => {
    getAllEmployees();
}, [])

    
  return (
    <div className='container-fluid'>
<h2 className='text-center'>List Employees</h2>
<Link to="/add-employee" className="btn btn-primary mb-2">Add Employee</Link>
<table className='table table-bordered table-striped'>
    <thead>
        <th>Employee Id</th>
        <th>Employee FirstName</th>
        <th>Employee LastName</th>
        <th>Employee Email Id</th>
        <th>Actions</th>
    </thead>
<tbody>
    {
        employees.map(employee=>
            <tr key={employee.id}>
            <td>{employee.id}</td>    
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.emailId}</td>
            <td><Link className='btn btn-warning mr-2' to={`/edit-employee/${employee.id}`}>Update</Link>
            <button className='btn btn-danger' onClick={()=>deleteEmployee(employee.id)}>Delete</button>
            </td>
            </tr>
            )
    }
</tbody>
</table>
    </div>
  )
}

export default ListEmployeeComponent