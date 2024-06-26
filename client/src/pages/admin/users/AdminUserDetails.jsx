import React, { useEffect, useState } from 'react'
import Header from '../../../component/Header'
import Leftsidebar from '../Leftsidebar'
import { useAuth } from '../../../context/Auth'
import { useParams } from 'react-router-dom'

const AdminUserDetails = () => {

    const { id } = useParams()
    const [auth, setAuth] = useAuth()
    const [user, setUser] = useState({})
    const [usercart, setUserCart] = useState([]);
    let [total, setTotal] = useState(0)


    const getSingleUser = async () => {
        try {
            let all = await fetch(`http://localhost:8000/admin/users/singleuser?id=${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                }
            })
            let res = await all.json();
            if (res.success) {
                setUser(res.user)
            }
        } catch (err) {
            console.log(err);
            return false
        }
    }

    const getUserCart = async () => {
        try {
            let all = await fetch(`http://localhost:8000/admin/users/cart?id=${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                }
            })
            let res = await all.json();
            if (res.success) {
                setUserCart(res.usercart)
            }
        } catch (err) {
            console.log(err);
            return false
        }
    }

    useEffect(() => {
        getSingleUser()
        getUserCart()
    }, [])

    return (
        <>
            <Header /><br></br><br></br>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-3">
                        <Leftsidebar />
                    </div>
                    <div className="col-lg-9">

                        <div className='card'>
                            <div>
                                <div className="card-header">
                                    <h5>User Details</h5>
                                </div>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <p className="card-title">Name :- {user?.name}</p>
                                            <p className="card-title">Email :- {user?.email}</p>
                                            <p className="card-title">Phone :- {user?.phone}</p>
                                        </div>
                                        <div className='col-lg-6'>
                                            <p className="card-title">City :- {user?.city}</p>
                                            <p className="card-title">Address :- {user?.address}</p>
                                        </div>
                                    </div>
                                   

                                    
                                </div>
                            </div>

                        </div>

                        <div className="card mt-5">
                            <h5 className="card-header">Cart</h5>
                            <div className="card-body">
                                <table className='table table-striped table-hove'>
                                    <thead className='table-primary'>
                                        <tr>
                                            <th>ID</th>
                                            <th>Image</th>
                                            <th>Category</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            usercart.map((c, index) => {
                                                total = total + c.price * c.qty
                                                return (
                                                    <tr>
                                                        <td>{++index}</td>
                                                        <td>
                                                            <img src={c.image} width="100" />
                                                        </td>
                                                        <td></td>
                                                        <td>{c.name}</td>
                                                        <td>{c.price}</td>
                                                        <td>{c.qty}</td>
                                                        <td>{c.price * c.qty}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <nav className='d-flex justify-content-center' aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <button className="page-link">Previous</button>
                                        </li>

                                       
                                            <li className='active'>
                                                <button className='page-link active'>1</button>
                                            </li>

                                            <li className='page-item'>
                                                <button className='page-link'>2</button>
                                            </li>
                                    

                                        <li className="page-item">
                                            <button className="page-link">Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className='card-footer'>
                                <h5>Total :- {total}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminUserDetails
