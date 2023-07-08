import axios, { AxiosResponse } from 'axios';
import Config from '../../utils/Config';
import initAccountBalanceRequestBody from './balanceRequestBody';

//check the total transacted amount for your paybill or till number

export default async function getAccountBalance(
  partyA: string,
  callbackUrl: string,
  initiatorName: string,
  b2cSecurityCredential: string,
  accessToken: string,
  environment: string
): Promise<any> {
  const requestBody = initAccountBalanceRequestBody(
    partyA,
    callbackUrl,
    initiatorName,
    b2cSecurityCredential
  );

  try {
    const response: AxiosResponse<any> = await axios.post(
      `${environment}/mpesa/accountbalance/v1/query`,
      requestBody,
      await Config(accessToken)
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
