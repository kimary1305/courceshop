import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row, Table } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneJewelery } from "../http/jeweleryAPI";
import { addToBasket } from "../http/basketAPI"; // Adding the basket API
import { basketStore } from "../store/Basket";

const JeweleryPage = () => {
    const [jewelery, setJewelery] = useState({ info: [] });
    const { id } = useParams();

    useEffect(() => {
        fetchOneJewelery(id).then(data => {
            console.log('Fetched Jewelry:', data); // Log the data to inspect its structure
            setJewelery(data);
        });
    }, [id]);
    
    
    console.log('Jewelry state:', jewelery); // Логируем state
    

    const handleAddToCart = () => {
        const item = {
            id: jewelery.id,
            name: jewelery.name,
            price: jewelery.price,
            img: jewelery.img,
        };

        // Add the item to the basket via API or local store
        addToBasket(item)
            .then(() => alert("Товар успішно доданий у кошик!"))
            .catch((error) => console.error("Помилка додавання до кошика:", error));
        
        basketStore.addToBasket(item);
    };

    return (
        <>
            <style>{`
                .jewelery-gallery .main-image {
                    width: 100%;
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                }
                .jewelery-details .add-to-cart-btn {
                    margin: 10px 0;
                    width: 100%;
                    padding: 10px;
                    font-size: 1.2rem;
                    border-radius: 25px;
                }
                .jewelery-details .jewelery-title {
                    font-size: 2rem;
                    margin-bottom: 10px;
                }
                .jewelery-details .jewelery-price {
                    font-size: 1.5rem;
                    margin: 10px 0;
                }
                .jewelery-details .wishlist-info {
                    color: #888;
                    font-size: 0.9rem;
                    margin-top: 10px;
                }
                .thumbnail-images {
                    margin-top: 10px;
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                }
                .thumbnail {
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .thumbnail:hover {
                    transform: scale(1.1);
                }
                .jewelery-details .old-price {
                    text-decoration: line-through;
                    color: #888;
                    margin-right: 10px;
                }
                .jewelery-details .current-price {
                    color: #d9534f;
                    font-weight: bold;
                }
                .add-to-cart-btn,
                .go-to-menu-btn {
                    margin: 10px 5px;
                    width: 100%;
                    padding: 10px;
                    font-size: 1.2rem;
                    border-radius: 25px;
                }
                .add-to-cart-btn:hover {
                    background-color: #c9302c;
                    color: #fff;
                }
                .section-title {
                    font-size: 1.5rem;
                    margin-bottom: 20px;
                    color: #333;
                }
                .delivery-info li,
                .payment-info li {
                    margin-bottom: 10px;
                    font-size: 1rem;
                    line-height: 1.5;
                }
            `}</style>

            <Container className="mt-4">
                <Row>
                    {/* Jewelry Image Gallery */}
                    <Col md={6} className="text-center">
                        <div className="jewelery-gallery">
                            <Image
                                className="main-image"
                                src={process.env.REACT_APP_API_URL + jewelery?.img}
                                alt={jewelery?.name || 'Jewelry'}
                                fluid
                            />
                            <div className="thumbnail-images">
                                <Image
                                    className="thumbnail"
                                    src={process.env.REACT_APP_API_URL + jewelery?.img}
                                    alt="Thumbnail"
                                    fluid
                                />
                            </div>
                        </div>
                    </Col>

                    {/* Jewelry Details */}
                    <Col md={6}>
                        <div className="jewelery-details">
                            <h2 className="jewelery-title">{jewelery?.name}</h2>
                            <div className="jewelery-price">
                                <span>{jewelery.price} $</span>
                            </div>
                            <Button
                                variant="danger"
                                className="add-to-cart-btn"
                                onClick={handleAddToCart} // Add to cart handler
                            >
                                Додати в кошик
                            </Button>
                            <p className="wishlist-info">135 додали в список бажань</p>
                        </div>
                    </Col>
                </Row>

                {/* Jewelry Characteristics Section */}
                <Row className="mt-5">
    <Col>
        <h3>Характеристики</h3>
        <Table bordered>
            <tbody>
                {jewelery.jewelery_infos && jewelery.jewelery_infos.length > 0 ? (
                    jewelery.jewelery_infos.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2">Інформація відсутня</td>
                    </tr>
                )}
            </tbody>
        </Table>
    </Col>
</Row>


                {/* Delivery and Payment Information Sections */}
                <Row className="mt-5">
                    <Col md={6}>
                        <h3 className="section-title">Доставка</h3>
                        <ul className="delivery-info">
                            <li>Безкоштовна доставка у відділення Нової Пошти при замовленні від 1500 $</li>
                            <li>Кур'єром по Україні при замовленні від 1500 $</li>
                            <li>Міжнародна доставка здійснюється через Укрпошту</li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <h3 className="section-title">Оплата</h3>
                        <ul className="payment-info">
                            <li>Готівкою при отриманні</li>
                            <li>Оплата частинами через ПриватБанк</li>
                            <li>Оплата карткою Visa/Mastercard</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default JeweleryPage;
