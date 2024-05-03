import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { useAuth } from '../context/Auth';

const Profile = () => {
    const [auth,setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const getUser = async() => {
        try{
            let data = await fetch(`http://localhost:8000/users/profileupdate?id=${auth?.user?._id}`,{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            let res = await data.json();
           if(res.success){
                setName(res.user.name)
                setEmail(res.user.email)
                setPassword(res.user.password)
                setPhone(res.user.phone)
                setCity(res.user.city)
                setAddress(res.user.address)
           }
        }catch(err){
            console.log(err);
            return false;
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    return (
        <>
            <Header /><br></br><br></br><br></br>
            <div className='container mt-4'>
                <div className="row">
                    <div className='col-lg-6'>
                        <div className="card">
                            <form>
                                <div className="card-header">
                                    Change Profile
                                </div>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                                <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder='Enter Name' />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                                <input type="text" disabled onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter Email' />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" disabled onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder='Enter Password' />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                                                <input type="number" onChange={(e) => setPhone(e.target.value)} value={phone} className="form-control" placeholder='Enter Phone' />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">City</label>
                                                <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" placeholder='Enter City' />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                                                <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} className="form-control" placeholder='Enter Address' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button className='btn btn-success p-2 w-25 mb-4 justify-content-center'>Change Profile</button>
                                </div>
                            </form>
                        </div>

                    </div>

                    <div className='col-lg-6'>
                        <div className="card">
                            <div className="card-header">
                                Change Password
                            </div>
                            <div className="card-body">
                                <div className='row'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="text" disabled onChange={(e) => setName(e.target.value)} value={email} className="form-control" placeholder='Enter Email' />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">New Password</label>
                                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter new password' />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder='Enter Password' />
                                    </div>
                                    <div className='d-flex justify-content-center' style={{marginTop:"0px"}}>
                                        <button className='btn btn-success p-2  w-25 justify-content-center' style={{marginBottom:"8px"}}>Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
