// Met Office: shielding-and-wiring task



// ========== task one =========== \\ 
// === Calculate the Shielding === \\
// =============================== \\ 


// First, parse the given string list into a workable array.
const boxesListToArray = list => list.split(/\s/g).filter(Boolean)

// Create a function to calculate the total surface area and area of smallest side of each box
const shieldingPerBox = box => {

  // parse each string into an array and create three separate values to represent the length, width and height
  // this value is sorted in ascending order, to help calculate which side to use for the smallest side
  const boxArr = box.split('x').sort((a, b) => a - b);

  // assign identifiers for each side
  const [side1, side2, side3] = [ boxArr[0] * boxArr[1] * 2,
                                  boxArr[0] * boxArr[2] * 2,
                                  boxArr[2] * boxArr[1] * 2, ]

  // calculate the surface area
  const surfaceArea = side1 + side2 + side3

  // and the smallest side, which is used to calculate the amount of extra slack to provision for each box
  const smallestSide = boxArr[0] * boxArr[1];

  // return the total sheeting required for the shielding
  return surfaceArea + smallestSide
}

// Now iterate through each box in the array. Return a total sum for the amount of shielding required
const totalShielding = (list) => { return list
      // first, convert each string value for the box into the required allowance of sheeting, equal to volume + slack
                                              .map( box => shieldingPerBox(box))
      // now calculate the total value of all boxes in the array. 
                                              .reduce((accumulatedValue, currentBox) => accumulatedValue + currentBox)
}


// ========= task two ========= \\ 
// === Calculate the Wiring === \\
// ============================ \\ 


// Create a function to calculate the total volume and shortest circumferance of each box
const wiringPerBox = box => {

  // parse each string into an array and create three separate values to represent the length, width and height
  // this value is sorted in ascending order, to help calculate which side will have the shortest circumferance
  const boxArr = box.split('x').sort((a, b) => a - b);

  // calculate the volume
  const volume = boxArr[0] * boxArr[1] * boxArr[2]

  // calculate the shortest circumferance, this is used to calculate the amount of extra slack to provision for each box
  const shortestCircumferance = boxArr[0]*2 + boxArr[1]*2

  // return the total sheeting required for the wiring
  return volume + shortestCircumferance
}

// Now iterate through each box in the array
const totalWiring = (list) => { return  list
      // first, convert each string value for the box into the required allowance of sheeting, equal to volume + slack
                                            .map( box => wiringPerBox(box))
      // now calculate the total value of all boxes in the array. 
                                            .reduce((accumulatedValue, currentBox) => accumulatedValue + currentBox)
}



// below is some simple DOM manipulation code, that can gives access to the index.html file, so we can visualise the results.
const calcValues = () => {

  // resets the input & output boxes
  document.querySelector("#output").innerHTML = "";

  // create three elements to append to document
  let newBox = document.createElement('li')
  let li = document.createElement("li")
  let li2 = document.createElement("li")

  // access the value inputted from the textarea
  let inputVal = document.querySelector("#box-group").value 

  // run the shielding and wiring functions and attach to identifiers
  let shield = document.createTextNode(totalShielding(boxesListToArray(inputVal)))
  let wire = document.createTextNode(totalWiring(boxesListToArray(inputVal)))

  // append each element with text values
  newBox.append("Next box group:")
  li.append("Total shielding: ", shield)
  li2.append("Total wiring: ", wire)

  // append each element to the document
  document.querySelector("#output").appendChild(newBox)
  document.querySelector("#output").appendChild(li)
  document.querySelector("#output").appendChild(li2)

  // reset the input box
  document.querySelector("#myInp").value = ""
}