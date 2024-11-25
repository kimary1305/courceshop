import React from 'react';
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { JEWELERY_ROUTE } from "../utils/consts";

const JeweleryItem = ({ jewelery }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(JEWELERY_ROUTE + '/' + jewelery.id)}>
            <Card style={{ width: 150, cursor: 'pointer' }} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + jewelery.img} />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>Tiffany...</div>
                    <div className="d-flex align-items-center">
                        <div>{jewelery.rating}</div>
                        <Image width={18} height={18} src={star} />
                    </div>
                </div>
                <div>{jewelery.name}</div>
            </Card>
        </Col>
    );
};

export default JeweleryItem;