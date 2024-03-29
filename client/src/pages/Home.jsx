import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Home = () => {

  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [checked,setChecked] = useState([])

  const getAllcategory = () => {
    fetch(`http://localhost:8000/category/categoryView`)
      .then(res => res.json())
      .then(record => setCategory(record))
  }

  const getAllproduct = () => {
    fetch(`http://localhost:8000/products`)
      .then(res => res.json())
      .then(record => setProduct(record))
  }

  //category wise filter using checkbox

  const categoryFilter = (value,id) => {
      let all = [...checked]
      if(value){
        all.push(id)
      }else{
        all = all.filter(c => c !== id)
      }
     setChecked(all)
  }

  useEffect(() => {
    getAllcategory()
    getAllproduct()
  }, [])

  
  return (
    <div className='container'>
      <h2 align="center">Product</h2>

      <div className="row">
        <h4>Filterbar</h4>
      </div>

      <div className="row  pt-5 pb-5" style={{backgroundColor:"#FCFCE2"}}>
        <div className="col-lg-3">
          <h3 align="center">Filter</h3>
          {
              category.category && category.category.map((val)=>{
                return (
                  <p>
                    <input type="checkbox" onChange={ (e) => categoryFilter(e.target.checked,val._id) }/> {val.name}
                  </p>
                )
              })
          }
            
        </div>
        <div className="col-lg-9">
          <div className="row">
            {
              product.product && product.product.map((item) => {
                return (
                  <div className="col-lg-4 mb-4">
                    <div className="card p-3">
                      <img src={item.image} style={{objectFit:"contain",height:"180px"}} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <h6 className="card-text">Rs. {item.price}</h6>
                        
                        <div className="row">
                          <Link className="btn btn-primary mb-2">Add Cart</Link>
                          
                          <Link className="btn btn-success">Details</Link>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
