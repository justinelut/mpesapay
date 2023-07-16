export function initMpesaExpressRequestBody(
  amount: string,
  phoneNumber: string,
  callbackUrl: string,
  timeStamp: string,
  password: string,
  businessShortCode: string,
  accountReference: string,
  transactionDesc: string,
  transactionType:string,
): Record<string, string> {

  const TrnsType = transactionType === "paybill" ? "CustomerPayBillOnline" : "CustomerBuyGoodsOnline";
  
  return {
    BusinessShortCode: businessShortCode,
    Password: password,
    Timestamp: timeStamp,
    TransactionType: TrnsType,
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: businessShortCode,
    PhoneNumber: phoneNumber,
    CallBackURL: callbackUrl,
    AccountReference: accountReference,
    TransactionDesc: transactionDesc,
  };
}
