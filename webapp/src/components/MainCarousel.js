import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import "../css/Carousel.css";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Carousel1 from "../img/carousel_1.png";
import Carousel2 from "../img/carousel_2.png";
import Carousel3 from "../img/carousel_3.png";

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
                        <h2>Radarin</h2>
                        <p>Radarin allows you to store your locations and share them with your friends.
                            You will be able to know where they are in a blink.</p>
                    </div>
                    <div>
                        <img src={Carousel1} alt="test" />
                    </div>
                </div>
                <div>
                    <div className="carouselText">
                        <h2>Radarin</h2>
                        <p>You can use Radarin not only on your computer with the Web App, but with any other device. On Android devices,
                            you can also use the native App. I would not hesitate to use it! </p>
                    </div>
                    <div>
                        <img src={Carousel2} alt="test" />
                    </div>
                </div>
                <div>
                    <div className="carouselText">
                        <h2>Radarin</h2>
                        <p>Your Radarin friends are got from Solid Pods, so your data will always be protected with the most
                            modern improvements on security. </p>
                    </div>
                    <div>
                        <img src={Carousel3} alt="test" />
                    </div>
                </div>
            </Slider>
            <div className="carouselButton">
                <Button component={Link} to="/login" color="primary" variant="contained" className="carouselButton">Create an account</Button>
            </div>
        </div>
    );
}
