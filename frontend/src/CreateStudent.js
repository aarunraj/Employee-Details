import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [id,setId] = useState(0)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [destination,setDestination] = useState('')
    const [salary,setSalary] = useState(0)
    const navigate = useNavigate()

    function handleSubmit (event){
        event.preventDefault();
        axios.post("http://localhost:3004/add",{id,name,email,destination,salary})
        .then(res=>{
            console.log(res.data)
            navigate('/')
        })
        .catch(err=>console.log(err))
    }

    return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h1>Add Employee</h1>
                <div className='form-floating mb-2'>
                    <input type='number' id="id" placeholder='Enter Id' className='form-control' required
                    onChange={e=>setId(e.target.value)}
                    />
                    <label htmlFor='id'>Employee Id</label>
                </div>
                <div className='form-floating mb-2'>
                    <input type='text' id="name" placeholder='Enter Name' className='form-control' required
                    onChange={e=>setName(e.target.value)}
                    />
                    <label htmlFor='name'>Name</label>
                </div>
                <div className='form-floating mb-2'>
                    <input type='email' id="email" placeholder='Enter Email' className='form-control' required
                    onChange={e=>setEmail(e.target.value)}
                    />
                    <label htmlFor='email'>Email</label>
                </div>
                <div className='form-floating mb-2'>
                    <input type='text' id='destination' placeholder='Enter Destination' className='form-control' required
                    onChange={e=>setDestination(e.target.value)}
                    />
                    <label htmlFor='destination'>Destination</label>
                </div>
                <div className='form-floating mb-2'>
                    <input type='number' id='salary' placeholder='Enter Salary' className='form-control' required
                    onChange={e=>setSalary(e.target.value)}
                    />
                    <label htmlFor='salary'>Salary</label>
                </div>
                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateStudent
