import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { fetchJewelryByName, deleteJewelry } from "../../http/jeweleryAPI"; // Make sure to add the API function
import { observer } from "mobx-react-lite";

const DeleteJewelery = observer(({ show, onHide }) => {
    const { jewelery } = useContext(Context);
    const [name, setName] = useState('');
    const [foundJewelry, setFoundJewelry] = useState([]);
    const [selectedJewelry, setSelectedJewelry] = useState(null);

    useEffect(() => {
        if (name) {
            // Fetch jewelry items by name
            fetchJewelryByName(name).then(data => setFoundJewelry(data));
        }
    }, [name]);

    const handleDelete = () => {
        if (selectedJewelry) {
            deleteJewelry(selectedJewelry.id).then(() => {
                setFoundJewelry([]);
                setSelectedJewelry(null);
                setName('');
                onHide();
            });
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Видалити прикрасу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть назву прикраси для пошуку"
                    />
                    {foundJewelry.length > 0 && (
                        <Dropdown className="mt-3">
                            <Dropdown.Toggle>
                                {selectedJewelry ? selectedJewelry.name : "Виберіть прикрасу для видалення"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {foundJewelry.map(jewelry => (
                                    <Dropdown.Item
                                        onClick={() => setSelectedJewelry(jewelry)}
                                        key={jewelry.id}
                                    >
                                        {jewelry.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button
                    variant="outline-danger"
                    onClick={handleDelete}
                   
                >
                    Видалити
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteJewelery;
