import React from 'react';
import Card from 'react-bootstrap/Card';

class AboutCard extends React.Component {
    render() {
        return <Card className="m-3">
                <Card.Img variant="top" src={this.props.src} width="10px" />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
                    <Card.Text></Card.Text>
                </Card.Body>
            </Card>;
    }
}
export default AboutCard;