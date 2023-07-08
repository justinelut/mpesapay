export function initMpesaBusiness2CustomerRequestBody(
  amount: number,
  partyB: number,
  remarks: string,
  b2cSecurityCredential: string,
  callbackUrl: string,
  initiator: string,
  partyA: string
): Record<string, string | number> {
  return {
    InitiatorName: initiator,
    SecurityCredential: b2cSecurityCredential,
    CommandID: 'BusinessPayment',
    Amount: amount,
    PartyA: parseInt(partyA),
    PartyB: partyB,
    Remarks: remarks,
    QueueTimeOutURL: callbackUrl,
    ResultURL: callbackUrl,
    Occassion: remarks,
  };
}


