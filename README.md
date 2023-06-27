# Mpesa Pay

Mpesa Pay is a JavaScript library that enables developers to easily integrate Mpesa payments into their Node.js applications. It provides an easy-to-use interface for initiating Mpesa STK Push requests, allowing customers to pay for goods and services directly from their mobile phones.

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

Import default `MpesaPay` from the `mpesapay` module in your Node.js, Nextjs, SveltKit, Nuxtjs application:

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

const amount = '100';
const phoneNumber = '254712345678';
const callbackUrl = 'https://example.com/callback';

initiatePayment(amount, phoneNumber, callbackUrl);
```

Replace the placeholders with your actual Mpesa credentials and customize the handling of the response data and errors according to your application's requirements.


## TypeScript Support

The Mpesa Pay module includes TypeScript type definitions, providing enhanced development experience and type checking capabilities when using the library in a TypeScript project.


That's it! You can now integrate Mpesa payments into your Node.js application using the Mpesa Pay library.

Please note that Mpesa Pay only initiates payments, and the results will be sent to the provided callback URL. Make sure to implement the necessary server-side logic to handle the payment confirmation notifications and update your application accordingly.

*Note* The mpesapay module does not currently support commonjs implementation such as
require in nodejs. We are currently working on the feature. You can request a pull request
from github to work on the feature.

Justine Gichana: https://github.com/justinelut

Github URL: https://github.com/justinelut/mpesapay

Documentation URL: https://verixr.com/mpesapay-docs/

