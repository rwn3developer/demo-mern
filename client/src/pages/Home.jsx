import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { price } from '../Price'
import axios from 'axios'
import { Checkbox,Radio } from 'antd'


const Home = () => {

  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])



  const getAllcategory = () => {
    fetch(`http://localhost:8000/category/categoryView`)
      .then(res => res.json())
      .then((record)=>{
        setCategory(record.category)
      })
  }

  const getAllproduct = async () => {
    try {
      let allproduct = await axios.get(`http://localhost:8000/products`);
      if (allproduct) {
        setProduct(allproduct.data.product);
      } else {
        console.log("not fetch record");
      }
    } catch (err) {
      console.log("something wrong");
      return false;
    }

    // fetch(`http://localhost:8000/products`)
    //   .then(res => res.json())
    //   .then((record)=>{
    //         setProduct(record)
    //   })
  }

  //multiple checkbox value get
  const categoryFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }

  //filter product price and category wise
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`http://localhost:8000/products/filterProduct`, {
        checked, radio
      })
      setProduct(data?.products)
    } catch (err) {
      console.log(err);
    }


    // let data = {radio,checked}
    // fetch(`http://localhost:8000/products/filterProduct`,{
    //   method : "POST",
    //   headers : {
    //     'Content-type' : "application/json"
    //   },
    //   body: JSON.stringify(data),
    // })
  }

  // category and price wise filter record using conditional rendering
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct()
    }
  }, [checked, radio])


  //not filter category and price show all record 
  useEffect(() => {
    if (!checked.length || !radio.length) getAllproduct()
  }, [])

  useEffect(() => {
    getAllcategory();
  }, [])


  return (
    <div className='container'>
      <h2 align="center">Product</h2>

      <div className="row">
        <h4>Filterbar</h4>
      </div>

      <div className="row  pt-5 pb-5" style={{ backgroundColor: "#FCFCE2" }}>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <h4 align="center">Category Filter</h4>
          {
            
          category && category.map((val) => {
              return (
                <p>
                  <Checkbox key={val._id} onChange={(e) => categoryFilter(e.target.checked, val._id)}>
                  {val.name}
                </Checkbox>
                </p>
              )
            })
          }

          <h4 align="center">Price Filter</h4>
          {/* {
          price.map((p)=>{
            return (
              <p key={p._id} onChange={ (e) => setRadio(e.target.value) }>
                <input type='radio'   value={p.array}/> {p.name}
              </p> 
            )
          })
        } */}

          <Radio.Group onChange={e => setRadio(e.target.value)} >
            {
              price.map(p =>
              (
                <p> key={p._id}
                  <Radio value={p.array}>{p.name}</Radio>
                </p>
              )
              )
            }
          </Radio.Group>

          <button className='btn btn-danger' onClick={() => window.location.reload()}>Reset Filter</button>
        </div>
        <div className="col-lg-9">
          <div className="row">
            {
              product && product.map((item) => {
                return (
                  <div className="col-lg-4 mb-4">
                    <div className="card p-3">
                      <img src={item.image} style={{ objectFit: "contain", height: "180px" }} className="card-img-top" alt="..." />
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
