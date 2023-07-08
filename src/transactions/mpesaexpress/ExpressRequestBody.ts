export function initMpesaExpressRequestBody(
  amount: string,
  phoneNumber: string,
  callbackUrl: string,
  timeStamp: string,
  password: string,
  businessShortCode: string,
  accountReference: string,
  transactionDesc: string
): Record<string, string> {
  return {
    BusinessShortCode: businessShortCode,
    Password: password,
    Timestamp: timeStamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: businessShortCode,
    PhoneNumber: phoneNumber,
    CallBackURL: callbackUrl,
    AccountReference: accountReference,
    TransactionDesc: transactionDesc,
  };
}
