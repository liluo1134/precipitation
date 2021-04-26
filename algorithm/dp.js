/**
 * 暴力的递归解法 -> 带备忘录的递归解法 -> 动态规划
 * 找到最小子问题 -> 能否推出状态转移方程
 */

/**
 * 1、爬楼梯
 */
 function climbStairs(n: number): number {
  if (n === 1) return 1

  /**
   * 正常解法：用数组存储之前的值
   */
  const dp = []
  dp[0] = 0
  dp[1] = 1
  dp[2] = 2

  for(let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]

  /**
   * 找到状态方程
   * f(n) = f(n - 1) + f(n - 2)
   * 最后只能走 1 阶 / 2阶
   * 
   * 当前的状态只与前面两个状态有关，因此只需要存储前两个的状态即可
   */

  let prev = 0 // i = 0
  let cur = 1 // i = 1
  for (let i = 1; i <= n; i++) {
    const sum = prev + cur
    prev = cur
    cur = sum
  }

  return cur

}

/**
 * 给定一个整数数组nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和
 */

 function maxSubArray(nums: number[]): number {
  if (nums.length < 2) return nums[0]

  // let sum = 0
  // let max = Number.MIN_SAFE_INTEGER

  /**
   * 暴力法：每一种可能列举计算一遍
   * 时间复杂度是 O(n3)
   */
  // for (let i = 0; i < nums.length; i++) { // 左边下标
  //     for (let j = i; j < nums.length; j++) { // 右边下标
  //         sum = 0

  //         for (let k = i; k <= j; k++) {
  //             sum += nums[k]
  //         }

  //         if (sum > max) max = sum
  //     }
  // }

  /**
   * 优化：每一种计算的时候，后面可以直接利用前面计算出来的值
   */
  // for (let i = 0; i < nums.length; i++) {
  //     sum = 0
  //     for (let j = i; j < nums.length; j++) {
  //         sum += nums[j]
  //         if (sum > max) max = sum
  //     }
  // }
  // return max === Number.MIN_VALUE ? -1 : max

  /**
   * 找到状态方程：由 i-1 结尾加上当前值，要么是当前值，即 max(sum[i-1] + nums[i], nums[i])
   */

  let sum = nums[0]
  let curSum = nums[0]
  for (let i = 1; i < nums.length; i++) {
      if (curSum > 0) curSum += nums[i]
      else curSum = nums[i]

      if (sum < curSum) sum = curSum
  }
  return sum
}

/**
 * 买卖股票的最佳时机（简单）
 * 给定一个数组prices，它的第 i个元素 prices[i]表示一支给定股票第i天的价格。
 */

 function maxProfit(prices: number[]): number {
  if (prices.length === 1) return 0

  /**
   * 题意：找出数组中差值最大的一对元素，且后面的元素要大于前面的元素（后 - 前 即可）
   */

  // let max = 0
  // for (let i = 0; i < prices.length; i++) {
  //     for (let j = i + 1; j < prices.length; j++) {
  //         const minus = prices[j] - prices[i]

  //         if (minus > max) max = minus
  //     }
  // }
  // return max

  /**
   * 暴力法会超出时间限制
   * 优化：
   * 1、若当前差值为负数，说明后面的数值更小, 所以为最小值
   * 2、若当前差值为正数，减去保存的最小数值，判断是否比保存的最大差值大
   * 一次遍历找到历史最低点
   */
  let cur = prices[0]
  let max = 0
  for (let i = 1; i < prices.length; i++) {
      if (prices[i] < cur) {
          cur = prices[i]
      } else {
          max = max < prices[i] - cur ? prices[i] - cur : max
      }
  }
  return max
}
