import React, { useEffect,useState } from 'react'
import axios from 'axios'
import{Link} from 'react-router-dom'

function Student() {
    const [employee,setEmployee] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3004/")
        .then(res => setEmployee(res.data))
        .catch(err=>console.log(err))
    },[])

    const handleDelete = async(empId)=>{
        try{
            await axios.delete("http://localhost:3004/delete/"+empId)
            window.location.reload()
        }catch(error){
            console.log(error)
        }
    }

    return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-start'>
        <div className='w-75 h-75 rounded p-3 m-5 bg-white overflow-x-auto'>
            <h1 className='text-primary text-center'>Employee Details</h1>
            <Link to='/add' className='btn btn-success'>Add +</Link>
            <table className='table'>
                <thead>
                    <tr>
                      <th>Emp Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Destination</th>
                      <th>Salary</th>
                      <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map((data)=>(
                        <tr key={data.empId}>
                            <td>{data.empId}</td>
                            <td>{data.empName}</td>
                            <td>{data.email}</td>
                            <td>{data.destination}</td>
                            <td>{data.salary}</td>
                            <td>
                                <Link to={`/update/${data.empId}`} className='btn btn-warning'>Update</Link>
                                <button className='btn btn-danger ms-2' onClick={e=>handleDelete(data.empId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Student