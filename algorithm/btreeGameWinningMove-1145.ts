// https://leetcode.cn/problems/binary-tree-coloring-game/

/**
  * 因此，通过分析，我们直到以下三种选择能够最大程度地阻断对方可染色的范围，从而使自己占据最多的可染色范围：
  *      选择x的左子节点；（左子树节点全归自己）
  *      选择x的右子节点；（右子树节点全归自己）
  *      选择x的父节点。 （父节点所在连通分量全归自己）
  *
  * 因此只要三个区域有一个区域的节点数 > n/2 ，那么二号玩家选择此区域代表节点（x的左、右、父节点）作为y，即可取胜
  *
  * 因此我们通过 dfs 得到 整棵树全部节点数 m，找到 节点 x，计算 x左右子树节点数 l、r，
  * 只要 l > 2/n, r > 2/n, m-l-r-1 > n/2 三个条件成立一个，二号玩家即可取胜。
  *
 */

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
      
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
}

// 寻找值为x的节点
function findX(root: TreeNode, x: number): TreeNode {
  // 节点为空 || 找到
  if (root === null || root.val === x) {
    return root
  }

  // 左子树寻找
  const node: TreeNode = findX((root as TreeNode).left!, x)
  
  // 找到返回，否则找右子树
  return node !== null ? node : findX((root as TreeNode).right!, x)
}

// 计算节点的子树的节点数
function getSize(root: TreeNode): number {
  if (root === null) return 0;

  return 1 + getSize(root.left!) + getSize(root.right!)
}

function btreeGameWinningMove(root: TreeNode | null, n: number, x: number): boolean {
  if (root === null) return false;

  const nodeX = findX(root, x)
  const ls = getSize(nodeX.left!)
  const rs = getSize(nodeX.right!)

  return ls > n / 2 || rs > n / 2 || (n - ls - rs - 1) > n / 2;
};
