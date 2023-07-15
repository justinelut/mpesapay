interface CallbackMetadataItem {
  Name: string;
  Value: string;
}

interface Body {
  stkCallback: {
    ResultCode: number;
    CallbackMetadata: {
      Item: CallbackMetadataItem[];
    };
  };
}

interface Data {
  Body: Body;
}

interface PaymentInfo {
  Amount: string;
  MpesaReceiptNumber: string;
  TransactionDate: string;
  PhoneNumber: string;
}

interface PaymentResult {
  status: 'canceled' | 'failed' | 'success';
  data?: PaymentInfo;
  message?: string;
  resultCode?: number;
}

export default function FormatPaymentData(data: Data): PaymentResult {
  function extractData(data: Data): PaymentInfo {
    const { Amount, MpesaReceiptNumber, TransactionDate, PhoneNumber } =
      data.Body.stkCallback.CallbackMetadata.Item.reduce((acc, item) => {
        acc[item.Name as keyof PaymentInfo] = item.Value;
        return acc;
      }, {} as PaymentInfo);

    return { Amount, MpesaReceiptNumber, TransactionDate, PhoneNumber };
  }

  const resultscode = data.Body.stkCallback.ResultCode;

  if (data && resultscode === 0) {
    const paymentinfo = extractData(data);
    return {
      status: 'success',
      message: 'Transaction processed succesfully',
      data: {
        Amount: paymentinfo.Amount,
        MpesaReceiptNumber: paymentinfo.MpesaReceiptNumber,
        PhoneNumber: paymentinfo.PhoneNumber,
        TransactionDate: paymentinfo.TransactionDate,
      },
      resultCode: resultscode,
    };
  } else {
    if (data && resultscode === 17) {
      return {
        status: 'failed',
        message: 'Unable to process the transaction',
        resultCode: resultscode,
      };
    } else {
      return {
        status: 'canceled',
        message: 'Transaction was cancelled by the user',
        resultCode: resultscode,
      };
    }
  }
}
