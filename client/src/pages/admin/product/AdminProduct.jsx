import React, { useEffect, useState } from 'react'
import Leftsidebar from '../Leftsidebar'
import Header from '../../../component/Header'
import { useAuth } from '../../../context/Auth'
import { useNavigate } from 'react-router-dom'

const AdminProduct = () => {

    const navigate = useNavigate()
    const [auth,setAuth] = useAuth();
    const [products,setProducts] = useState([])

    useEffect(()=>{
        if(!auth?.token || auth?.user?.role === "user"){
            navigate('/login')
        }
    })

    const getProduct = async() => {
        let data = await fetch(`http://localhost:8000/products/adminviewproduct`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${auth?.token}`
            }
        });
        let res = await data.json();
        if(res.success){
            setProducts(res.products)
        }else{
            alert(res.success.message);
            return false;
        }
    }

    useEffect(()=>{
        getProduct()
    },[])

    return (
        <>
            <Header /><br></br><br></br>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-3">
                        <Leftsidebar />
                    </div>
                    <div className="col-lg-9">
                        <div className="card">
                            <h5 className="card-header">Product</h5>

                            <div className='d-flex justify-content-end p-3'>
                                <button className='btn btn-success'>Add</button>
                            </div> 

                            <div className="card-body">
                                <table className='table table-striped table-hove'>
                                    <thead className='table-primary'>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Price</th>
                                            <th>Market Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProduct
