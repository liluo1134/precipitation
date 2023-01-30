// function isEqualSumOfNums(nums: number[]): boolean {
//   let oddSum = 0;
//   let evenSum = 0;

//   nums.forEach((num, index) => {
//     if (index % 2 === 0) {
//       evenSum += num;
//     } else {
//       oddSum += num;
//     }
//   });
//   return oddSum === evenSum;
// }

// function waysToMakeFair(nums: number[]): number {
//   if (nums.length === 2) {
//     return 1;
//   }

//   if (nums.length === 2) {
//     return 0;
//   }

//   let result = false;
//   let equalNums = [];

//   nums.forEach((num, index) => {
//     const newNums = nums.slice();
//     newNums.splice(index, 1);
//     const isEqual = isEqualSumOfNums(newNums);
//     if (!isEqual) {
//       result = true;
//     } else {
//       equalNums.push(num);
//     }

//     if (result) {
//       return;
//     }
//   });

//   if (equalNums.length === nums.length) return nums.length;

//   return equalNums.length;
// }

// https://leetcode.cn/problems/ways-to-make-a-fair-array/
/**
 * 
 * @param nums 
 * @returns 
 * 动态规划思想
 */

function waysToMakeFair(nums: number[]): number {
  if (nums.length === 2) {
    return 1;
  }

  if (nums.length === 2) {
    return 0;
  }

  let rightOddSum = 0;
  let rightEvenSum = 0;

  nums.forEach((num, index) => {
    if (index % 2 === 0) {
      rightEvenSum += num;
    } else {
      rightOddSum += num;
    }
  });

  let result = 0;
  let leftOddSum = 0;
  let leftEvenSum = 0;
  nums.forEach((num, index) => {
    if (index % 2 === 0) {
      rightEvenSum = rightEvenSum - num;
      leftOddSum += index === 0 ? 0 : nums[index - 1];
    } else {
      rightOddSum = rightOddSum - num;
      leftEvenSum += index === 0 ? 0 : nums[index - 1];
    }

    if (leftOddSum + rightEvenSum === leftEvenSum + rightOddSum) result++;
  });

  return result;
}