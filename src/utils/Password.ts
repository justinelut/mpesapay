import { timeStamp } from "./timestamp";

export default function generatePassword(businessShortCode: string, passKey: string): string {
  return Buffer.from(`${businessShortCode}${passKey}${timeStamp}`).toString(
    'base64'
  );
}
