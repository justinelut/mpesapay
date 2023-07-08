interface ResultParameter {
  Key: string;
  Value: string;
}

interface ResultParameters {
  ResultParameter: ResultParameter[];
}

interface Result {
  ResultType: number;
  ResultCode: number;
  ResultDesc: string;
  ResultParameters: ResultParameters;
}

interface AccountBalanceData {
  Result: Result;
}

interface AccountBalance {
  accountName: string;
  currency: string;
  balance: string;
  availableBalance: string;
  reservedAmount: string;
  unClearedBalance: string;
}

interface AccountBalanceResult {
  resultCode: number;
  status: 'failed' | 'success';
  accountBalances: AccountBalance[];
}

export default function FormatAccountBalance(
  data: AccountBalanceData
): AccountBalanceResult {
  const accountBalanceResult =
    data.Result.ResultParameters.ResultParameter.find(
      (param) => param.Key === 'AccountBalance'
    );

  if (!accountBalanceResult) {
    return {
      resultCode: data.Result.ResultCode,
      status: 'failed',
      accountBalances: [],
    };
  }

  const accountBalanceString = accountBalanceResult.Value;
  const accountBalanceItems = accountBalanceString.split('&');

  const formattedAccountBalances: AccountBalance[] = accountBalanceItems.map(
    (item) => {
      const [
        accountName,
        currency,
        balance,
        availableBalance,
        reservedAmount,
        unClearedBalance,
      ] = item.split('|');

      return {
        accountName,
        currency,
        balance,
        availableBalance,
        reservedAmount,
        unClearedBalance,
      };
    }
  );

  return {
    resultCode: data.Result.ResultCode,
    status: 'success',
    accountBalances: formattedAccountBalances,
  };
}
