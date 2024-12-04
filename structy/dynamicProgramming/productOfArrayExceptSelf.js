/**
 * @param {number[]} nums
 * @return {number[]}
 */
// [1, 2, 3, 4]
//  0  1  2  3
var productExceptSelf = function (nums) {
  let products = new Array(nums.length);
  let exceptIndex = 0,
    cursor = 1,
    product = 1;

  for (i = 0; i < nums.length; i++) {
    products[i] = fp(nums, i)
  }
  // while (exceptIndex < nums.length) {
  //   if (cursor === exceptIndex) {
  //     products[exceptIndex] = product;
  //     if (exceptIndex === nums.length - 1) {
  //       cursor = 0;
  //     } else {
  //       cursor++;
  //     }
  //   }
  //   if (cursor < nums.length) {
  //     product *= nums[cursor];
  //   } else {
  //     exceptIndex++;
  //     cursor = exceptIndex === nums.length - 1 ? 0 : exceptIndex + 1;
  //     product = 1;
  //   }
  //   if (cursor === nums.length) {
  //     cursor = 0;
  //   } else {
  //     cursor++;
  //   }
  // }
  console.log('Products:', products);
  return products;
};

var fp = (nums, except, cursor = except + 1) => {
  if (cursor >= nums.length || cursor === except) {
    return 1
  }
  let product = nums[cursor]

  const nextCursor = cursor === nums.length - 1 ? cursor + 1 : 0
  product *= fp(nums, except, nextCursor)
  console.log(except, product)
  return product
  // Math.imul
  // return product
};

var findProducts = (nums, left, right, except) => {
  if (left === except || right === except || left === right) return 1;
  if (left > nums.length || right > nums.length) return 1;
  let product = nums[left] * nums[right];

  product *= findProducts(nums, left + 1, right + 1, except);

  return product;
  // if (right === nums.length || right === left) return 1;
  // let product = nums[left] * (nums[left + 1] || 1);
  // if (right === nums.length - 1) {
  //   product *= findProducts(nums, i + 1, 0, except);
  // } else {
  //   product *= findProducts(nums, i, j + 1, except);
  // }
  // // console.log(i, j, product);

  // return product;
};

var _findProducts = (nums, i = 0) => {
  let product = 1;
  for (j = 0; j < nums.length; j++) {
    if (i === j) continue;
    product *= nums[j];
  }
  return product;
};

const nums = [1, 2, 3, 4];
// [24, 12, 8, 6]
productExceptSelf(nums);
