interface ResultParameter {
  Key: string;
  Value: string | number;
}

interface ResultParameters {
  ResultParameter: ResultParameter[];
}

interface ReferenceItem {
  Key: string;
  Value: string;
}

interface ReferenceData {
  ReferenceItem: ReferenceItem;
}

export interface Result {
  ResultType: number;
  ResultCode: number;
  ResultDesc: string;
  OriginatorConversationID: string;
  ConversationID: string;
  TransactionID: string;
  ResultParameters: ResultParameters;
  ReferenceData: ReferenceData;
}

export interface BusinessToCustomerResponse {
  Result: Result;
}

export interface TransactionDetails {
  TransactionAmount: string | number;
  TransactionReceipt: string;
  ReceiverPartyPublicName: string;
  TransactionCompletedDateTime: string;
  B2CUtilityAccountAvailableFunds: string | number;
  B2CWorkingAccountAvailableFunds: string | number;
  B2CRecipientIsRegisteredCustomer: string;
  B2CChargesPaidAccountAvailableFunds: string | number;
}


export interface PaymentResult {
  status: 'success' | 'failed';
  resultCode: number;
  data?: TransactionDetails;
}

export default function FormatBusinessToCustomer(
  data: BusinessToCustomerResponse
): PaymentResult {
  const resultParameters = data.Result.ResultParameters.ResultParameter;

  const keyMapping: { [key: string]: keyof TransactionDetails } = {
    TransactionAmount: 'TransactionAmount',
    TransactionReceipt: 'TransactionReceipt',
    ReceiverPartyPublicName: 'ReceiverPartyPublicName',
    TransactionCompletedDateTime: 'TransactionCompletedDateTime',
    B2CUtilityAccountAvailableFunds: 'B2CUtilityAccountAvailableFunds',
    B2CWorkingAccountAvailableFunds: 'B2CWorkingAccountAvailableFunds',
    B2CRecipientIsRegisteredCustomer: 'B2CRecipientIsRegisteredCustomer',
    B2CChargesPaidAccountAvailableFunds: 'B2CChargesPaidAccountAvailableFunds',
  };

  const transactionDetails: TransactionDetails = {
    TransactionAmount: 0,
    TransactionReceipt: '',
    ReceiverPartyPublicName: '',
    TransactionCompletedDateTime: '',
    B2CUtilityAccountAvailableFunds: 0,
    B2CWorkingAccountAvailableFunds: 0,
    B2CRecipientIsRegisteredCustomer: '',
    B2CChargesPaidAccountAvailableFunds: 0,
  };

  resultParameters.forEach(({ Key, Value }) => {
    const propertyKey = keyMapping[Key] as keyof TransactionDetails & string;
    if (propertyKey && typeof Value === 'number') {
      transactionDetails[propertyKey] = Value.toString();
    } else if (propertyKey) {
      transactionDetails[propertyKey] = Value.toString();
    }
  });


  if (data.Result.ResultCode === 0) {
    return {
      status: 'success',
      resultCode: data.Result.ResultCode,
      data: transactionDetails,
    };
  } else {
    return {
      status: 'failed',
      resultCode: data.Result.ResultCode,
    };
  }
}
