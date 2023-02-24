# Mpesa Pay

Mpesa Pay is a JavaScript library that enables developers to easily integrate Mpesa payments into their Node.js applications. It provides an easy-to-use interface for initiating Mpesa STK Push requests, which allow customers to pay for goods and services directly from their mobile phones.

To use Mpesa Pay, developers need to provide their Mpesa API credentials, which include a Consumer Key and Secret, Business Short Code, Passkey, Account Reference, and Transaction Description. With these credentials, Mpesa Pay generates an access token that is used to authenticate requests to the Mpesa API.

Mpesa Pay takes care of generating the password required for initiating the STK Push request, and also handles formatting the request body and making the API call. Developers can simply call the pay method with the required parameters, and Mpesa Pay takes care of the rest.

It's worth noting that due to security and CORS (Cross-Origin Resource Sharing) restrictions, Mpesa Pay cannot be used directly in frontend applications like React, Vue, or Svelte. Instead, it should be used in server-side applications or frameworks that support server-side rendering, such as Next.js, SvelteKit, or Nuxt.js.

**You can install Mpesa Pay via Yarn or NPM.**

**YARN**

```
yarn add mpesapay
```

**NPM**

```
npm install mpesapay
```

**Usage**

Import the useMpesa function from the mpesapay module in your Node.js application using ES6 import statement:



**ES6**

```
import { useMpesa } from 'mpesapay';

```

Create an instance of the useMpesa object with your Mpesa account credentials:

```javascript
const consumerKey = "YOUR_CONSUMER_KEY";
const consumerSecret = "YOUR_CONSUMER_SECRET";
const businessShortCode = "YOUR_BUSINESS_SHORT_CODE";
const passkey = "YOUR_PASS_KEY";
const accountReference = "YOUR_ACCOUNT_REFERENCE";
const transactionDesc = "YOUR_TRANSACTION_DESCRIPTION";
const isLive = "live or sandbox";

const mpesa = useMpesa(
  consumerKey,
  consumerSecret,
  businessShortCode,
  passkey,
  accountReference,
  transactionDesc,
  isLive // or 'sandbox' - optional, defaults to 'sandbox'
);
```

Replace the placeholders with your actual Mpesa credentials.

Note: You can find your M-Pesa API credentials in your developer dashboard at safaricom daraja api located at
https://developers.safaricom.co.ke

_The **useMpesa()** function can take an optional third argument that specifies the environment as either "live" or "sandbox". If the environment argument is not provided, the default environment is set to "sandbox"._

```javascript
const mpesa = useMpesa(
  consumerKey,
  consumerSecret,
  businessShortCode,
  passkey,
  accountReference,
  transactionDesc,
  "live"
);
```

_To set the environment to "live", you can pass "live" as the third argument or simply omit the third argument:_

```javascript
const mpesa = useMpesa(
  consumerKey,
  consumerSecret,
  businessShortCode,
  passkey,
  accountReference,
  transactionDesc,
  "sandbox"
);
// or
const mpesa = useMpesa(
  consumerKey,
  consumerSecret,
  businessShortCode,
  passkey,
  accountReference,
  transactionDesc
);
```

If you don't pass the third argument, the environment is set to "sandbox" by default.

**Making a Payment**

To make a payment using the mpesapay library, you can call the pay() function with the required arguments:

_Example_

```javascript
const response = await mpesa.pay(amount, phoneNumber, callbackUrl);
```

**Here is an explanation of the arguments:**

**amount:** The amount of money to be paid. This should be a string value representing the amount in Kenyan shillings, e.g. "100".

**phoneNumber:** The phone number of the person making the payment. This should be a string value starting with the country code (e.g. "254" for Kenya), followed by the phone number without any spaces or special characters.

**callbackUrl:** The URL that M-Pesa will use to send payment confirmation notifications to your server. This should be a string value containing a valid URL.

The **pay()** function will generate an access token, timestamp, and password, and use these to make a request to the M-Pesa API to initiate the payment. The API will respond with a JSON object containing information about the payment transaction. If there is an error during the payment process, the function will return null and log the error to the console.

**Here is an example of how to make a payment:**

The pay method returns a Promise that resolves to the Mpesa response if the payment is successful, or rejects with an error if the payment fails.

You can use Promise based approach to get response or catch errors

```javascript
const amount = "10";
const phoneNumber = "254712345678";
const callbackUrl = "https://example.com/callback";

mpesa
  .pay(amount, phoneNumber, callbackUrl)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

_or_

You can use also the _await_  syntax to get response and handle errors

```javascript
const amount = "100";
const phoneNumber = "254712345678";
const callbackUrl = "https://example.com/payment_callback";

async function pay() {
  const amount = "10"; // amount in Kenyan Shillings
  const phoneNumber = "2547XXXXXXXX"; // customer phone number
  const callbackUrl = "http://your-callback-url.com"; // callback URL for transaction result

  const result = await mpesa.pay(amount, phoneNumber, callbackUrl);
  console.log(result);
}

pay();
```

**Example**

Here is a complete example implementation in nodejs:

```javascript
import { useMpesa } from "mpesapay";

const consumerKey = "YOUR_CONSUMER_KEY";
const consumerSecret = "YOUR_CONSUMER_SECRET";
const businessShortCode = "YOUR_BUSINESS_SHORTCODE";
const passkey = "YOUR_PASSKEY";
const accountReference = "YOUR_ACCOUNT_REFERENCE";
const transactionDesc = "YOUR_TRANSACTION_DESCRIPTION";
const isLive = "sandbox"; // set to live during production

const mpesa = useMpesa(
  consumerKey,
  consumerSecret,
  businessShortCode,
  passkey,
  accountReference,
  transactionDesc,
  isLive
);

async function pay() {
  const amount = "10"; // amount in Kenyan Shillings
  const phoneNumber = "2547XXXXXXXX"; // customer phone number
  const callbackUrl = "http://your-callback-url.com"; // callback URL for transaction result

  const result = await mpesa.pay(amount, phoneNumber, callbackUrl);
  console.log(result);
}

pay();
```


*Note* The mpesapay module does not currently support commonjs implementation such as
require in nodejs. We are currently working on the feature. You can request a pull request
from github to work on the feature.

Justine Gichana: https://github.com/justinelut

Github URL: https://github.com/justinelut/mpesapay

Documentation URL: https://pixelab.co.ke/mpesapay-docs/

