import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'
import axios from 'axios'

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            let {data} = await axios.post(`http://localhost:8000/users/login`,{
                email : email,
                password : password
            })
            if(data.success){
                console.log(data);
                alert("User successfully Login")
                
            }else{
                alert(data.message)
            }
            setEmail("");
            setPassword("");
        }catch(err){
            console.log(err);
            return false;
        }
    }
   
    return (
        <>
            <Header />
            <br></br><br></br><br></br>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 p-5 ms-auto me-auto">
                        <div className="card">
                            <div className="card-header">
                                <span style={{ fontSize: "20px", fontWeight: "500" }}>Login User</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="text" className="form-control" onChange={ (e) => setEmail(e.target.value) } value={email} placeholder='Enter Email'/>
                                       
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control" onChange={ (e) => setPassword(e.target.value) } value={password}  placeholder='Enter Password'/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <Link to={`/register`}>
                                        <button type="submit" className="btn btn-success ms-3">Back To Register</button>
                                    </Link>
                                </form>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}

export default Login
