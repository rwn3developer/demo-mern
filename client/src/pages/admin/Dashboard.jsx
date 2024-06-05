import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import Leftsidebar from './Leftsidebar'
import { useAuth } from '../../context/Auth'
import { useNavigate } from 'react-router-dom'
import { FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";

const Dashboard = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [users, setUsers] = useState([])
    const [categories, setcategories] = useState([])
    const [products,setProducts] = useState([])


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

    const getCategory = () => {
        fetch(`http://localhost:8000/admin/category/viewcategory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.token}`
            }
        })
            .then(data => data.json())
            .then((res) => {
                if (res.success) {
                    setcategories(res.category)
                }
            })
    }

    const getProduct = async() => {
        try{
            // let all = await fetch(`http://localhost:8000/products`,{
            //     method : 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${auth?.token}`
            //     }
            // }); 
            // let res = await all.json();
            // if(res.success){
            //     setProducts(res.products)
            // }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getUsers()
        getCategory()
        getProduct()
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
                                        <div className='shadow p-3'>
                                            <span className='d-flex justify-content-center' style={{ fontSize: '70px' }}><FaUsers /></span>
                                            <h4 className='d-flex justify-content-center'>Users :- {users.length}</h4>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='shadow p-3'>
                                            <span className='d-flex justify-content-center' style={{ fontSize: '70px' }}><MdCategory /></span>
                                            <h4 className='d-flex justify-content-center'>Category :- {categories.length}</h4>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='shadow p-3'>
                                            <span className='d-flex justify-content-center' style={{ fontSize: '70px' }}><FaProductHunt /></span>
                                            <h4 className='d-flex justify-content-center'>Product :- {categories.length}</h4>
                                        </div>
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
