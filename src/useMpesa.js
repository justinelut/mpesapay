import axios from "axios";
import { Buffer } from "buffer";

class Mpesa {
  constructor(
    consumerKey,
    consumerSecret,
    businessShortCode,
    passkey,
    accountReference,
    transactionDesc
  ) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.businessShortCode = businessShortCode;
    this.passkey = passkey;
    this.accountReference = accountReference;
    this.transactionDesc = transactionDesc;
  }

  async pay(amount, phoneNumber, callbackUrl) {
    const accessToken = await this.generateAccessToken();

    const timeStamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3);

    const password = Buffer.from(
      `${this.businessShortCode}${this.passkey}${timeStamp}`
    ).toString("base64");

    const requestBody = this.initializeRequestBody(
      amount,
      phoneNumber,
      callbackUrl,
      timeStamp,
      password
    );

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        requestBody,
        config
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async generateAccessToken() {
    const credentials = Buffer.from(
      `${this.consumerKey}:${this.consumerSecret}`
    ).toString("base64");

    const config = {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    };

    try {
      const response = await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        config
      );

      return response.data.access_token;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  initializeRequestBody(amount, phoneNumber, callbackUrl, timeStamp, password) {
    return {
      BusinessShortCode: this.businessShortCode,
      Password: password,
      Timestamp: timeStamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: this.businessShortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: this.accountReference,
      TransactionDesc: this.transactionDesc,
    };
  }
}

export default Mpesa;
