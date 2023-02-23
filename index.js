import express from 'express'
import MpesaPay from "./src/useMpesa.js";
const app = express();
const port = process.env.PORT || 4000;

const mpesa = new MpesaPay(
  "26INJctYAkFSpcnKUZ5FBu6XhtcGAMmE",
  "4G73GP8shcL2jLHh",
  "174379",
  "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
  "#pixelabspay",
  "Payment Via Daraja Mpesa"
);

const amount = 1;
const phoneNumber = "254740455200";
const callbackUrl = "https://justinedev.verixr.com/paymentprocess";

mpesa
  .pay(amount, phoneNumber, callbackUrl)
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.post('/paymentprocess', (req, res) => {
  res.json(req.body)
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



