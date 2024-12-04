// https://www.structy.net/problems/min-change

/**
 * Write a function minChange that takes in an amount and an array of
 * coins. The function should return the minimum number of coins
 * required to create the amount. You may use each coin as many times as
 * necessary.
 *
 * If it is not possible to create the amount, then return -1.
 *
 * ```js
 * minChange(102, [1, 5, 10, 25]); // -> 6
 * ```
 */
const minChange = (amount, coins) => {
  const answer = _minChange(amount, coins, {});
  return answer === Infinity ? -1 : answer;
};

const _minChange = (amount, coins, memo) => {
  if (amount in memo) return memo[amount];
  if (amount === 0) return 0;
  if (amount < 0) return Infinity;

  let minCoins = Infinity;
  for (const coin of coins) {
    const numCoins = 1 + _minChange(amount - coin, coins, memo);
    minCoins = Math.min(minCoins, numCoins);
  }

  memo[amount] = minCoins;
  return minCoins;
};

module.exports = {
  minChange,
};

// Again this is the given answer. Dynamic programming is hard.
