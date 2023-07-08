import axios, { AxiosResponse } from 'axios';
import { initMpesaBusiness2CustomerRequestBody } from './B2cRequestBody';
import Config from '../../utils/Config';

export default async function B2C(
  amount: number,
  partyB: number,
  remarks: string,
  b2cSecurityCredential: string,
  callbackUrl: string,
  initiator: string,
  partyA: string,
  accessToken: string,
  environment: string
): Promise<any> {
  const requestBody = initMpesaBusiness2CustomerRequestBody(
    amount,
    partyB,
    remarks,
    b2cSecurityCredential,
    callbackUrl,
    initiator,
    partyA
  );

  try {
    const response: AxiosResponse<any> = await axios.post(
      `${environment}/mpesa/b2c/v1/paymentrequest`,
      requestBody,
      await Config(accessToken)
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
