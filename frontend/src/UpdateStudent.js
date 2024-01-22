import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [destination,setDestination] = useState('')
    const [salary,setSalary] = useState(0)
    const {id} = useParams()
    const navigate = useNavigate()

    function handleSubmit (event){
        event.preventDefault();
        axios.put("http://localhost:3004/update/"+parseInt(id),{name,email,destination,salary})
        .then(res=>{
            console.log(res.data)
            navigate('/');
        })
        .catch(err=>console.log(err))
    }

    return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h1>Update Student</h1>
                <div className='mb-2'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id="name" placeholder='Enter Name' className='form-control' required
                    onChange={e=>setName(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id="email" placeholder='Enter Email' className='form-control' required
                    onChange={e=>setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='destination'>Destination</label>
                    <input type='text' id='destination' placeholder='Enter Destination' className='form-control' required
                    onChange={e=>setDestination(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='salary'>Salary</label>
                    <input type='number' id='salary' placeholder='Enter Salary' className='form-control' required
                    onChange={e=>setSalary(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn btn-success'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateStudent
