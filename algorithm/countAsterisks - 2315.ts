// function countAsterisks(s: string): number {
//   let start = 0, end = 0;
//   let count = 0;

//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === '*') count++;

//     if (s[i] === '|') {
//       if (start) {
//         start = 0;
//         end = 1;
//         count = 0;
//       } else {
//         start = 1;
//       }
//     }
//   }
  
//   return count;
// };

function countAsterisks(s: string): number {
  let start = false;
  let count = 0;
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '*') count++;

    if (s[i] === '|') {
      if (start) count = 0;
      start = !start;
      result += count;
    }
  }

  return result + count;
}

console.log(countAsterisks('l|*e*et|c**o|*de|'))