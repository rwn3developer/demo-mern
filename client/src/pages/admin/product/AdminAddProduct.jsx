import React, { useEffect, useState } from 'react'
import Leftsidebar from '../Leftsidebar'
import Header from '../../../component/Header'
import { useAuth } from '../../../context/Auth'
import { Link, useNavigate } from 'react-router-dom'

const AdminAddProduct = () => {

    const navigate = useNavigate()
    const [auth, setAuth] = useAuth();






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
                            <h5 className="card-header">Product Add</h5>

                            <div className='d-flex justify-content-end p-3'>
                                <Link to={`/admin/product`}>
                                    <button type="button" class="btn btn-success">
                                        View
                                    </button>
                                </Link>
                            </div>


                           <div className="card-body">
                           <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Name</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="exampleInputPassword1">Image</label>
                                    <input type="file" className="form-control" />
                                </div>
                               
                                <button  type="submit" className="btn btn-primary mt-3">Submit</button>
                            </form>
                           </div>





                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAddProduct
