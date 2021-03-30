import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import "../css/Carousel.css";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <ArrowBackIos
            style={{
                zIndex: "9",
                fontSize: "0",
                left: "-25px",
                lineHeight: "0",
                position: "absolute",
                top: "50%",
                display: "block",
                width: "20px",
                height: "20px",
                padding: "0",
                msTransform: "translate(0, -50%)",
                transform: "translate(0, -50%)",
                cursor: "pointer",
                border: "none",
            }}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <ArrowForwardIos
            style={{
                zIndex: "9",
                fontSize: "0",
                lineHeight: "0",
                right: "-25px",
                position: "absolute",
                top: "50%",
                display: "block",
                width: "20px",
                height: "20px",
                padding: "0",
                msTransform: "translate(0, -50%)",
                transform: "translate(0, -50%)",
                cursor: "pointer",
                border: "none",
            }}
            onClick={onClick}
        />
    );
}

export default function MainCarousel() {
    const settings = {
        dots: true,
        lazyLoad: true,
        fade: true,
        infinite: true,
        autoplay: false,
        pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />
    };
    return (
        <div className="contain">
            <Slider {...settings}>
                <div>
                    <div className="carouselText">
                        <h2>Improve your productivity with Radarin</h2>
                        <p>Radarin allows you to bla bla bla bla bla bla bla bla bla</p>
                    </div>
                    <div>
                        <img src="http://placekitten.com/g/400/200" alt="test" />
                    </div>
                </div>
                <div>
                    <img src="http://placekitten.com/g/400/200" alt="test" />
                </div>
                <div>
                    <img src="http://placekitten.com/g/400/200" alt="test" />
                </div>
                <div>
                    <img src="http://placekitten.com/g/400/200" alt="test" />
                </div>
            </Slider>
            <div className="carouselButton">
                <Button component={Link} to="/login" color="primary" variant="contained" className="carouselButton">Create an account</Button>
            </div>
        </div>
    );
}
