import React from 'react'
import Header from '../../../component/Header'
import Leftsidebar from '../Leftsidebar'

const Category = () => {
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
                      <th>Name</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
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

export default Category
