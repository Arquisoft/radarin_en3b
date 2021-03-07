import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import "../css/Carousel.css";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";




function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
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
    const { className, style, onClick } = props;
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

class ReactSlickDemo extends React.Component {
    render() {
        var settings = {
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
                            <h2>Mejora tu productividad con Radarin</h2>
                            <p>Radarín te permite bla bla bla bla bla bla bla bla bla</p>
                        </div>
                        <div>
                            <img src="http://placekitten.com/g/400/200" />
                        </div>
                    </div>
                    <div>
                        <img src="http://placekitten.com/g/400/200" />
                    </div>
                    <div>
                        <img src="http://placekitten.com/g/400/200" />
                    </div>
                    <div>
                        <img src="http://placekitten.com/g/400/200" />
                    </div>
                </Slider>
                <div className="carouselButton">
                    <button type="button" className="carouselButton btn btn-primary">Crea una cuenta</button>
                </div>
            </div>
        );
    }
}

export default ReactSlickDemo;