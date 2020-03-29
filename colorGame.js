/*
 * @Author: Xiaoli Zhou
 * @Date: 2020-03-25 22:24:00
 * @LastEditTime: 2020-03-28 23:23:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /RGBRecognizerApp/colorGame.js
 */
//红，绿，蓝三原色, be careful with the space between comma and numbers
// var colors = ["rgb(255, 0, 0)", //red
//     "rgb(255, 255, 0)",
//     "rgb(0, 255, 0)", //green
//     "rgb(0, 255, 255)",
//     "rgb(0, 0, 255)", //blue
//     "rgb(255, 0, 255)"
// ];

var squares = document.querySelectorAll(".square");
var colors = generateRandomColorArr(squares.length);
var pickedColor = pickColor(colors);
var colordisplay = document.querySelector("#colorDisplay");
colordisplay.textContent = pickedColor;
var messageDisplay = document.querySelector("#display");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var numOfSquares = 6;

resetButton.addEventListener("click", function() {
  //according to the current square number to reset color
  resetSquaresColor(numOfSquares);
  h1.style.backgroundColor = "steelblue"; //body color
});

easyButton.addEventListener("click", function() {
  //reset the number of squares
  numOfSquares = 3;
  //remove selected class from hard button
  hardButton.classList.remove("selected");
  //add selected class to easy button
  easyButton.classList.add("selected");
  //reset the color of squares
  resetSquaresColor(numOfSquares);
  //hide 3 squares of the second row
  for (var i = 3; i < 6; i++) {
    document.querySelectorAll(".square")[i].style.display = "none";
  }
});

hardButton.addEventListener("click", function() {
  //reset the number of squares
  numOfSquares = 6;
  //add selected class to hard button
  hardButton.classList.add("selected");
  //remove selected class from easy button
  easyButton.classList.remove("selected");
  //reset the color of squares
  resetSquaresColor(numOfSquares);
  //display the squares that has been hidden
  for (var i = 3; i < 6; i++) {
    document.querySelectorAll(".square")[i].style.display = "block";
  }
});

for (var i = 0; i < squares.length; i++) {
  //add initial colors to squares
  squares[i].style.backgroundColor = colors[i];

  //add click event listeners to squares
  squares[i].addEventListener("click", function() {
    //grab color of clicked square
    var currentColor = this.style.backgroundColor;
    //compare it to the picked color
    if (currentColor === pickedColor) {
      messageDisplay.textContent = "correct!";
      changeColors(currentColor);
      h1.style.backgroundColor = pickedColor;
      resetButton.textContent = "Play Again?";
    } else {
      //change the current square's color to black
      this.style.backgroundColor = "#232323";
      messageDisplay.textContent = "try again!";
    }
  });
}

function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    //loop all squares to change color to match the correct color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor(arr) {
  //create a random number
  var randomNum = Math.floor(Math.random() * arr.length);
  //pick a random color
  return arr[randomNum];
}

function randomColor() {
  //pick a 'red' from 0-255
  var red = Math.floor(Math.random() * 255 + 1);
  //pick a 'green' from 0-255
  var green = Math.floor(Math.random() * 255 + 1);
  //pick a 'blue' from 0-255
  var blue = Math.floor(Math.random() * 255 + 1);
  //return a random color
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function generateRandomColorArr(num) {
  //create an array
  var arr = [];
  //add random color into the array
  for (var i = 0; i < num; i++) {
    arr[i] = randomColor();
  }
  //return the array
  return arr;
}
function resetSquaresColor(num) {
  //generate all new colors
  colors = generateRandomColorArr(num);
  //pick a new random color from array
  pickedColor = pickColor(colors);
  //change colordisplay to match picked color
  colordisplay.textContent = pickedColor;
  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
}
