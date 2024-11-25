import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import JeweleryList from "../components/JeweleryList";
import Pages from "../components/Pages";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchJewelerys, fetchTypes } from "../http/jeweleryAPI";

const Shop = observer(() => {
    const { jewelery } = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => jewelery.setTypes(data));
        fetchBrands().then(data => jewelery.setBrands(data));
        fetchJewelerys(null, null, 1, 2).then(data => {
            jewelery.setJewelerys(data.rows);
            jewelery.setTotalCount(data.count);
        });
    }, [jewelery]);
    
    useEffect(() => {
        fetchJewelerys(jewelery.selectedType.id, jewelery.selectedBrand.id, jewelery.page, 2).then(data => {
            jewelery.setJewelerys(data.rows);
            jewelery.setTotalCount(data.count);
        });
    }, [jewelery, jewelery.page, jewelery.selectedType, jewelery.selectedBrand]);

    const styles = {
        container: {
            backgroundColor: "#f9f9f9",
            padding: "0",
        },
        heroSection: {
   backgroundColor: "#7FFFD4", // Убедитесь, что путь правильный
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "5rem 2rem",
    marginBottom: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
},
        heroHeading: {
            fontSize: "3rem",
            fontWeight: "bold",
        },
        heroText: {
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
        },
        sidebar: {
            background: "#fff",
            borderRadius: "8px",
            padding: "1rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        contentArea: {
            background: "#fff",
            borderRadius: "8px",
            padding: "1rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
    };

    return (
        <Container fluid style={styles.container}>
            <div style={styles.heroSection}>
                <h1 style={styles.heroHeading}>Welcome to the Jewelery Store</h1>
                <p style={styles.heroText}>
                    Discover exquisite designs crafted with passion and precision.
                </p>
                
            </div>

            <Row className="mt-4">
                <Col md={3} style={styles.sidebar}>
                    <TypeBar />
                </Col>
                <Col md={9} style={styles.contentArea}>
                    <BrandBar />
                    <JeweleryList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
