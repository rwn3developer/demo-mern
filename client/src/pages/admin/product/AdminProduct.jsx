import React, { useEffect, useState } from 'react'
import Leftsidebar from '../Leftsidebar'
import Header from '../../../component/Header'
import { useAuth } from '../../../context/Auth'
import { useNavigate } from 'react-router-dom'

const AdminProduct = () => {

    const navigate = useNavigate()
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([])
    const [status, setStatus] = useState(["best", "latest", "upcomming"]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)

    const pageNumber = [...Array(totalPages + 1).keys()].slice(1)



    useEffect(() => {
        if (!auth?.token || auth?.user?.role === "user") {
            navigate('/login')
        }
    })

    const getProduct = async () => {
        let data = await fetch(`http://localhost:8000/products/adminviewproduct?page=${currentPage}&limit=5`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.token}`
            }
        });
        let res = await data.json();
        if (res.success) {
            setTotalPages(res.totalPages);
            setProducts(res.products)
        }
    }


    // useEffect(() => {
    //     getProduct()
    // }, [])

    //pagination logic
    useEffect(() => {
        getProduct()
    }, [currentPage])

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
                            <h5 className="card-header">Product</h5>

                            <div className='d-flex justify-content-end p-3'>
                                <button className='btn btn-success'>Add</button>
                            </div>

                            <div className="card-body">
                                <table className='table table-striped table-hove'>
                                    <thead className='table-primary'>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Price</th>
                                            <th>Market Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((p, index) => {
                                                return (
                                                    <tr key={p._id}>
                                                        <td>{++index}</td>
                                                        <td>{p.name}</td>
                                                        <td>
                                                            <img src={p.image} alt="" width="50" />
                                                        </td>
                                                        <td>{p.price}</td>
                                                        <td>
                                                            <select className='form-control w-75'>
                                                                <option>---select status---</option>
                                                                {
                                                                    status.map((mstatus) => {

                                                                        return (
                                                                            p.marketstatus === mstatus ? (
                                                                                <option selected>{p.marketstatus}</option>
                                                                            ) : (
                                                                                <option>{mstatus}</option>
                                                                            )
                                                                        )


                                                                    })
                                                                }
                                                            </select>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
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
            </div>
        </>
    )
}

export default AdminProduct
