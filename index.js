const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));


app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice) || 0;
  let cartTotal = parseFloat(req.query.cartTotal) || 0;
  
  let totalCartValue = cartTotal + newItemPrice;
  
  res.send(totalCartValue.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal) || 0;
  let isMember = req.query.isMember === 'true';
  
  let discountRate = isMember ? 0.1 : 0; // 10% discount for members
  let finalPrice = cartTotal * (1 - discountRate);
  
  res.send(finalPrice.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal) || 0;
  
  let taxRate = 0.05; // 5% tax rate
  let taxAmount = cartTotal * taxRate;
  
  res.send(taxAmount.toString());
});
app.get('/estimate-delivery', (req, res) => {
  const { shippingMethod, distance } = req.query;
  const parsedDistance = parseFloat(distance);

  if (!shippingMethod || isNaN(parsedDistance) || parsedDistance < 0) {
      return res.status(400).send('Invalid input. Please provide a valid shippingMethod and a non-negative distance.');
  }

  let deliveryDays;
  
  if (shippingMethod.toLowerCase() === 'standard') {
      deliveryDays = Math.ceil(parsedDistance / 50);
  } else if (shippingMethod.toLowerCase() === 'express') {
      deliveryDays = Math.ceil(parsedDistance / 100);
  } else {
      return res.status(400).send('Invalid shippingMethod. Use "standard" or "express".');
  }
  
  res.send(`${deliveryDays}`);
});

app.get('/shipping-cost', (req, res) => {
  const { weight, distance } = req.query;
  const parsedWeight = parseFloat(weight);
  const parsedDistance = parseFloat(distance);

  if (isNaN(parsedWeight) || isNaN(parsedDistance) || parsedWeight <= 0 || parsedDistance < 0) {
      return res.status(400).send('Invalid input. Please provide valid weight and distance values.');
  }

  const shippingCost = parsedWeight * parsedDistance * 0.1;
  res.send(`${shippingCost}`);
});

app.get('/loyalty-points', (req, res) => {
  const { purchaseAmount } = req.query;
  const parsedPurchaseAmount = parseFloat(purchaseAmount);

  if (isNaN(parsedPurchaseAmount) || parsedPurchaseAmount <= 0) {
      return res.status(400).send('Invalid input. Please provide a valid purchase amount.');
  }

  const loyaltyPoints = parsedPurchaseAmount * 2;
  res.send(`${loyaltyPoints}`);
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
