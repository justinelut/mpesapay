import axios, { AxiosResponse } from 'axios';
import Config from '../../utils/Config';
import initTransactionStatusRequestBody from './transactionRequestBody';

//public method for checking status of the initiated stkpush, #payed, #canceled, # successfull

export default async function checkTransactionStatus(
  transactionId: string,
  callbackUrl: string,
  initiator: string,
  accessToken: string,
  b2cSecurityCredential: string,
  partyA: string,
  environment: string
): Promise<any> {
  const requestBody = initTransactionStatusRequestBody(
    transactionId,
    b2cSecurityCredential,
    callbackUrl,
    initiator,
    partyA
  );

  try {
    const response: AxiosResponse<any> = await axios.post(
      `${environment}/mpesa/transactionstatus/v1/query`,
      requestBody,
      await Config(accessToken)
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
