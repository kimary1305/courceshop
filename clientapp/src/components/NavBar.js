import React, { useContext, useState } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CHECKOUT_ROUTE } from "../utils/consts";
import { Button, Modal } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { basketStore } from "../store/Basket";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [showBasket, setShowBasket] = useState(false);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    const handleRemoveFromBasket = (itemId) => {
        basketStore.removeFromBasket(itemId);
    };

    const handleIncreaseQuantity = (itemId) => {
        basketStore.increaseQuantity(itemId);
    };

    const handleDecreaseQuantity = (itemId) => {
        basketStore.decreaseQuantity(itemId);
    };

    // Navigate to checkout page
    const handleCheckout = () => {
        navigate(CHECKOUT_ROUTE);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>Aquamarine</NavLink>
                    {user.isAuth ? 
                        <Nav className="ml-auto" style={{ color: 'white' }}>
                            <Button
                                variant={"outline-light"}
                                onClick={() => setShowBasket(true)} // Open basket modal
                            >
                                Basket ({basketStore.items.length})
                            </Button>
                            {user.user.role === 'ADMIN' && (
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                    className="ml-2"
                                >
                                    Admin panel
                                </Button>
                            )}
                            <Button
                                variant={"outline-light"}
                                onClick={() => logOut()}
                                className="ml-2"
                            >
                                Exit
                            </Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{ color: 'white' }}>
                            <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Login</Button>
                        </Nav>
                    }
                </Container>
            </Navbar>

            {/* Basket modal */}
            <Modal show={showBasket} onHide={() => setShowBasket(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Basket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {basketStore.items.length > 0 ? (
                        <ul>
                            {basketStore.items.map((item) => (
                                <li key={item.id}>
                                    {item.name} - {item.quantity} x {item.price} $
                                    <Button 
                                        variant="danger" 
                                        size="sm" 
                                        className="ml-2"
                                        onClick={() => handleRemoveFromBasket(item.id)}
                                    >
                                        Remove
                                    </Button>
                                    <Button 
                                        variant="success" 
                                        size="sm" 
                                        className="ml-2"
                                        onClick={() => handleIncreaseQuantity(item.id)}
                                    >
                                        +
                                    </Button>
                                    <Button 
                                        variant="warning" 
                                        size="sm" 
                                        className="ml-2"
                                        onClick={() => handleDecreaseQuantity(item.id)}
                                    >
                                        -
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Basket is empty!</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBasket(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCheckout}>
                        Checkout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default NavBar;
