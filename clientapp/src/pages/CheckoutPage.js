import React, { useState } from 'react';
import { basketStore } from "../store/Basket"; // Import basketStore
import { Button, Form, Col, Row, Image } from "react-bootstrap";
import jsPDF from 'jspdf';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    paymentMethod: 'cash',
  });
  
  const totalPrice = basketStore.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle the order submission and generate receipt
  const handleSubmit = (e) => {
    e.preventDefault();
    generateReceipt(); // Generate and download the receipt
  };

  // Function to generate and download the receipt
  const generateReceipt = () => {
    const doc = new jsPDF();
  
    const orderDetails = {
      customer: formData,
      items: basketStore.items,
      totalPrice,
    };
  
    // Set background color to aquamarine
    doc.setFillColor(0, 255, 255); // RGB for aquamarine
    doc.rect(0, 0, 210, 297, 'F'); // Full page background
  
    // Add title with larger font and custom color
    doc.setTextColor(255, 255, 255); // White text color
    doc.setFontSize(24);
    doc.text('Order Receipt', 105, 20, null, null, 'center');
  

    
  
    // Add customer details with bold headers and aquamarine text color
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Details:', 10, 60);
  
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0); // Black text color
    doc.text(`Name: ${orderDetails.customer.name}`, 10, 70);
    doc.text(`Address: ${orderDetails.customer.address}`, 10, 80);
    doc.text(`Phone: ${orderDetails.customer.phone}`, 10, 90);
    doc.text(`Email: ${orderDetails.customer.email}`, 10, 100);
    doc.text(`Payment Method: ${orderDetails.customer.paymentMethod}`, 10, 110);
  
    // Add order items with color and bold headers
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0); // Black text color
    doc.text('Order Items:', 10, 130);
  
    doc.setFont('helvetica', 'normal');
    let y = 140;
    orderDetails.items.forEach(item => {
      doc.text(`${item.name} - ${item.quantity} x ${item.price} $`, 10, y);
      y += 10;
    });
  
    // Add total price with a larger font and aquamarine color
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 255, 255); // Aquamarine color for total price
    doc.setFontSize(16);
    doc.text(`Total Price: ${orderDetails.totalPrice} $`, 10, y + 10);
  
    // Footer with thank you message
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(255, 255, 255); // White text color for footer
    doc.text('Thank you for your order!', 105, y + 30, null, null, 'center');
  
    // Save the PDF
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  
                  {item.name} - {item.quantity} x {item.price} $
                </div>
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
                    required
                  />
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
                    required
                  />
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
                required
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
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
