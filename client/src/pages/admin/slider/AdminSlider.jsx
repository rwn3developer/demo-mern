import Leftsidebar from "../Leftsidebar";
import Header from "../../../component/Header";
import { useState } from "react";
const AdminSlider = () => {

    const [slider, setSlider] = useState("")

    const handleSlider = (e) => {
        e.preventDefault();
        try {

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
                                                        <input type="hidden" />
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleInputEmail1" className="form-label">Add Slider</label>
                                                            <input type="file" onChange={(e) => setSlider(e.target.files[0])} className="form-control" />
                                                        </div>

                                                        <div lassName="modal-footer">
                                                            {/* {
                                                                editid ? (
                                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Edit</button>

                                                                ) : (
                                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>

                                                                )
                                                            } */}
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
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {
                                            category.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{++i}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <button onClick={() => deleteCategory(item._id)} className='btn btn-danger btn-sm'>Delete</button>
                                                            <button onClick={() => editCategory(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-primary btn-sm mx-2'>Edit</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        } */}
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