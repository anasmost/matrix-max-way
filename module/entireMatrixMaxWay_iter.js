module.exports = entireMaxWay_iter;
// All object assignement are made by refs, only if cloning is an absolute necessity
/* (start_i, start_j) and (end_i, end_j) are respectively the coordinates of the starting and ending cell.
The returned objected contain the sequence on the seq property.
The sequence doesn't include the starting cell. */
function entireMaxWay_iter(matrix, matrix_dimension) {
  const n = matrix_dimension;
  const min_d = 0;
  const max_d = matrix_dimension - 1;
  // maxWays is an array of best scored ways from the starting cell of the matrix to the current diagonale divider's cells
  const maxWays = [{ score: matrix[0][0], seq: [matrix[0][0]] }];
  // d : index of the current diagonale divider of the matrix, which represents the current position of the computed maxWays. Thus it also represents the current maxWays length
  for (let d = min_d; d < max_d; d++) {
    _1stHalfForwardStep(d);
  }
  // for (let d = max_d; d > min_d; d--) {
  //   _2ndHalfForwardStep(d);
  // }
  for (let d = min_d; d < max_d; d++) {
    _2ndHalfForwardStep__(d);
  }

  // maxWays is an array contents of which eventually resolves into a single best scored maxWay
  return maxWays[0];

  // returns the best scored among the arguments
  function maxOf(way1, way2) {
    if (!way1 || !way2) return way1 || way2;
    return way1.score > way2.score ? way1 : way2;
  }
  // Extends a way, through mutation, by adding a cell value
  function extendWay(way, value) {
    if (!value || !way) return way;
    way.score += value;
    way.seq.push(value);
    return way;
  }
  // Create a complete copy of a way
  function cloneWay(way) {
    return {
      score: way.score,
      seq: way.seq.slice(0)
    };
  }

  // Mutate the maxWays array to match the next state of the best scored ways new ending cells of which are positionned on the next divider, index of which is d+1 (from left to right)
  function _1stHalfForwardStep(d) {
    // The next maxArray length has to be d+1, its last maxway is based on the previous last maxway. Hence I pushed (duplicated) the last item, provided that iteration is made backwards
    maxWays.push(maxWays[d]);
    // Iterate the maxWays array backwards, starting from the last element
    for (let i = d, prevMaxWay = maxWays[d]; i >= 0; i--) {
      let maxWay = maxOf(maxWays[i], maxWays[i - 1]);
      // If the current maxWay is identical to that of the previous iteration (the next adjacent in the maxWays array), we have to clone it in order to extend each one separately with the appropriate value
      if (maxWay === maxWays[i + 1]) maxWay = cloneWay(maxWay);
      maxWays[i] = maxWay;
      // Extension of the previous way. Extenion of the current way is intentionally avoided to avoid the case of comparing an already mutated way with a new one
      extendWay(prevMaxWay, matrix[i + 1][d - i]);
      prevMaxWay = maxWay;
    }
    // Extending the first maxWay (because the loop above doesn't do it)
    extendWay(maxWays[0], matrix[0][d + 1]);
  }
  // 
  function _2ndHalfForwardStep(d) {
    for (let i = matrix_dimension - 1 - d, idx = 0, prevMaxWay; i < matrix_dimension - 1; i++, idx++) {
      let maxWay = maxOf(maxWays[idx], maxWays[idx + 1]);
      if (maxWay === maxWays[idx - 1]) maxWay = cloneWay(maxWay);
      maxWays[idx] = maxWay;
      extendWay(prevMaxWay, matrix[i][2 * matrix_dimension - 1 - d - i]);
      prevMaxWay = maxWay;
    }
    extendWay(maxWays[d - 1], matrix[matrix_dimension - 1][matrix_dimension - d]);
    // All the neccessary d-1 maxways are placed above the last element, thus this one has to be deleted
    maxWays.pop();
  }
  function _2ndHalfForwardStep__(d) {
    for (let i = d, w = 0, prevMaxWay; i < matrix_dimension - 1; i++, w++) {
      let maxWay = maxOf(maxWays[w], maxWays[w + 1]);
      if (maxWay === maxWays[w - 1]) maxWay = cloneWay(maxWay);
      maxWays[w] = maxWay;
      extendWay(prevMaxWay, matrix[i][matrix_dimension + d - i]);
      prevMaxWay = maxWay;
    }
    extendWay(maxWays[matrix_dimension - 2 - d], matrix[matrix_dimension - 1][d + 1]);
    // All the neccessary d-1 maxways are placed above the last element, thus this one has to be deleted
    maxWays.pop();
  }
}

