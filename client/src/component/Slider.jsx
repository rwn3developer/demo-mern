import React, { useEffect, useState } from 'react'

const Slider = () => {
    const [sliders, setSliders] = useState([]);

    const getSliderRecord = async () => {
        try {
            let data = await fetch(`http://localhost:8000/admin/slider/viewslider`, {
                method: "GET",
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

    return (
        <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">

                {
                    sliders.map((val, index) => {
                        return (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <img
                                    src={val.slider}
                                    className="d-block w-100"
                                    style={{ height: "500px", backgroundSize: "contain" }}
                                    alt={`Slide ${index + 1}`}
                                />
                            </div>
                        );
                    })
                }
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
