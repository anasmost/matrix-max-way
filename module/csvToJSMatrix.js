const fs = require('fs');
const readline = require('readline');

module.exports = csvToJSMatrix;

// Not Optimal
function csvToJSMatrix(pathToCsv) {
  return new Promise((resolve, reject) => {
    const matrix = [];

    // Construct options object for readline interface and handle possible errors
    const readlineOptions = { crlfDelay: Infinity };
    try {
      readlineOptions.input = fs.createReadStream(pathToCsv);
    } catch (e) {
      reject(e);
    }

    // Construct the readline object to read csv file and transform it to a matrix array
    const rl = readline.createInterface(readlineOptions);

    rl.on('line', line => {
      // Create a matrix line of numbers from the line string
      const matrixLine = line.split(',');
      for (let i = 0; i < matrixLine.length; i++) {
        matrixLine[i] = Number(matrixLine[i]);
      }
      // Add the constructed line to the matrix
      matrix.push(matrixLine);
    });

    rl.on('close', () => resolve(matrix));
  });
}