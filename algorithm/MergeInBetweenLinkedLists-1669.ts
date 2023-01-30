// https://leetcode.cn/problems/merge-in-between-linked-lists/

class ListNode {
  val: number
  next: ListNode | null
    onstructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }
}
   
function mergeInBetween(list1: ListNode | null, a: number, b: number, list2: ListNode | null): ListNode | null {
  let nodeaLeft: ListNode | null = list1;
  for (let i = 0; i < a; i++) {
    nodeaLeft = (nodeaLeft as ListNode).next;
  }

  let nodeb: ListNode | null = list2;
  (nodeaLeft as ListNode).next = nodeb;

  while ((nodeb as ListNode).next != null) {
    nodeb = (nodeb as ListNode).next;
  }
  nodeb = (nodeb as ListNode).next;

  let nodeaRight: ListNode | null = list1;
  for (let i = 0; i <= b + 1; i++) {
    nodeaRight = (nodeaRight as ListNode).next;
  }

  (nodeb as ListNode).next = nodeaRight;

  while ((nodeaLeft as ListNode).next != null) {
    console.log((nodeaLeft as ListNode).val)
    nodeaLeft = (nodeaLeft as ListNode); 
  }

  return nodeaLeft;
};
