import FormatBusinessToCustomer, { BusinessToCustomerResponse, PaymentResult } from "../../helpers/FormatBusinessToCustomer"

describe('FormatBusinessToCustomer', () => {
  const mockData: BusinessToCustomerResponse = {
    Result: {
      ResultType: 1,
      ResultCode: 0,
      ResultDesc: 'Success',
      OriginatorConversationID: 'abc123',
      ConversationID: 'def456',
      TransactionID: 'ghi789',
      ResultParameters: {
        ResultParameter: [
          { Key: 'TransactionAmount', Value: 100 },
          { Key: 'TransactionReceipt', Value: 'receipt123' },
          { Key: 'ReceiverPartyPublicName', Value: 'John Doe' },
          { Key: 'TransactionCompletedDateTime', Value: '2023-07-15T10:30:00' },
          { Key: 'B2CUtilityAccountAvailableFunds', Value: 500 },
          { Key: 'B2CWorkingAccountAvailableFunds', Value: 200 },
          { Key: 'B2CRecipientIsRegisteredCustomer', Value: 'Yes' },
          { Key: 'B2CChargesPaidAccountAvailableFunds', Value: 100 },
        ],
      },
      ReferenceData: {
        ReferenceItem: {
          Key: 'refKey',
          Value: 'refValue',
        },
      },
    },
  };

  it('should format business-to-customer response correctly', () => {
    const expectedOutput: PaymentResult = {
      status: 'success',
      resultCode: 0,
      data: {
        TransactionAmount: '100',
        TransactionReceipt: 'receipt123',
        ReceiverPartyPublicName: 'John Doe',
        TransactionCompletedDateTime: '2023-07-15T10:30:00',
        B2CUtilityAccountAvailableFunds: '500',
        B2CWorkingAccountAvailableFunds: '200',
        B2CRecipientIsRegisteredCustomer: 'Yes',
        B2CChargesPaidAccountAvailableFunds: '100',
      },
    };

    const formattedResponse: PaymentResult = FormatBusinessToCustomer(mockData);
    expect(formattedResponse).toEqual(expectedOutput);
  });

  it('should handle failed business-to-customer response', () => {
    const mockDataFailed: BusinessToCustomerResponse = {
      Result: {
        ResultType: 1,
        ResultCode: 1,
        ResultDesc: 'Failed',
        OriginatorConversationID: 'abc123',
        ConversationID: 'def456',
        TransactionID: 'ghi789',
        ResultParameters: {
          ResultParameter: [],
        },
        ReferenceData: {
          ReferenceItem: {
            Key: 'refKey',
            Value: 'refValue',
          },
        },
      },
    };

    const expectedOutputFailed: PaymentResult = {
      status: 'failed',
      resultCode: 1,
    };

    const formattedResponseFailed: PaymentResult =
      FormatBusinessToCustomer(mockDataFailed);
    expect(formattedResponseFailed).toEqual(expectedOutputFailed);
  });
});
