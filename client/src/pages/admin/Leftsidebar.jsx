import React from 'react'
import { Link } from 'react-router-dom'

const Leftsidebar = () => {
    const currentPath = window.location.pathname;
    return (
        <div>
            <div className='card'>
                <div className="card-header">
                    <h5>Admin Panel</h5>
                </div>
                <div className="card-body">
                    <div className="list-group">

                        <Link to={`/admin/dashboard`} className={`list-group-item list-group-item-action ${currentPath === '/admin/dashboard' ? 'active' : ''}`} aria-current="true">
                            Dashboard
                        </Link>

                        <Link to={`/admin/users`} className={`list-group-item list-group-item-action ${currentPath === '/admin/users' ? 'active' : ''}`} aria-current="true">
                            Users
                        </Link>

                        <Link to={`/admin/slider`} className={`list-group-item list-group-item-action ${currentPath === '/admin/slider' ? 'active' : ''}`} aria-current="true">
                            Slider
                        </Link>

                        <Link to={`/admin/category`} className={`list-group-item list-group-item-action ${currentPath === '/admin/category' ? 'active' : ''}`} aria-current="true">
                            Category
                        </Link>

                        <Link to={`/admin/product`} className={`list-group-item list-group-item-action ${currentPath === '/admin/product' ? 'active' : ''}`} aria-current="true">
                            Product
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leftsidebar

