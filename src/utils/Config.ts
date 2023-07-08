export default async function Config(accessToken: string): Promise<any> {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };
  return config;
}
