import generateAccessToken from "../utils/accesstoken";
import B2C from "./businesstocustomer";
import MpesaExpress from "./mpesaexpress";
import checkTransactionStatus from "./transactionstatus";
import getAccountBalance from "./accountbalance";
import StkPushQuery from "./stkpushQuery";

type TMpesaPay = {
  consumerKey: string;
  consumerSecret: string;
  businessShortCode: string;
  passkey: string;
  accountReference: string;
  transactionDesc: string;
  partyA: string;
  b2cSecurityCredential: string;
  initiatorName: string;
  environment: "sandbox" | "live";
  transactionType: "paybill" | "till";
};

type TStkPush = {
  amount: string;
  phoneNumber: string;
  callbackUrl: string;
};

type TTransactionStatus = {
  transactionId: string;
  callbackUrl: string;
};

type TB2C = {
  PaymentAmount: number;
  receiversPhonenumber: number;
  remarks: string;
  callbackUrl: string;
};

class MpesaPay {
  private consumerKey: string;
  private consumerSecret: string;
  private businessShortCode: string;
  private passkey: string;
  private accountReference: string;
  private transactionDesc: string;
  private partyA: string;
  private b2cSecurityCredential: string;
  private initiatorName: string;
  private environment: string;
  private transactionType: string;

  constructor({
    consumerKey,
    consumerSecret,
    businessShortCode,
    passkey,
    accountReference,
    transactionDesc,
    partyA,
    b2cSecurityCredential,
    initiatorName,
    environment,
    transactionType,
  }: TMpesaPay) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.businessShortCode = businessShortCode;
    this.passkey = passkey;
    this.accountReference = accountReference;
    this.transactionDesc = transactionDesc;
    this.partyA = partyA;
    this.b2cSecurityCredential = b2cSecurityCredential;
    this.initiatorName = initiatorName;
    this.environment =
      environment === "live"
        ? "https://api.safaricom.co.ke"
        : "https://sandbox.safaricom.co.ke";
    this.transactionType = transactionType;
  }

  //stkpush method for directly initiating a pop to the specified phonenumber with the amount to payed
  //accesstoken

  async AccessToken() {
    return await generateAccessToken(
      this.consumerKey,
      this.consumerSecret,
      this.environment
    );
  }

  public async stkPush({
    amount,
    phoneNumber,
    callbackUrl,
  }: TStkPush): Promise<any> {
    const accessToken = await this.AccessToken();
    return await MpesaExpress(
      amount,
      phoneNumber,
      callbackUrl,
      this.businessShortCode,
      this.passkey,
      accessToken,
      this.environment,
      this.accountReference,
      this.transactionDesc,
      this.transactionType
    );
  }

  public async stkPushQuery(CheckoutRequestID: string): Promise<any> {
    const accessToken = await this.AccessToken();
    return await StkPushQuery(
      this.businessShortCode,
      this.passkey,
      accessToken,
      this.environment,
      CheckoutRequestID
    );
  }

  public async transactionStatus({
    transactionId,
    callbackUrl,
  }: TTransactionStatus): Promise<any> {
    const accessToken = await this.AccessToken();
    return await checkTransactionStatus(
      transactionId,
      callbackUrl,
      this.initiatorName,
      accessToken,
      this.b2cSecurityCredential,
      this.partyA,
      this.environment
    );
  }

  public async business2Customer({
    PaymentAmount,
    receiversPhonenumber,
    remarks,
    callbackUrl,
  }: TB2C): Promise<any> {
    const accessToken = await this.AccessToken();
    return await B2C(
      PaymentAmount,
      receiversPhonenumber,
      remarks,
      this.b2cSecurityCredential,
      callbackUrl,
      this.initiatorName,
      this.partyA,
      accessToken,
      this.environment
    );
  }
  public async accountBalance(callbackUrl: string): Promise<any> {
    const accessToken = await this.AccessToken();
    return await getAccountBalance(
      this.partyA,
      callbackUrl,
      this.initiatorName,
      this.b2cSecurityCredential,
      accessToken,
      this.environment
    );
  }
}

export default MpesaPay;
export { MpesaPay };
