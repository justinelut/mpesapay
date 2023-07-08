export default function initAccountBalanceRequestBody(
  partyA: string,
  callbackUrl: string,
  initiator: string,
  b2cSecurityCredential: string
): Record<string, any> {
  return {
    Initiator: initiator,
    SecurityCredential: b2cSecurityCredential,
    CommandID: 'AccountBalance',
    PartyA: partyA,
    IdentifierType: 4,
    Remarks: 'done',
    QueueTimeOutURL: callbackUrl,
    ResultURL: callbackUrl,
  };
}


