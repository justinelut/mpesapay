import { timeStamp } from '../../utils/timestamp';
import axios, { AxiosResponse } from 'axios';
import { initMpesaExpressRequestBody } from './ExpressRequestBody';
import Config from '../../utils/Config';
import generatePassword from '../../utils/Password';

export default async function MpesaExpress(
  amount: string,
  phoneNumber: string,
  callbackUrl: string,
  businessShortCode: string,
  passkey: string,
  accessToken: string,
  environment: string,
  accountReference: string,
  transactionDesc: string,
  transactionType: string
): Promise<any> {
  const password = generatePassword(businessShortCode, passkey);
  const requestBody = initMpesaExpressRequestBody(
    amount,
    phoneNumber,
    callbackUrl,
    timeStamp,
    password,
    businessShortCode,
    accountReference,
    transactionDesc,
    transactionType
  );

  try {
    const response: AxiosResponse<any> = await axios.post(
      `${environment}/mpesa/stkpush/v1/processrequest`,
      requestBody,
      await Config(accessToken)
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
