import React, { useEffect } from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'
const Header = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem('auth')
        alert("Logout successfully")
        navigate('/login')
    }


    return (
        <div className='header' style={{ backgroundColor: "#38419D" }}>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-ligh">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">E-store</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                {
                                    !auth?.user ? (<>
                                        <li className="nav-item">
                                            <Link to={`/login`} className="nav-link active" aria-current="page">Login</Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to={`/register`} className="nav-link active" aria-current="page">Register</Link>
                                        </li>
                                    </>) : (
                                        <>
                                            <li className="nav-item">
                                                <Link onClick={() => handleLogout()} className="nav-link active" aria-current="page">Logout</Link>
                                            </li>

                                            <li className='nav-item'>

                                                {
                                                    auth?.user?.role === "admin" ? (
                                                        <div className="dropdown">
                                                            <Link to={`/admin/dashboard`}>
                                                                <button className="btn btn-info" type="button">
                                                                    Admin {auth?.user?.name}
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    ) : (
                                                        <div className="dropdown">
                                                            <Link to={`/admin/dashboard`}>
                                                                <button className="btn btn-info" type="button">
                                                                    User {auth?.user?.name}
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    )
                                                }


                                            </li>
                                        </>

                                    )
                                }
                                <li className="nav-item">
                                    <Link to={`/`} className="nav-link active" aria-current="page">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/product`} className="nav-link active" aria-current="page">Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/cart`} className="nav-link active" aria-current="page">Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link">Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default Header
