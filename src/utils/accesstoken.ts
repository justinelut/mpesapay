import axios, { AxiosResponse } from 'axios';

export default async function generateAccessToken(
  consumerKey: string,
  consumerSecret: string,
  environment: string
): Promise<string | null> {
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64'
  );
  const config = {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  };

  try {
    const response: AxiosResponse<any> = await axios.get(
      `${environment}/oauth/v1/generate?grant_type=client_credentials`,
      config
    );
    return response.data.access_token;
  } catch (error) {
    return null;
  }
}

