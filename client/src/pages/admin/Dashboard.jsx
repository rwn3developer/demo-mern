import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import Leftsidebar from './Leftsidebar'
import { useAuth } from '../../context/Auth'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    

    //role base auth
   useEffect(()=>{
       let checkUser = JSON.parse(localStorage.getItem('auth'));
       if(checkUser.user.role === "user"){
            navigate('/')
       }
   },[])

   
    

    return (
        <>
            <Header /><br></br><br></br>
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-lg-3">
                        <Leftsidebar />
                    </div>
                    <div className="col-lg-9">hello</div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
