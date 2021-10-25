// Met Office: shielding-and-wiring task


// First, parse the given string list into a workable array.
const boxesListToArray = list => list.split(/\s/g).filter(Boolean)

// Box class defines the dimensions of each box, and is reusable for both tasks.
class Box {

  // Defines the dimensions of each box and assigns variables to each dimension
  constructor(dimensions) {
    this.dimensions = dimensions

    // boxSplit delimits the string given into an array with split, and then sorts them in ascending order.
    // sorting in ascending order allows us to find the smallest value, by accessing the first element in the array.
    this.boxSplit = dimensions.split('x').sort((a, b) => a - b);

    // for easier readability, the smallest, middle and largrest dimensions are assigned identifiers.
    this.smallestDimension = this.boxSplit[0]
    this.middleDimension = this.boxSplit[1]
    this.largestDimension = this.boxSplit[2]
  }

  get shieldingPerBox() {
            // first three lines calculate the surface area, and the fourth line calculates the shortest side.
    return  (this.smallestDimension * this.middleDimension * 2) +
            (this.smallestDimension * this.largestDimension * 2) +
            (this.largestDimension * this.middleDimension * 2) +
            (this.smallestDimension * this.middleDimension)
          }

  get wiringPerBox() {
            // first line calculates the volume, the second line calculates the shortest circumferance
    return  (this.smallestDimension * this.middleDimension * this.largestDimension) +
            (this.smallestDimension * 2 + this.middleDimension * 2)
  }
}

// the CalculateTotal class accepts an array of boxes, and returns the required value of shielding, or
// wiring, depending on the method passed when called.
class CalculateTotal {
  constructor(boxes) {
    this.boxes = boxes
  }

  // The below two getter methods both maps each element in the array to the Box class, and calls
  // the appropriate method for calculating the wiring / shielding.
  // Both getter methods return a single value, that is calculated by the reduce function.
  get shielding() {
    return this.boxes .map(box => new Box(box).shieldingPerBox)
                      .reduce((accumulatedValue, currentBox) => accumulatedValue + currentBox)
  }

  get wiring() {
    return this.boxes .map(box => new Box(box).wiringPerBox)
                      .reduce((accumulatedValue, currentBox) => accumulatedValue + currentBox)
  }
}

const example1 = `2x3x4
1x10x1
5x7x4`

// Task 1
console.log(new CalculateTotal(boxesListToArray(example1)).shielding)

// Task 2
console.log(new CalculateTotal(boxesListToArray(example1)).wiring)