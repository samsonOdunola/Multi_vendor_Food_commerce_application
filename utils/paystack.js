/* eslint-disable camelcase */
require('dotenv').config();
const axios = require('axios');

const payStackSecret = process.env.PAYSTACK_SECRET;
const callback_url = process.env.PAYSTACK_CALLBACK_URL;
const url = 'https://api.paystack.co/transaction/initialize';

const initializePayment = async (email, amount) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${payStackSecret}`,
  };

  const data = {
    amount: amount * 100,
    email,
    currency: 'NGN',
    callback_url,
  };
  return new Promise((resolve, reject) => {
    axios.post(url, data, { headers }).then((res) => resolve(res)).catch((err) => reject(err));
  });
};

const verifyTransaction = async (reference) => {
  const verificationURL = `https://api.paystack.co/transaction/verify/${reference}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${payStackSecret}`,
  };
  return new Promise((resolve, reject) => {
    axios.get(
      verificationURL,
      { headers },
    ).then((response) => resolve(response)).catch((err) => reject(err));
  });
};

module.exports = { initializePayment, verifyTransaction };
