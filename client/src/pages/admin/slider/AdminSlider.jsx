import Leftsidebar from "../Leftsidebar";
import Header from "../../../component/Header";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/Auth";
const AdminSlider = () => {

    const [auth, setAuth] = useAuth();
    const [slider, setSlider] = useState("")
    const [sliders, setSliders] = useState([]);
    const [editid, setEditId] = useState("");

    const getSliderRecord = async () => {
        try {
            let data = await fetch(`http://localhost:8000/admin/slider/viewslider`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                },
            });
            let res = await data.json();
            const { success, message, sliders } = res
            if (success) {
                setSliders(sliders)
            }

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    useEffect(() => {
        getSliderRecord();
    }, [])

    const handleSlider = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (editid) {
                formData.append('id', editid)
                formData.append('slider', slider);
                let data = await fetch(`http://localhost:8000/admin/slider/updateslider`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    },
                    body: formData
                });
                let res = await data.json();
                if (res.success) {
                    alert("Slider successfully update")
                    setEditId("");
                    setSlider(""); // Clear the file input
                    getSliderRecord();
                }
            } else {
                formData.append('slider', slider);
                let data = await fetch(`http://localhost:8000/admin/slider/addslider`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    },
                    body: formData
                });
                let res = await data.json();
                if (res.success) {
                    alert("Slider successfully add")
                    setSlider(""); // Clear the file input
                    getSliderRecord();
                }
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const deleteCategory = async (id) => {
        try {
            let data = await fetch(`http://localhost:8000/admin/slider/deleteslider?id=${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                },
            });
            let res = await data.json();
            if (res.success) {
                alert("Slider successfully delete")
                getSliderRecord();
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const editCategory = (id) => {
        setEditId(id)
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
                            <h5 className="card-header">Slider</h5>

                            <div className='d-flex justify-content-end p-3'>
                                <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
                            </div>


                            {/* category model */}
                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">

                                        <div className="modal-body">
                                            <div className="card">
                                                <h5 className="card-header">Slider Add</h5>
                                                <div className="card-body">


                                                    <form onSubmit={handleSlider}>
                                                        <input type="hidden" value={editid} />
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleInputEmail1" className="form-label">Add Slider</label>
                                                            <input type="file" onChange={(e) => setSlider(e.target.files[0])} className="form-control" />
                                                        </div>

                                                        <div lassName="modal-footer">
                                                            {
                                                                editid ? (
                                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Edit</button>

                                                                ) : (
                                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>

                                                                )
                                                            }
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
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sliders.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{++i}</td>
                                                        <td>
                                                            <img src={item.slider} width="200" />
                                                        </td>
                                                        <td>
                                                            <button onClick={() => deleteCategory(item._id)} className='btn btn-danger btn-sm'>Delete</button>
                                                            <button onClick={() => editCategory(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-primary btn-sm mx-2'>Edit</button>
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

export default AdminSlider;