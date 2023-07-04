# Mpesa Pay

Mpesa Pay is a JavaScript library that enables developers to easily integrate Mpesa payments into their Node.js applications. It provides an easy-to-use interface for initiating Mpesa STK Push requests, checking payment status, and retrieving the account balance for the M-Pesa business account.

## Installation

You can install Mpesa Pay using Yarn or NPM.

**Yarn**

```bash
yarn add mpesapay
```

**NPM**

```bash
npm install mpesapay
```

## Usage

Import default `MpesaPay` from the `mpesapay` module in your Node.js, Next.js, SveltKit, Nuxtjs application:

```javascript
import MpesaPay from 'mpesapay';
```

Create an instance of the `MpesaPay` class with your Mpesa API credentials:

```javascript
const consumerKey = 'YOUR_CONSUMER_KEY';
const consumerSecret = 'YOUR_CONSUMER_SECRET';
const businessShortCode = 'YOUR_BUSINESS_SHORT_CODE';
const passkey = 'YOUR_PASS_KEY';
const accountReference = 'YOUR_ACCOUNT_REFERENCE';
const transactionDesc = 'YOUR_TRANSACTION_DESCRIPTION';

const mpesaPay = new MpesaPay(
  consumerKey,
  consumerSecret,
  businessShortCode,
  passkey,
  accountReference,
  transactionDesc
);
```

Replace the placeholders with your actual Mpesa credentials.

**Initiating a Payment**

To initiate a payment using Mpesa Pay, you can call the `stkPush` method:

```javascript
async function initiatePayment(amount, phoneNumber, callbackUrl) {
  try {
    const response = await mpesaPay.stkPush(amount, phoneNumber, callbackUrl);
    console.log(response);
    // Handle the response data
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

// Call the function to initiate a payment
const amount = '100';
const phoneNumber = '254712345678';
const callbackUrl = 'https://example.com/callback';
initiatePayment(amount, phoneNumber, callbackUrl);
```

Here is an explanation of the parameters:

- `amount`: The amount of money to be paid. This should be a string value representing the amount in Kenyan shillings.
- `phoneNumber`: The phone number of the person making the payment. This should be a string value starting with the country code (e.g., "254" for Kenya), followed by the phone number without any spaces or special characters.
- `callbackUrl`: The URL that M-Pesa will use to send payment confirmation notifications to your server. This should be a string value containing a valid URL.

The `stkPush` method initiates the payment process and returns a Promise. The Promise resolves with the response data if the payment was successfully initiated, or rejects with an error if the payment initiation fails.

Make sure to handle the response data and errors accordingly in your application.

**Checking Payment Status**

To check the status of a payment transaction, you can call the `checkPaymentStatus` method:

```javascript
async function checkStatus(transactionId, phoneNumber) {
  try {
    const response = await mpesaPay.checkPaymentStatus(transactionId, phoneNumber);
    console.log(response);
    // Handle the response data
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

// Call the function to check the payment status
const transactionId = 'YOUR_TRANSACTION_ID';
const phoneNumber = '254712345678';
checkStatus(transactionId, phoneNumber);
```

Here is an explanation of the parameters:

- `transactionId`: The unique identifier of the payment transaction.
- `phoneNumber`: The phone number associated

 with the transaction.

The `checkPaymentStatus` method checks the status of the payment transaction and returns a Promise. The Promise resolves with the payment status response data if the status check was successful, or rejects with an error if the status check fails.

Make sure to handle the response data and errors accordingly in your application.

**Retrieving Account Balance**

To retrieve the account balance for the M-Pesa business account, you can call the `getAccountBalance` method:

```javascript
async function getBalance() {
  try {
    const response = await mpesaPay.getAccountBalance();
    console.log(response);
    // Handle the response data
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

// Call the function to retrieve the account balance
getBalance();
```

The `getAccountBalance` method retrieves the account balance and returns a Promise. The Promise resolves with the account balance response data if the retrieval was successful, or rejects with an error if the retrieval fails.

Make sure to handle the response data and errors accordingly in your application.

## Example

Here is a complete example implementation:

```javascript
import MpesaPay from 'mpesapay';

const consumerKey = 'YOUR_CONSUMER_KEY';
const consumerSecret = 'YOUR_CONSUMER_SECRET';
const businessShortCode = 'YOUR_BUSINESS_SHORT_CODE';
const passkey = 'YOUR_PASS_KEY';
const accountReference = 'YOUR_ACCOUNT_REFERENCE';
const transactionDesc = 'YOUR_TRANSACTION_DESCRIPTION';

const mpesaPay = new MpesaPay(
  consumerKey,
  consumerSecret,
  businessShortCode,
  passkey,
  accountReference,
  transactionDesc
);

async function initiatePayment(amount, phoneNumber, callbackUrl) {
  try {
    const response = await mpesaPay.stkPush(amount, phoneNumber, callbackUrl);
    console.log(response);
    // Handle the response data
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

async function checkStatus(transactionId, phoneNumber) {
  try {
    const response = await mpesaPay.checkPaymentStatus(transactionId, phoneNumber);
    console.log(response);
    // Handle the response data
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

async function getBalance() {
  try {
    const response = await mpesaPay.getAccountBalance();
    console.log(response);
    // Handle the response data
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

const amount = '100';
const phoneNumber = '254712345678';
const callbackUrl = 'https://example.com/callback';
const transactionId = 'YOUR_TRANSACTION_ID';

initiatePayment(amount, phoneNumber, callbackUrl);
checkStatus(transactionId, phoneNumber);
getBalance();
```

Replace the placeholders with your actual Mpesa credentials and customize the handling of the response data and errors according to your application's requirements.

## TypeScript Support

The Mpesa Pay module includes TypeScript type definitions, providing enhanced development experience and type checking capabilities when using the library in a TypeScript project.

That's it! You can now integrate Mpesa payments into your Node.js application using the Mpesa Pay library.

Please note that Mpesa Pay only initiates payments and retrieves account balance and payment status. You'll need to implement the necessary server-side logic to handle the payment confirmation notifications, update your application, and perform additional actions based on the payment status.

*Note*: The mpesapay module does not currently support commonjs implementation such as `require` in Node.js. We are currently working on adding this feature. You can request a pull request from GitHub to work on this feature.

Justine Gichana: [https://github.com/justinelut](https://github.com/justinelut)

GitHub URL: [https://github.com/justinelut/mpesapay](https://github.com/justinelut/mpesapay)

Documentation URL: [https://mpesapay.verixr.com/](https://mpesapay.verixr.com/)