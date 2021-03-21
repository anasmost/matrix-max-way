const entireMatrixMaxWay = require('./entireMatrixMaxWay_iter');
module.exports = computeMaxWay;

// Returns the sequence representing the maximum score way
async function computeMaxWay(matrix) {
  const n = squareDimension(matrix);
  if (Number.isNaN(n)) throw "The argument of computeMaxWay isn't a squared matrix array";
  // Case where matrix is 1x1
  if (n === 1) return matrix[0] || matrix;
  /*   Case matrix is squared nxn (n>1)*/
  let maxWaySequence = entireMatrixMaxWay(matrix, n).seq;
  return maxWaySequence;
};

// Returns an integer if the argument is a squared matrix and NaN if the argument isn't so
function squareDimension(matrix) {
  if (!Array.isArray(matrix)) return NaN;
  let n = matrix.length;
  // Case where matrix is 1x1 without a nested array
  if (n === 1 && !matrix[0].length) return 1;
  // case where matrix is mxn and m!=n
  for (let i = 0; i < n; i++) {
    if (matrix[i].length !== n) return NaN;
  }
  // case where matrix is nxn (included 1x1 with or without a nested array)
  return n;
}
