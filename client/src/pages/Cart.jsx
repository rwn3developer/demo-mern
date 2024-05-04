import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { useAuth } from '../context/Auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    let [carts, setCart] = useState([])
    let [total, setTotal] = useState(0)


    const getUserCart = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.token}`
            }

            if (auth?.user?._id) {
                let record = await axios.get(`http://localhost:8000/carts/usercart?userId=${auth?.user?._id}`, { headers });
                setCart(record.data?.carts)
            }

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const deleteCart = async (id) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.token}`
            }
            let { data } = await axios.delete(`http://localhost:8000/carts/deletecart?id=${id}`, { headers });
            if (data.success) {
                toast.error(data.message);
                getUserCart()
            }
        } catch (err) {
            console.log(err);
            return false
        }
    }

    const editCart = async (id, qty) => {

        let edit = carts.map((val) => {
            if (val._id == id) {
                return {
                    ...val,
                    qty: qty
                }
            }
            return val;
        })
        setCart(edit)

        let editCart = edit.find((val) => {
            return val._id == id
        })

        let postData = {
            qty: editCart.qty
        }


        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.token}`
            }
            let { data } = await axios.put(`http://localhost:8000/carts/editcart?id=${id}`, postData, { headers })
            if (data.success) {
                toast.success("Cart successfully update")
            } else {
                alert("Something Wrong")
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }



    useEffect(() => {
        if (!auth?.token) {
            toast.error("Please login")
            setTimeout(()=>{
                navigate('/login')
            },5000)
        }
        getUserCart()
    }, [auth?.token])

    return (
        <>
            <Header /><br></br><br></br>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card">
                            <h5 className="card-header">User Details</h5>
                            <div className="card-body">
                                <p className="card-title">Name :- {auth?.user?.name}</p>
                                <hr></hr>
                                <p className="card-text">Email :- {auth?.user?.email}</p>
                                <hr></hr>
                                <p className="card-text">Phone :- {auth?.user?.phone}</p>
                                <hr></hr>
                                <p className="card-text">City :- {auth?.user?.city}</p>
                                <hr></hr>
                                <p className="card-text">Address :- {auth?.user?.address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="card">
                            <h5 className="card-header">Carts</h5>
                            <div className="card-body">
                                <table className='table table-striped table-hove'>
                                    <thead className='table-primary'>
                                        <tr>
                                            <th>ID</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            carts && carts.map((cart, index) => {
                                                total = total + cart.qty * cart.price
                                                let qt = cart.qty
                                                return (
                                                    <tr key={cart._id}>
                                                        <td>{++index}</td>
                                                        <td>
                                                            <img src={cart.image} width="50" />
                                                        </td>
                                                        <td>{cart.name}</td>
                                                        <td>
                                                            <input type="number"   onChange={(e) => editCart(cart._id, e.target.value)} value={cart.qty} className='form-control w-25' />
                                                        </td>
                                                        <td>{cart.price}</td>
                                                        <td>{cart.price * cart.qty}</td>
                                                        <td>
                                                            <button onClick={() => deleteCart(cart._id)} className='btn btn-danger btn-sm'>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2">
                        <div className="card">
                            <h5 className="card-header">Total</h5>
                            <div className="card-body">
                                <p className="card-title">Total Cart :- {carts.length}</p>
                                <hr></hr>
                                <button className='btn btn-success'>Rs :- {total}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Cart

