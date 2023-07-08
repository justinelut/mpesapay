export const timeStamp = new Date()
  .toISOString()
  .replace(/[^0-9]/g, '')
  .slice(0, -3);
