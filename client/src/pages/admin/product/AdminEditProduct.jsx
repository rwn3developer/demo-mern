import React, { useEffect, useState } from 'react'
import Leftsidebar from '../Leftsidebar'
import Header from '../../../component/Header'
import { useAuth } from '../../../context/Auth'
import { Link, useNavigate, useParams } from 'react-router-dom'

const AdminEditProduct = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth();
    const [categorydata, setCategoryData] = useState([]);
    const [mstatus, setMStatus] = useState(["best", "latest", "upcomming"]); 

    const [category, setCategory] = useState("");
    const [name, setName] = useState("")
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [selectcategory, setSelectCategory] = useState("")
    const [selectmarketstatus, setSelectMarketStatus] = useState("")
    const [singleimage, setsingleImage] = useState("")

    const getCategory = async () => {
        try {
            let data = await fetch(`http://localhost:8000/category/categoryView`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                }
            })
            let res = await data.json();
            if (res.success) {
                setCategoryData(res.category)
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    //single product fetch
    const getsingleProduct = async () => {
        try {
            let data = await fetch(`http://localhost:8000/admin/product/fetchsingleproduct/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                }
            });
            let res = await data.json();
            setSelectCategory(res.product.categoryId.name)
            setName(res.product.name)
            setPrice(res.product.price)
            setDescription(res.product.description)
            setsingleImage(res.product.image)
            setSelectMarketStatus(res.product.marketstatus)
        } catch (err) {
            console.log(err);
            return false
        }
    }

    // all category fetch
    useEffect(() => {
        getCategory()
    }, [])


    useEffect(() => {
        getsingleProduct()
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append('category', category);
            formData.append('name', name);
            formData.append('image', image);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('marketstatus', status);
            //post data to server
            let data = await fetch(`http://localhost:8000/admin/product/updateproduct/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                },
                body: formData
            });
            let res = await data.json();
            if (res.success) {
                alert("Product successfully Update")
            }
            setCategory("")
            setName("");
            setImage("")
            setPrice("")
            setDescription("") 
            setStatus("")
        } catch (err) {
            console.log(err);
            return false;
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
                            <h5 className="card-header">Product Edit</h5>

                            <div className='d-flex justify-content-end p-3'>
                                <Link to={`/admin/product`}>
                                    <button type="button" className="btn btn-success">
                                        View
                                    </button>
                                </Link>
                            </div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Category</label>
                                        <select onChange={(e) => setCategory(e.target.value)} value={category}  className='form-control'>
                                            <option value="">---select category---</option> 
                                            {
                                                categorydata.map((cat) => {
                                                // console.log(cat._id === categoryid);
                                                    return (
                                                        selectcategory == cat.name ? (
                                                            <option selected value={cat._id}>{selectcategory}</option>

                                                        ) : (
                                                            <option value={cat._id}>{cat.name}</option>
                                                        )
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="exampleInputEmail1">Name</label>
                                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                                    </div>

                                    <div className="form-group mt-3">
                                        <label htmlFor="exampleInputPassword1">Image</label>
                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" />
                                        <img src={singleimage} width="100" />
                                    </div>

                                    <div className="form-group mt-3">
                                        <label htmlFor="exampleInputEmail1">Price</label>
                                        <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter price" />
                                    </div>

                                    <div className="form-group mt-3">
                                        <label htmlFor="exampleInputEmail1">Description</label>
                                        <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter description" />
                                    </div>

                                    <div className='form-group mt-3'>
                                        <label htmlFor="exampleInputEmail1">Market status</label>
                                        <select onChange={(e) => setStatus(e.target.value)}  className='form-control'>
                                            <option>---select status---</option>
                                            {
                                                mstatus.map((st) => {
                                                    return (
                                                         selectmarketstatus === st ? (
                                                            <option selected value={selectmarketstatus}>{selectmarketstatus}</option>
                                                        ) : (
                                                            <option value={st}>{st}</option> 
                                                        )
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminEditProduct
