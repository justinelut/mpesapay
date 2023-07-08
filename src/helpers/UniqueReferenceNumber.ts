const usedReferenceNumbers: Set<string> = new Set();

export default function generateUniqueReferenceNumber(prefix: string, length: number): string {
  let referenceNumber: string;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  do {
    referenceNumber = `${prefix}-`;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      const randomChar = characters.charAt(randomIndex);
      referenceNumber += randomChar;
    }
  } while (usedReferenceNumbers.has(referenceNumber));
  usedReferenceNumbers.add(referenceNumber);
  return referenceNumber;
}

