# Mpesa Pay

Mpesa Pay is a JavaScript library that enables developers to easily integrate Mpesa payments into their Node.js, Next.js, SvelteKit, and Nuxt.js applications. It provides an easy-to-use interface for initiating STK Push requests, facilitating Business-to-Business transactions, checking Account Balances, and verifying Transaction statuses.

## Installation

You can install Mpesa Pay using Yarn, NPM & PNPM.

**Yarn**

```bash
yarn add mpesapay
```

**NPM**

```bash
npm install mpesapay
```

**PNPM**

```bash
pnpm install mpesapay
```

## Usage

Import default `MpesaPay` from the `mpesapay` module in your Node.js, Nextjs, SveltKit, Nuxtjs application:

```javascript
import MpesaPay from 'mpesapay';
```

Or use commonjs syntax:

```javascript

const { MpesaPay } = require('mpesapay')

or

const MpesaPay = require('mpesapay').default;

```


Create an instance of the `MpesaPay` class with your Mpesa API credentials:

```javascript
const Consumer_Key = 'YOUR_CONSUMER_KEY';
const Consumer_Secret = 'YOUR_CONSUMER_SECRET';
const Business_Short_Code = 'YOUR_BUSINESS_SHORT_CODE';
const Passkey = 'YOUR_PASS_KEY';
const Transaction_Description = 'YOUR_TRANSACTION_DESCRIPTION';
const Account_Reference = 'YOUR_ACCOUNT_REFERENCE';
const PartyA = "YOUR_MPESA_PARTYA"
const B2C_Security_Credential = "YOUR MPESA B2C SECURITY CREDENTIAL"
const Initiator_Name = "YOUR MPESA INITIATORS NAME"
const Environment = 'sandbox'
const transaction_Type = "YOUR SHORTCODE TYPE i.e paybill or till"



const mpesapay = new MpesaPay(
  Consumer_Key,
  Consumer_Secret,
  Business_Short_Code,
  Passkey,
  Account_Reference,
  Transaction_Description,
  PartyA,
  B2C_Security_Credential,
  Initiator_Name,
  Environment,
  transaction_Type
);
```

Replace the placeholders with your actual Mpesa credentials.

> To get your Mpesa credentials, you can follow the procedures outlined in our official documentation available at [Getting Mpesa Credentials](https://mpesapay.verixr.com/getting-started/gettingcredentials). 

**Initiating a Payment**

To initiate a payment using Mpesa Pay, you can call the `stkPush` method:

```javascript
async function initiatePayment(amount, phoneNumber, callbackUrl) {
  try {
    const response = await mpesapay.stkPush(amount, phoneNumber, callbackUrl);
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


## TypeScript Support

The Mpesa Pay module includes TypeScript type definitions, providing enhanced development experience and type checking capabilities when using the library in a TypeScript project.


That's it! You can now integrate Mpesa payments into your Node.js application using the Mpesa Pay library.


> Please note that ```stkPush``` only initiates payments, and the results will be sent to the provided callback URL. Make sure to implement the necessary server-side logic to handle the payment confirmation notifications and update your database accordingly.



[Justine Gichana](https://github.com/justinelut)

[Github URL](https://github.com/justinelut/mpesapay)

[Full Documentation](https://mpesapay.verixr.com/)

[Contributing](https://mpesapay.verixr.com/contributing)

[Support Via Paypal](https://www.paypal.com/donate/?hosted_button_id=DYVVE53QU35FS)



