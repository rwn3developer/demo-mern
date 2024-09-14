
import React, { useEffect, useState } from 'react'
import './home.css'
import Header from '../component/Header'
import Slider from '../component/Slider'



const Home = () => {

    const [bestmobile, setBestMobile] = useState([]);
    const [bestelectronics, setBestElectronics] = useState([]);
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            let data = await fetch(`http://localhost:8000/products/allproduct`, {
                method: "GET",
            })
            let res = await data.json();
            // setProducts(res.products);
            let bestmobiledata = res.bestmobile
            let bestelectronics = res.bestelectronics
            setBestMobile(bestmobiledata)
            setBestElectronics(bestelectronics)
        } catch (err) {
            console.log(err);
            return false;
        }
    }



    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <Header /><br></br><br></br>
            <Slider />
            <div className='best-content mt-5'>
                <div className="container">
                    <div className="row">
                        <h3>Best Mobile</h3>
                        {
                            bestmobile.map((val) => {
                                return (
                                    <div className="col-lg-3">
                                        <div className="card p-3">
                                            <img className="card-img-top" style={{ height: "250px", backgroundSize: 'contain' }} src={val.image} alt="Card image cap" />
                                            <div className="card-body">
                                                <h4 className="card-title">{val.name}</h4>
                                                <p className="card-text">{val.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="row mt-5">
                        <h3>Best Electronics</h3>
                        {
                            bestelectronics.map((val) => {
                                return (
                                    <div className="col-lg-3">
                                        <div className="card p-3">
                                            <img className="card-img-top" style={{ height: "250px", backgroundSize: 'contain' }} src={val.image} alt="Card image cap" />
                                            <div className="card-body">
                                                <h4 className="card-title">{val.name}</h4>
                                                <p className="card-text">{val.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
