import React from 'react'

const Slider = () => {
    return (
        <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg" className="w-100" style={{height:"500px",backgroundSize:"contain"}} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg" className="d-block w-100" style={{height:"500px",backgroundSize:"contain"}} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/I/71KfZkbgStL._SX3000_.jpg" className="d-block w-100" style={{height:"500px",backgroundSize:"contain"}} alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    )
}

export default Slider
