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
import A from "react-bootstrap/SafeAnchor";

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
                color: "white",
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
                color: "white",
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
                        <h2 className="text-white">Radarin</h2>
                        <p className="text-white">Download our mobile application to start using Radarin. At the moment only compatible for Android version 9 or lower. </p>
                        <A href="https://drive.google.com/file/d/1SztJvZe4w6IkaQ5EFd5jq1alxjD6qEXk/view?usp=sharing" target="_blank">
                            <Button className="mt-4" color="primary" variant="contained">Download your APK for Android</Button>
                        </A>
                    </div>
                    <div>
                        <img className="mt-5" src={Carousel2} alt="test" />
                    </div>
                </div>
                <div>
                    <div className="carouselText">
                        <h2 className="text-white">Radarin</h2>
                        <p className="text-white">Radarin allows you to store your locations and share them with your friends.
                            You will be able to know where they are in a blink.</p>
                    </div>
                    <div>
                        <img src={Carousel1} alt="test" />
                    </div>
                </div>
                <div>
                    <div className="carouselText">
                        <h2 className="text-white">Radarin</h2>
                        <p className="text-white">Your Radarin friends are taken from your Solid Pod, so your data will always be protected with the most
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
