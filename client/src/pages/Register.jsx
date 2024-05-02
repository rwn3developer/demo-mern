import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'
import axios from 'axios'

const Register = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [city,setCity] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            let {data} = await axios.post(`http://localhost:8000/users/register`,{
                name : name,
                email : email,
                password : password,
                phone : phone,
                city : city,
                address : address
            })
            if(data.success){
                alert(data.message)
                setName("")
                setEmail("")
                setPassword("")
            }else{
                alert(data.message)
            }
        }
        catch(err){
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
                                <span style={{ fontSize: "20px", fontWeight: "500" }}>Register User</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input type="text" onChange={ (e) => setName(e.target.value) } value={name} className="form-control" placeholder='Enter Name'/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="text" onChange={ (e) => setEmail(e.target.value) } value={email} className="form-control" placeholder='Enter Email'/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" onChange={ (e) => setPassword(e.target.value) } value={password} className="form-control" placeholder='Enter Password'/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                                        <input type="number" onChange={ (e) => setPhone(e.target.value) } value={phone} className="form-control" placeholder='Enter Phone'/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">City</label>
                                        <input type="text" onChange={ (e) => setCity(e.target.value) } value={city} className="form-control" placeholder='Enter City'/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                                        <input type="text" onChange={ (e) => setAddress(e.target.value) } value={address} className="form-control" placeholder='Enter Address'/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <Link to={`/login`}>
                                        <button type="submit" className="btn btn-success ms-3">Back To Login</button>
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

export default Register
