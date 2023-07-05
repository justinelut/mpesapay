import axios, { AxiosResponse } from 'axios';

class MpesaPay {
  private consumerKey: string;
  private consumerSecret: string;
  private businessShortCode: string;
  private passkey: string;
  private accountReference: string;
  private transactionDesc: string;
  private environment: string;

  constructor(
    consumerKey: string,
    consumerSecret: string,
    businessShortCode: string,
    passkey: string,
    accountReference: string,
    transactionDesc: string,
    environment: 'sandbox' | 'live' = 'sandbox'
  ) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.businessShortCode = businessShortCode;
    this.passkey = passkey;
    this.accountReference = accountReference;
    this.transactionDesc = transactionDesc;
    this.environment =
      environment === 'live'
        ? 'https://api.safaricom.co.ke'
        : 'https://sandbox.safaricom.co.ke';
  }

  //stkpush method for directly initiating a pop to the specified phonenumber with the amount to payed

  public async stkPush(
    amount: string,
    phoneNumber: string,
    callbackUrl: string
  ): Promise<any> {
    const accessToken = await this.generateAccessToken();
    const timeStamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, -3);
    const password = Buffer.from(
      `${this.businessShortCode}${this.passkey}${timeStamp}`
    ).toString('base64');
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
        'Content-Type': 'application/json',
      },
    };

    try {
      const response: AxiosResponse<any> = await axios.post(
        `${this.environment}/mpesa/stkpush/v1/processrequest`,
        requestBody,
        config
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }



  private async generateAccessToken(): Promise<string | null> {
    const credentials = Buffer.from(
      `${this.consumerKey}:${this.consumerSecret}`
    ).toString('base64');
    const config = {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    };

    try {
      const response: AxiosResponse<any> = await axios.get(
        `${this.environment}/oauth/v1/generate?grant_type=client_credentials`,
        config
      );
      return response.data.access_token;
    } catch (error) {
      return null;
    }
  }

  private initializeRequestBody(
    amount: string,
    phoneNumber: string,
    callbackUrl: string,
    timeStamp: string,
    password: string
  ): Record<string, string> {
    return {
      BusinessShortCode: this.businessShortCode,
      Password: password,
      Timestamp: timeStamp,
      TransactionType: 'CustomerPayBillOnline',
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

export default MpesaPay;
