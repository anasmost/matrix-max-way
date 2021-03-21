# Squared Matrix Maxway Calculator

---

## Running through Command Line

- Entry File "run.js": `node run [<squared-matrix-filename> | .] [<output-filename>]`
- filenames my be relative or absolute are CSV typed (\*.csv)

The program takes in a squared matrix in CSV format <squared-matrix-filename> and computes the **best scored** way from the first cell on above left to the last cell on bottom right, which **sequence of numbers** is written on the <output-filename>.
A **way's score** is the **sum** of the cells' values it spans.
If the matrix is **not squared**, an **error** will be thrown.

## Using the feature independently

The necessary files are combined in the module/ folder.

1. csvToJSMatrix.js exports a function that takes in a path to a csv matrix upon which it creates and returns a matrix Javascript array.
2. matrix.js a function that takes in a matrix Javascript array of which it computes the best scored way.
