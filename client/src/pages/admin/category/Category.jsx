import React, { useEffect, useState } from 'react'
import Header from '../../../component/Header'
import Leftsidebar from '../Leftsidebar'
import { useAuth } from '../../../context/Auth'

const Category = () => {

  let [token,setToken] = useState("");

  const [category,setCategory] = useState([])


  //api calling fetch method

  const getCategory = () => {
      fetch(`http://localhost:8000/admin/category/viewcategory`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          Authorization : `Bearer ${token}` 
        }
      })
      .then(data => data.json())
      .then((res)=>{
        if(res.success){
          setCategory(res.category) 
        }
      })
  }

  useEffect(()=>{
      let userLogin = JSON.parse(localStorage.getItem('auth'));
      setToken(userLogin.token)
      getCategory()
  },[token])

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
              <h5 className="card-header">Category</h5>
              
              <div className='d-flex justify-content-end p-3'>
                <button className='btn btn-success'>Add</button>
              </div>

              <div className="card-body">
                <table className='table table-striped table-hove'>
                  <thead className='table-primary'>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        category.map((item,i)=>{
                          return (
                            <tr key={i}> 
                              <td>{++i}</td>
                              <td>{item.name}</td>
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

export default Category
