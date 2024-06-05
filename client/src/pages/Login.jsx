import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../component/Header'
import axios from 'axios'
import { useAuth } from '../context/Auth'

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("") 
    const [auth,setAuth] = useAuth();

    let data = JSON.parse(localStorage.getItem('auth'));

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            let res = await axios.post(`http://localhost:8000/users/login`,{
                email : email,
                password : password
            })
            if(res.data.success){
                alert("User successfully Login")
                setAuth({
                    ...auth,
                    user : res.data.user,
                    token : res.data.token
                })
            
                localStorage.setItem('auth',JSON.stringify(res.data))
                if(data?.user?.role){
                    navigate('/admin/dashboard')
                }else{
                    navigate('/')
                }
                
            }else{
                alert(res.data.message)
            }
            setEmail("");
            setPassword("");
        }catch(err){
            console.log(err);
            return false;
        }
    }


    
    

    //role base auth

    // useEffect(()=>{
    //     if(data && data.user.role==="admin"){
    //         navigate('/admin/dashboard') 
    //     }
    // },[])

   
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
