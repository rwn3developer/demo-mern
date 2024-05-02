import React, { useEffect, useState } from 'react'
import Header from '../../../component/Header'
import Leftsidebar from '../Leftsidebar'
import { useAuth } from '../../../context/Auth'
import { Link, useNavigate } from 'react-router-dom'

const Users = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()
  const [users, setUsers] = useState([])

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
      if (res.success) {
        setUsers(res.users)
      }

    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const deleteUser = () => {

  }

  useEffect(() => {
    getUsers()
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
            <div className="card">
              <h5 className="card-header">Users</h5>

              {/* <div className='d-flex justify-content-end p-3'>
                <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
              </div> */}

              <div className="card-body">
                <table className='table table-striped table-hove'>
                  <thead className='table-primary'>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{++i}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                              <Link to={`/admin/users/userdetails/${item._id}`}>
                                <button className='btn btn-success btn-sm mx-2'>View</button>
                              </Link>
                              <button onClick={() => deleteUser(item._id)} className='btn btn-danger btn-sm'>Delete</button>

                              {/* <button onClick={() => editCategory(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-primary btn-sm mx-2'>Edit</button> */}
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
        </div>
      </div>
    </>
  )
}

export default Users
