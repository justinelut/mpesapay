export function initStkPushQueryRequestBody(
    businessShortCode: string,
    password: string,
    timeStamp: string,
    CheckoutRequestID : string,
  ): Record<string, string> {
    return {
        BusinessShortCode: businessShortCode,
        Password: password,
        Timestamp: timeStamp,
        CheckoutRequestID: CheckoutRequestID,
    };
  }
  
