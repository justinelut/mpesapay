import { timeStamp } from '../../utils/timestamp';
import axios, { AxiosResponse } from 'axios';
import { initStkPushQueryRequestBody } from "./stkPushQueryBody";
import Config from '../../utils/Config';
import generatePassword from '../../utils/Password';

export default async function StkPushQuery(
  businessShortCode: string,
  passkey: string,
  accessToken: string,
  environment: string,
  CheckoutRequestID: string,
): Promise<any> {
  const password = generatePassword(businessShortCode, passkey);
  const requestBody = initStkPushQueryRequestBody(
    businessShortCode,
    password,
    timeStamp,
    CheckoutRequestID
  );
  try {
    const response: AxiosResponse<any> = await axios.post(
      `${environment}/mpesa/stkpushquery/v1/query`,
      requestBody,
      await Config(accessToken)
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
