// https://www.structy.net/problems/premium/befitting-brackets

/**
 * Write a function, befittingBrackets, that takes in a string as an
 * argument. The function should return a boolean indicating whether or
 * not the string contains correctly matched brackets.
 *
 * You may assume the string contains only characters: ( ) [ ] { }
 */
const befittingBrackets = str => {
  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{',
  };
  const openers = Object.values(pairs);
  for (const s of str) {
    if (openers.includes(s)) {
      stack.push(s);
    } else {
      if (pairs[s] === stack.at(-1)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
};

console.log(befittingBrackets('(){}[](())')); // -> true
console.log(befittingBrackets('(])')); // -> false

// Given solution:
{
  const befittingBrackets = str => {
    const stack = [];

    const brackets = {
      '(': ')',
      '[': ']',
      '{': '}',
    };

    for (let char of str) {
      if (char in brackets) {
        stack.push(brackets[char]);
      } else {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          return false;
        }
      }
    }

    return stack.length === 0;
  };
}
