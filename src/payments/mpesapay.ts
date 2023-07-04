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

  //public method for checking status of the initiated stkpush, #payed, #canceled, # successfull

  // public async checkPaymentStatus(
  //   transactionId: string,
  //   resultsUrl: string,
  //   initiator: string
  // ): Promise<any> {
  //   const accessToken = await this.generateAccessToken();
  //   const password =  this.generatePassword();
  //   const requestBody = this.initializePaymentStatusRequestBody(
  //     password,
  //     resultsUrl,
  //     initiator
  //   );

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   try {
  //     const response: AxiosResponse<any> = await axios.get(
  //       `${this.environment}/mpesa/stkpushquery/v1/query`,
  //       {
  //         params: {
  //           ...requestBody,
  //           'Transaction ID': transactionId,
  //         },
  //         headers: config.headers,
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  // private initializePaymentStatusRequestBody(
  //   password: string,
  //   resultsUrl: string,
  //   initiator: string
  // ): Record<string, any> {
  //   return {
  //     Initiator: initiator,
  //     SecurityCredential: password,
  //     CommandID: 'TransactionStatusQuery',
  //     PartyA: this.businessShortCode,
  //     IdentifierType: '4',
  //     Remarks: 'done',
  //     QueueTimeOutURL: resultsUrl,
  //     ResultURL: resultsUrl,

     
  //     'Command ID': 'TransactionStatusQuery',
  //     'Transaction ID': 'NEF61H8J60',
  //     OriginatorConversationID: 'AG_20190826_0000777ab7d848b9e721',
  //     Occasion: 'OK',
  //   };
  // }

  //check the total transacted amount for your paybill or till number

  // public async getAccountBalance(
  //   resultsUrl: string,
  //   initiator: string
  // ): Promise<any> {
  //   const accessToken = await this.generateAccessToken();
  //   const password = this.generatePassword();
  //   const requestBody = this.initializeAccountBalanceRequestBody(
  //     password,
  //     resultsUrl,
  //     initiator
  //   );
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   try {
  //     const response: AxiosResponse<any> = await axios.post(
  //       `${this.environment}/mpesa/accountbalance/v1/query`,
  //       requestBody,
  //       config
  //     );
  //     return response.data;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  // private initializeAccountBalanceRequestBody(
  //   password: string,
  //   resultsUrl: string,
  //   initiator: string
  // ): Record<string, any> {
  //   return {
  //     Initiator: initiator,
  //     SecurityCredential: password,
  //     CommandID: 'AccountBalance',
  //     PartyA: this.businessShortCode,
  //     IdentifierType: 4,
  //     Remarks: 'done',
  //     QueueTimeOutURL: resultsUrl,
  //     ResultURL: resultsUrl,
  //   };
  // }

  // private generatePassword(): string {
  //   const timeStamp = this.generateTimestamp();
  //   return Buffer.from(
  //     `${this.businessShortCode}${this.passkey}${timeStamp}`
  //   ).toString('base64');
  // }

  // private generateTimestamp(): string {
  //   return new Date()
  //     .toISOString()
  //     .replace(/[^0-9]/g, '')
  //     .slice(0, -3);
  // }

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
