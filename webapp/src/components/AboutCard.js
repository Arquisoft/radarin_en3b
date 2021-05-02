import React from "react";
import Card from "react-bootstrap/Card";

// eslint-disable-next-line react/prop-types
export default function AboutCard({ src, name, subtitle }) {
    return <Card className="m-3">
        <Card.Img variant="top" src={src} width="10px" height="200px"/>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
            <Card.Text/>
        </Card.Body>
    </Card>;
}
