import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { price } from '../Price'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import Header from '../component/Header'
import { useAuth } from '../context/Auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Product = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth()
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [keyword, setKeyword] = useState('');
  const [marketstatus, setMarketStatus] = useState(["best", "latest", "upcomming"])
  const [marketstatusvalue, setMarketStatusvValue] = useState("");


  const pageNumber = [...Array(totalPages + 1).keys()].slice(1)

  const getAllcategory = () => {
    fetch(`http://localhost:8000/category/categoryView`)
      .then(res => res.json())
      .then((record) => {
        setCategory(record.category)
      })
  }

  const getAllproduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/products?page=${currentPage}&limit=6&category=${checked}&price=${radio}&keyword=${keyword}&marketstatus=${marketstatusvalue}`);

      setProduct(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }

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

  useEffect(() => {
    getAllcategory();
  }, [])

  useEffect(() => {
    getAllproduct()
  }, [checked, keyword, radio, marketstatusvalue])

  //pagination logic
  useEffect(() => {
    getAllproduct();
  }, [currentPage]);


  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  //add to cart
  const AddToCart = async (id) => {
    try {
      if (!auth.token) {
        toast.error("First Login Please")
        return false
      }

      let { data } = await axios.get(`http://localhost:8000/carts/product-single-record?id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`
        }
      })

      let { product } = data;

      //add cart data
      fetch(`http://localhost:8000/carts/addcarts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        },
        body: JSON.stringify({
          categoryId: product.categoryId,
          productId: id,
          name: product.name,
          price: product.price,
          qty: product.qty,
          description: product.description,
          image: product.image,
          userId: auth.user._id
        })
      })
        .then(data => data.json())
        .then((res) => {
          if (res.success) {
            toast.success(res.message)
          }
        })

    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //likes product
  const LikeProduct = async (id) => {
    try {
      let all = await fetch(`http://localhost:8000/products/userLikeProduct`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        },
        body: JSON.stringify({
          postId: id
        })
      })
      let res = await all.json()
      if (res.success) {
        toast.success(res.message)
        getAllproduct()
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //disLike product
  const DisLikeProduct = async (id) => {
    try {
      let all = await fetch(`http://localhost:8000/products/userDisLikeProduct`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        },
        body: JSON.stringify({
          postId: id
        })
      })
      let res = await all.json()
      if (res.success) {
        toast.success(res.message)
        getAllproduct()
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }


  return (
    <>
      <Header />
      <div className='container'>
        <div style={{ marginTop: "10px 0px 10px 0px;" }} className="heading">
          <h3 align="center">All Product</h3>
        </div>
        <div className="row  pt-5 pb-5" style={{ backgroundColor: "" }}>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <h4 align="center">Category Filter</h4>
            {
              category && category.map((val) => {
                return (
                  <div className='mt-2' key={val._id}>
                    <Checkbox onChange={(e) => categoryFilter(e.target.checked, val._id)}>
                      {val.name}
                    </Checkbox>
                  </div>
                )
              })
            }
            <h4 align="center">Price Filter</h4>
            <Radio.Group onChange={e => setRadio(e.target.value)} >
              {
                price.map(p =>
                (
                  <div className='mt-2'> key={p._id}
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                )
                )
              }
            </Radio.Group>
            <br></br>
            <button className='btn btn-danger mt-3' onClick={() => window.location.reload()}>Reset Filter</button>
          </div>
          <div className="col-lg-9">

            <div className="row justify-content-between">
              <div className="col-lg-3 mb-3">

                {/* search input value get */}
                <label>Product search :- </label>
                <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className='form-control' placeholder='Product search' />

              </div>

              <div className="col-lg-3">
                <label>Product search :- </label>
                <select className='form-control'>
                  <option>---select---</option>
                  <option>High to low</option>
                  <option>Low to high</option>
                </select>
              </div>

              <div className="col-lg-3">
                <label>Product status :- </label>
                <select onChange={(e) => setMarketStatusvValue(e.target.value)} className='form-control'>
                  <option>---select---</option>
                  {
                    marketstatus.map((item) => {
                      return (
                        <option value={item}>{item}</option>
                      )
                    })
                  }
                </select>
              </div>

            </div>

            <div className="row">
              {/* all product show */}
              {
                product && product.map((item) => {
                  return (
                    <div className="col-lg-4 mb-4">
                      <div className="card p-3">
                        <img src={item.image} style={{ objectFit: "contain", height: "180px" }} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">Name :- {item.name}</h5>
                          <h6 className="card-text">Rs. {item.price}</h6>

                          <div className="row justify-content-between">
                            <Link className="btn btn-primary btn-sm" onClick={() => AddToCart(item._id)} style={{ width: "120px" }}>Add Cart</Link>
                            <Link className="btn btn-success btn-sm" style={{ width: "120px" }}>Details</Link>
                          </div>

                          <div className="row justify-content-between mt-3">
                            {
                              item.likes.includes(auth?.user?._id) ? (
                                <button className="btn btn-danger btn-sm justify-content-between" onClick={() => DisLikeProduct(item._id)} style={{ width: "120px" }}>Dislikes :- {item.likes.length}</button>
                              ) : (
                                <button className="btn btn-info btn-sm justify-content-between" onClick={() => LikeProduct(item._id)} style={{ width: "120px" }}>Likes :- {item.likes.length}</button>
                              )
                            }



                          </div>


                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>


            {/* pagination part start */}

            <nav className='d-flex justify-content-center' aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link" onClick={handlePrevPage} disabled={currentPage == 1}>Previous</button>
                </li>

                {pageNumber.map(pgNumber => (
                  <li className={`page-item ${currentPage == pgNumber ? 'active' : ''}`}>
                    <button className='page-link' onClick={() => setCurrentPage(pgNumber)}>{pgNumber}</button>
                  </li>
                ))}

                <li className="page-item">
                  <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </li>
              </ul>
            </nav>
            {/* pagination part start */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Product
