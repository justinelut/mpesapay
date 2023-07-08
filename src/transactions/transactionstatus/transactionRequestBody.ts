export default function initTransactionStatusRequestBody(
  transactionId: string,
  b2cSecurityCredential: string,
  callbackUrl: string,
  initiator: string,
  partyA: string
): Record<string, any> {
  return {
    Initiator: initiator,
    SecurityCredential: b2cSecurityCredential,
    CommandID: 'TransactionStatusQuery',
    TransactionID: transactionId,
    PartyA: partyA,
    IdentifierType: '4',
    ResultURL: callbackUrl,
    QueueTimeOutURL: callbackUrl,
    Remarks: 'done',
    Occasion: 'OK',
  };
}
