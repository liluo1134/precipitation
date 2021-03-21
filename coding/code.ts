/** 判断字符是否有效, {}, [], ()的有效匹配判断 */
function isValid(s: string): boolean {
  const left = { '{': '}', '[': ']', '(': ')' }
  const right = { '}': 1, ']': 1, ')': 1 }
  const res = []

  for (let i = 0; i < s.length; i++) {
    if (left[s[i]]) {
      res.push(s[i])
    }

    if (right[s[i]] && left[res.pop()] !== s[i]) {
      return false
    }
  }

  if (res.length) return false

  return true
}

/** 排序算法
 * 1、冒泡排序 -- 例子为升序排序
 * 双层遍历，两两进行比较
 * 时间复杂度：O(n2)
 * 空间复杂度：
 */
function bubbleSort(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        const temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
      }
    }
  }
}

const nums = [3, 4, 2, 1, 9]
bubbleSort(nums)
console.log('bubble', nums)

/** 
 * 2、快速排序
 * 确定一个基准值
 * 通过将待排序元素进行分块,比基准值大的在右边,小的在左边, 一趟排序后确定基准值最终位置，
 * 重复操作，直到所有元素都是有序的
 */
function quickSort(_low: number, _high: number, nums: number[]) {
  const swap = (i: number, j: number, arr: number[]) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

  if (_low >= _high) {
    return
  }

  const base = nums[_low]
  let low = _low
  let high = _high

  while (low < high) {
    // 右侧先走, 这里用while，因为若是满足条件直接一直往前直到不满足
    while (nums[high] >= base && low < high) {
      high--
    }

    // low从左往右找
    while (nums[low] <= base && low < high) {
      low++
    }

    // 否则的话两边交换位置
    swap(low, high, nums)
  }

  // 确定基准值位置在high处
  swap(_low, high, nums)
  quickSort(_low, high - 1, nums)
  quickSort(high + 1, _high, nums)
}

function quickSort2(nums: number[]) {
  if (nums.length <= 1) return nums

  const left = []
  const right = []
  const base = nums.shift()

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < base) {
      left.push(nums[i])
    } else {
      right.push(nums[i])
    }
  }

  return quickSort2(left).concat(base, quickSort2(right))
}

const quickNums = [3, 4, 2, 1, 9]
// quickSort(0, quickNums.length - 1, quickNums)
console.log('quick', quickSort2(quickNums))

/**
 * 3、插入排序
 * 第i个插入的元素进行操作时，已插入的形成有序数组。
 * 每次取出第i个元素，将其插入到合适的位置
 */

function insertSort(nums: number[]) {
  for (let i = 1; i < nums.length; i++) {
    let j = i - 1

    // 需要往前查找合适的位置进行插入
    if (nums[i] < nums[j]) {
      const temp = nums[i]
      while (j >= 0 && temp < nums[j]) {
        // 初始这里nums[i]也会被重新赋值
        nums[j + 1] = nums[j]
        j--
      }
      nums[j + 1] = temp
    }
  }
  return nums
}

const insertNums = [3, 4, 2, 1, 9]
console.log('insert', insertSort(insertNums))

/**
 * 4、希尔排序 -- 缩小增量排序
 * 也是插入排序，比插入排序更高效
*/

function hillSort(nums: number[]) {
  const len = nums.length

  // 外层循环求每一次增量
  for (let gap = parseInt(`${len / 2}`); gap >= 1; gap = parseInt(`${gap / 2}`)) {
    // 直接从后面开始，与前面的进行比较
    for (let i = gap; i < len; i++) {
      // 后面比前面小, 进行插入排序
      if (nums[i] < nums[i - gap]) {
        const temp = nums[i]
        let j = i - gap
        while (j >= 0 && nums[j] > temp) {
          nums[j + gap] = nums[j]
          j -= gap
        }
        nums[j + gap] = temp
      }
    }
  }

  return nums
}

const hillNums = [3, 4, 2, 1, 9]
console.log('hill', hillSort(hillNums))

/**
 * 5、选择排序
 * 每一次从待排序数组中找到一个最小值，放在数组的起始位置，直到最后一个元素
 */

function selectSort(nums: number[]) {
  for (let i = 0; i < nums.length - 1; i++) {
    let min = i
    for (let j = i; j < nums.length; j++) {
      if (nums[j] < nums[min]) {
        min = j
      }
    }

    // 里面的循环可以替换成 如下
    // const min = nums.indexOf(Math.min(...nums.slice(i)))
    if (min !== i) {
      const temp = nums[i]
      nums[i] = nums[min]
      nums[min] = temp
    }
  }

  return nums
}

const selectNums = [3, 4, 2, 1, 9]
console.log('select', selectSort(selectNums))

/**
 * 6、堆排序
 * -- 将待排序序列构造成一个大顶堆，从最后第一个非叶子结点往上开始，根结点就为最大值，将其与末尾元素交换
 * 剩余元素按照此操作不断重复，得到一个有序序列
 * 时间复杂度：O(nlogn) -- 最好/最坏/平均复杂度
 * 不稳定排序
 * 
 * 堆相关知识（完全二叉树）
 * 大顶堆 -- 每个结点的值都大于或等于其左右孩子结点的值 -- arr[i] >= arr[2i + 1] && arr[i] >= arr[2i + 2]
 * 小顶堆 -- 每个结点的值都小于或等于其左右孩子结点的值 -- arr[i] <= arr[2i + 1] && arr[i] <= arr[2i + 2]
 */

function adjustHeap(heap: number[], head: number, heapSize: number) {
  // head为当前结点的下标, 取出当前元素
  let temp = heap[head]
  let child = head * 2 + 1

  // 从当前结点的左结点开始，也就是 2 * head + 1
  while (child < heapSize) {
    // （为了找最大值，所以这里需要判断下指向）如果左子结点 < 右子结点，指向右子结点
    if (child + 1 < heapSize && heap[child] < heap[child + 1]) {
      child++
    }

    // 如果子结点 > 父结点，将子结点赋值给父结点，不用交换
    if (temp < heap[child]) {
      heap[head] = heap[child]
      head = child
      child = head * 2 + 1
    } else {
      break
    }

    // 过程中不断得更新结点，最后就是当前结点的位置
    heap[head] = temp
  }
}

function buildHeap(nums: number[]) {
  // 从第一个非叶子结点开始
  for (let i = parseInt(`${nums.length / 2}`) - 1; i >= 0; i--) {
    adjustHeap(nums, i, nums.length)
  }
}

function heapSort(nums: number[]) {
  // 构造一个大顶堆
  buildHeap(nums)

  // 将最后一个值与根结点交换，继续调整堆
  for (let i = nums.length - 1; i >= 0; i--) {
    // 将第一个与末尾元素进行交换
    const temp = nums[i]
    nums[i] = nums[0]
    nums[0] = temp

    // 继续调整堆
    adjustHeap(nums, 0, i)
  }
  return nums
}

const heapNums = [3, 4, 2, 1, 9]
console.log('heap', heapSort(heapNums))


/**
 * 7、归并排序
 *
 */

