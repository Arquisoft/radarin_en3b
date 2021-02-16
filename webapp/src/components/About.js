import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import A from 'react-bootstrap/SafeAnchor';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AboutCard from './AboutCard';
import Alvaro from '../img/alvaro.jpg';
import Marcos from '../img/marcos.jpg';
import Buenaga from '../img/buenaga.jpg';
import Juan from '../img/juan.jpg';
import Miguel from '../img/miguel.jpg';
import Carmen from '../img/carmen.jpg';
import Labra from '../img/labra.png';

class About extends React.Component {
    render() {
        return <Container fluid="md">
            <Row>
                <Col>
                    <Jumbotron className="mt-4">
                        <h1>About Radarin</h1>
                        <p>
                            Radarin will be a system to facilitate meetings between friends using new technologies.
                            The application can get access to the mobile phone localization of the users who voluntarily activate it and
                            will allow other users who are their friends to know when they are near them. Everything will be build with Solid
                            so you can be the owner of your own data!.
                        </p>
                        <p>
                            <A className="btn btn-primary" href="https://solidproject.org/about" target="_blank">Learn more about Solid</A>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <h1>Meet Radarin devs!</h1>
            </Row>
            <Row xs={1} md={2} lg={4}>
                <Col>
                    <AboutCard src={Labra} name="Jose Labra" subtitle="Teacher"></AboutCard>
                </Col>
                <Col>
                    <AboutCard src={Alvaro} name="Álvaro Requejo" subtitle="UO270374"></AboutCard>
                </Col>
                <Col>
                    <AboutCard src={Marcos} name="Marcos Tobías" subtitle="UO270930"></AboutCard>
                </Col>
                <Col>
                    <AboutCard src={Buenaga} name="Juan Buenaga" subtitle="UO271294"></AboutCard>
                </Col>
                <Col>
                    <AboutCard src={Carmen} name="Carmen Rendueles" subtitle="UO269689"></AboutCard>
                </Col>
                <Col>
                    <AboutCard src={Miguel} name="Miguel Ligero" subtitle="UO270927"></AboutCard>
                </Col>
                <Col>
                    <AboutCard src={Juan} name="Juan Rodríguez"></AboutCard>
                </Col>
            </Row>
        </Container>;
    }

}
export default About;