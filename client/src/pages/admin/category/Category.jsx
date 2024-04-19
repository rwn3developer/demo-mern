import React, { useEffect, useState } from 'react'
import Header from '../../../component/Header'
import Leftsidebar from '../Leftsidebar'
import { useAuth } from '../../../context/Auth'
import { useNavigate } from 'react-router-dom'

const Category = () => {
  const navigate = useNavigate()
  let [token, setToken] = useState("");
  const [category, setCategory] = useState([])
  const [categoryname,setCategoryname] = useState("");

  //get token 
  useEffect(() => {
    let userLogin = JSON.parse(localStorage.getItem('auth'));
    setToken(userLogin.token)
    getCategory()
  }, [token])


  //add category using async await method
  const handleCategory = async(e) => {
    e.preventDefault();
    let add = await fetch(`http://localhost:8000/admin/category/addcategory`,{
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        name : categoryname
      })
    })
    let msg = await add.json();
    if(msg.success){
      alert(msg.message);
      setCategoryname("")
      getCategory()
    }
  }


  //api calling fetch method using promises
  const getCategory = () => {
    fetch(`http://localhost:8000/admin/category/viewcategory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(data => data.json())
      .then((res) => {
        if (res.success) {
          setCategory(res.category)
        }
      })
  }

  //delete category by token
  const deleteCategory = (id) => {
    fetch(`http://localhost:8000/admin/category/deletecategory?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((data) => data.json())
      .then((res) => {
        alert(res.message)
        getCategory();
      }).catch((err) => {
        console.log(err);
        return false
      })
  }



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
                <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
              </div>


              {/* category model */}
              <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">

                    <div className="modal-body">
                      <div className="card">
                        <h5 className="card-header">Category Add</h5>
                        <div className="card-body">


                          <form onSubmit={handleCategory}>
                            <div className="mb-3">
                              <label htmlFor="exampleInputEmail1" className="form-label">Add Category</label>
                              <input type="text" className="form-control" onChange={ (e) => setCategoryname(e.target.value) } value={categoryname} />
                            </div>

                            <div lassName="modal-footer">
                              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                              <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
                            </div>

                          </form>

                        </div>
                      </div>
                    </div>
                    {/* <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary">Save changes</button>
                    </div> */}
                  </div>
                </div>
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
                      category.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{++i}</td>
                            <td>{item.name}</td>
                            <td>
                              <button onClick={() => deleteCategory(item._id)} className='btn btn-danger btn-sm'>Delete</button>
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

export default Category
