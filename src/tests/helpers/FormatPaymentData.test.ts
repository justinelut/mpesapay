import FormatPaymentData, {
  Data,
  PaymentResult,
} from '../../helpers/FormatPaymentData';

describe('FormatPaymentData', () => {
  const mockDataSuccess: Data = {
    Body: {
      stkCallback: {
        ResultCode: 0,
        CallbackMetadata: {
          Item: [
            { Name: 'Amount', Value: '100' },
            { Name: 'MpesaReceiptNumber', Value: 'receipt123' },
            { Name: 'TransactionDate', Value: '2023-07-15' },
            { Name: 'PhoneNumber', Value: '1234567890' },
          ],
        },
      },
    },
  };

  const mockDataFailure: Data = {
    Body: {
      stkCallback: {
        ResultCode: 17,
        CallbackMetadata: {
          Item: [],
        },
      },
    },
  };

  const mockDataCancelled: Data = {
    Body: {
      stkCallback: {
        ResultCode: 1,
        CallbackMetadata: {
          Item: [],
        },
      },
    },
  };

  it('should format successful payment data', () => {
    const expectedOutput: PaymentResult = {
      status: 'success',
      message: 'Transaction processed successfully',
      data: {
        Amount: '100',
        MpesaReceiptNumber: 'receipt123',
        TransactionDate: '2023-07-15',
        PhoneNumber: '1234567890',
      },
      resultCode: 0,
    };

    const formattedData: PaymentResult = FormatPaymentData(mockDataSuccess);
    expect(formattedData).toEqual(expectedOutput);
  });

  it('should format failed payment data', () => {
    const expectedOutput: PaymentResult = {
      status: 'failed',
      message: 'Unable to process the transaction',
      resultCode: 17,
    };

    const formattedData: PaymentResult = FormatPaymentData(mockDataFailure);
    expect(formattedData).toEqual(expectedOutput);
  });

  it('should format cancelled payment data', () => {
    const expectedOutput: PaymentResult = {
      status: 'canceled',
      message: 'Transaction was canceled by the user',
      resultCode: 1,
    };

    const formattedData: PaymentResult = FormatPaymentData(mockDataCancelled);
    expect(formattedData).toEqual(expectedOutput);
  });
});
