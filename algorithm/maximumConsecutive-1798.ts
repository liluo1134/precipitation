// https://leetcode.cn/problems/maximum-number-of-consecutive-values-you-can-make/

/**
 * 假设构造[0,x]，新增整数y，则能构造[y, x+y]
 * 若 y <= x+1，则能构造[0, x + y]
 */

function getMaximumConsecutive(coins: number[]): number {
  let result = 1;

  coins.sort((a, b) => a - b)
  for (let i = 0; i < coins.length; i++) {
    if (coins[i] > result) {
      break;
    }

    result += coins[i];
  }

  return result;
};