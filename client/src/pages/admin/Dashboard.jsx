import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import Leftsidebar from './Leftsidebar'
import { useAuth } from '../../context/Auth'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [users,setUsers] = useState([])


    const getUsers = async () => {
        try {
            let all = await fetch(`http://localhost:8000/admin/users/adminviewuser`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                }
            })
            let res = await all.json();
            setUsers(res.users)
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            <Header /><br></br><br></br>
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-lg-3">
                        <Leftsidebar />
                    </div>
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-header">
                                Dashboard
                            </div>
                            <div className="card-body">
                                <div className='row p-3'>
                                    <div className='col-lg-3'>
                                        <h4>Total User :- {users.length}</h4>
                                    </div>
                                    <div className='col-lg-3'>
                                        <h4>Total Category :-</h4>
                                    </div>
                                    <div className='col-lg-3'>
                                        <h4>Total Product :- </h4>
                                    </div>
                                    <div className='col-lg-3'>
                                        <h4>Total Likes :- </h4>
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

export default Dashboard
