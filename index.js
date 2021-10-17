// Met Office: shielding-and-wiring task

// example1.txt
const listOfBoxes = `2x3x4
1x10x1
5x7x4
`

// ========== step one =========== \\ 
// === Calculate the Shielding === \\
// =============================== \\ 


// First, parse the given string list into a workable array.
const arrayOfBoxes = listOfBoxes.split(/\s/g).filter(Boolean)

// Create a function to calculate the total surface area and area of smallest side of each box
function shieldingPerBox(box) {

  // parse each string, create three separate values to represent the length, width and height
  // this value is sorted in ascending order, to help calculate which side to use for the smallest side
  const boxArr = box.split('x').sort((a, b) => a - b);

  // assign identifiers for each side
  const side1 = boxArr[0]*boxArr[1]*2
  const side2 = boxArr[0]*boxArr[2]*2
  const side3 = boxArr[2]*boxArr[1]*2

  // calculate the surface area, and smallest side
  const surfaceArea = side1 + side2 + side3
  const smallestSide = boxArr[0]*boxArr[1];

  // return the total shielding required 
  return surfaceArea + smallestSide
}

// Now iterate through each box in the array. Return a total sum for the amount of shielding required
const totalShielding = arrayOfBoxes
      // first, convert each string value for the box into the required allowance of sheeting, equal to volume + slack
                                    .map( box => shieldingPerBox(box))
      // now calculate the total value of all boxes in the array. 
                                    .reduce((accumulatedValue, currentBox) => accumulatedValue + currentBox)



// ========= step two ========= \\ 
// === Calculate the Wiring === \\
// ============================ \\ 

// From the previous example, I will be using the arrayOfBoxes element

// Create a function to calculate the total volume and shortest circumferance of each box
function wiringPerBox(box) {

  // parse each string, create three separate values to represent the length, width and height
  // this value is sorted in ascending order, to help calculate which side to use for the slack
  const boxArr = box.split('x').sort((a, b) => a - b);

  // calculate the volume
  const volume = boxArr[0] * boxArr[1] * boxArr[2]

  // calculate the shortest circumferance
  const shortestCircumferance = boxArr[0]*2 + boxArr[1]*2

  // return the total wiring required
  return volume + shortestCircumferance
}

// Now iterate through each box in the array
const totalWiring = arrayOfBoxes
      // first, convert each string value for the box into the required allowance of sheeting, equal to volume + slack
                              .map( box => wiringPerBox(box))
      // now calculate the total value of all boxes in the array. 
                              .reduce((accumulatedValue, currentBox) => accumulatedValue + currentBox)


console.log(totalShielding)
console.log(totalWiring)