import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { useAuth } from '../context/Auth'
import axios from 'axios'

const Cart = () => {

    const [auth, setAuth] = useAuth();
    let [carts,setCart] = useState([])
    // const [total,setTotal] = useState(0)

    const getUserCart = async() => {
        try{
            const headers = {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${auth?.token}`  
              }
 
              if(auth?.user?._id){
                let record = await axios.get(`http://localhost:8000/carts/usercart?userId=${auth?.user?._id}`,{headers});
                setCart(record.data?.carts) 
              }
           
        }catch(err){
            console.log(err);
            return false; 
        }
    }

    useEffect(()=>{
        getUserCart()
    },[auth?.token])

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
                                            carts && carts.map((cart,index)=>{
                                                return (
                                                    <tr>
                                                        <td>{++index}</td>
                                                        <td>
                                                            <img src={cart.image} width="50" />
                                                        </td>
                                                        <td>{cart.name}</td>
                                                        <td>{cart.qty}</td>
                                                        <td>{cart.price}</td>
                                                        <td>{cart.price * cart.qty}</td>
                                                        <td>
                                                            <button className='btn btn-danger btn-sm'>Delete</button>
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


                    <div className="col-lg-2">hello</div>
                </div>
            </div>
        </>
    )
}

export default Cart
