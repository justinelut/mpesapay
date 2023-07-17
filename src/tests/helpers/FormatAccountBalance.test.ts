import FormatAccountBalance from "../../helpers/FormatAccountBalance";

describe('FormatAccountBalance', () => {
  const accountBalanceData = {
    Result: {
      ResultType: 1,
      ResultCode: 200,
      ResultDesc: 'Success',
      ResultParameters: {
        ResultParameter: [
          {
            Key: 'AccountBalance',
            Value: 'Account1|USD|100|80|10|10&Account2|EUR|200|150|20|30',
          },
        ],
      },
    },
  };

  it('should format account balances correctly', () => {
    const expectedOutput = {
      resultCode: 200,
      status: 'success',
      accountBalances: [
        {
          accountName: 'Account1',
          currency: 'USD',
          balance: '100',
          availableBalance: '80',
          reservedAmount: '10',
          unClearedBalance: '10',
        },
        {
          accountName: 'Account2',
          currency: 'EUR',
          balance: '200',
          availableBalance: '150',
          reservedAmount: '20',
          unClearedBalance: '30',
        },
      ],
    };

    const formattedAccountBalance = FormatAccountBalance(accountBalanceData);
    expect(formattedAccountBalance).toEqual(expectedOutput);
  });

  it('should handle missing account balance data', () => {
    const accountBalanceDataWithoutResultParameter = {
      Result: {
        ResultType: 1,
        ResultCode: 200,
        ResultDesc: 'Success',
        ResultParameters: {
          ResultParameter: [],
        },
      },
    };

    const expectedOutput = {
      resultCode: 200,
      status: 'failed',
      accountBalances: [],
    };

    const formattedAccountBalance = FormatAccountBalance(
      accountBalanceDataWithoutResultParameter
    );
    expect(formattedAccountBalance).toEqual(expectedOutput);
  });
});
