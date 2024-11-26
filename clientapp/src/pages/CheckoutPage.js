import React, { useState } from 'react';
import { basketStore } from "../store/Basket"; 
import { Button, Form, Col, Row, Alert } from "react-bootstrap";
import jsPDF from 'jspdf';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    paymentMethod: 'cash',
  });

  const [errors, setErrors] = useState({});
  const totalPrice = basketStore.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Убираем ошибку при изменении значения
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required.';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number. Use format +1234567890.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Проверка, есть ли ошибки
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      generateReceipt();
    }
  };

  const generateReceipt = () => {
    const doc = new jsPDF();

    const orderDetails = {
      customer: formData,
      items: basketStore.items,
      totalPrice,
    };

    doc.setFillColor(0, 255, 255); 
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Order Receipt', 105, 20, null, null, 'center');

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Details:', 10, 60);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${orderDetails.customer.name}`, 10, 70);
    doc.text(`Address: ${orderDetails.customer.address}`, 10, 80);
    doc.text(`Phone: ${orderDetails.customer.phone}`, 10, 90);
    doc.text(`Email: ${orderDetails.customer.email}`, 10, 100);
    doc.text(`Payment Method: ${orderDetails.customer.paymentMethod}`, 10, 110);

    doc.setFont('helvetica', 'bold');
    doc.text('Order Items:', 10, 130);

    doc.setFont('helvetica', 'normal');
    let y = 140;
    orderDetails.items.forEach(item => {
      doc.text(`${item.name} - ${item.quantity} x ${item.price} $`, 10, y);
      y += 10;
    });

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 255, 255);
    doc.setFontSize(16);
    doc.text(`Total Price: ${orderDetails.totalPrice} $`, 10, y + 10);

    doc.setFont('helvetica', 'italic');
    doc.setTextColor(255, 255, 255);
    doc.text('Thank you for your order!', 105, y + 30, null, null, 'center');

    doc.save('receipt.pdf');
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      {basketStore.items.length > 0 ? (
        <div>
          <h3>Your Order</h3>
          <ul>
            {basketStore.items.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} x {item.price} $
              </li>
            ))}
          </ul>
          <h4>Total Price: {totalPrice} $</h4>

          <Form onSubmit={handleSubmit}>
            <h4>Shipping Information</h4>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.name}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                isInvalid={!!errors.address}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                isInvalid={!!errors.phone}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <h4>Payment Method</h4>
            <Form.Check
              type="radio"
              label="Cash on Delivery"
              name="paymentMethod"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={handleInputChange}
            />
            <Form.Check
              type="radio"
              label="Credit Card"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handleInputChange}
            />

            <Button variant="primary" type="submit" className="mt-3">
              Confirm Order
            </Button>
          </Form>
        </div>
      ) : (
        <p>Your basket is empty!</p>
      )}
    </div>
  );
};

export default CheckoutPage;
