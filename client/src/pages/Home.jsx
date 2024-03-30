
import React from 'react'
import './home.css'
import Header from '../component/Header'
import Slider from '../component/Slider'

const Home = () => {
    return (
        <div>
            <Header /><br></br><br></br>
            <Slider />
            <div className='best-content'>
                <div className="container">
                    <div className="row">
                        <h4>Best Mobile</h4>
                        <div className="col-lg-3">
                            <div className="card p-3">
                                <img className="card-img-top" src="https://rukminim2.flixcart.com/image/612/612/xif0q/keyboard/gaming-keyboard/j/8/w/f2023-aula-original-imagr4m2gjqgfgag.jpeg?q=70" alt="Card image cap" />
                                <div className="card-body">
                                    <p className="card-title">Card title</p>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>



                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
