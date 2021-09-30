const fs = require("fs");
const path = require("path");
const csvToJSMatrix = require("./module/csvToJSMatrix");
const computeMaxWay = require("./module/matrix");
/* CLI related script: to execute this node script on an csv file of your choice. type:
$ node run [<matrix-path>] [<output-path>]
If no path argument is provided the path will be defaulted to '/matrix.csv' and output to './maxway.csv' */
let matrixPath = (process.argv[2] !== "." && process.argv[2]) || "./matrix.csv";
let outputPath = process.argv[3] || "./maxway.csv";

console.time("latency");
csvToJSMatrix(matrixPath)
  .then((matrix) => computeMaxWay(matrix))
  .then((maxway) => {
    fs.writeFile(outputPath, maxway.join(","), () => {
      console.log(
        "The best scored way is written to " + path.resolve(outputPath)
      );
      console.timeEnd("latency");
    });
  });
