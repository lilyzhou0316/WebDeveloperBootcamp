/*
 * @Author: Xiaoli Zhou
 * @Date: 2020-03-25 22:24:00
 * @LastEditTime: 2020-03-29 23:19:02
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

var numOfSquares = 6;
var colors = [];
var pickedColor;
var colordisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#display");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var buttonList = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");

init();

function init() {
  //mode buttons event listener
  setupModeButton();

  //squares event listener
  setupSquaresEvent();

  //reset all colors
  resetSquaresColor();
}

function setupModeButton() {
  for (var i = 0; i < buttonList.length; i++) {
    buttonList[i].addEventListener("click", function () {
      //remove all buttons' class of selected,
      buttonList[0].classList.remove("selected");
      buttonList[1].classList.remove("selected");
      //add class selected to the current button
      this.classList.add("selected");
      //figure out how many squares to show 
      this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
      //reset new colors, pick a new pickedColor
      resetSquaresColor(numOfSquares);
    })
  };
}

function setupSquaresEvent() {
  for (var i = 0; i < squares.length; i++) {
    //add click event listeners to squares
    squares[i].addEventListener("click", function () {
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
}
resetButton.addEventListener("click", function () {
  resetSquaresColor(numOfSquares);
});


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

function resetSquaresColor() {
  //generate all new colors
  colors = generateRandomColorArr(numOfSquares);
  //pick a new random color from array
  pickedColor = pickColor(colors);
  //change colordisplay to match picked color
  colordisplay.textContent = pickedColor;
  //change colors of squares
  for (var i = 0; i < squares.length; i++) {

    if (colors[i]) {
      //if num of color array elements is 3, just display 3
      //or it will diplay 6
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none"; //hide 3 squares
    }

  }
  h1.style.backgroundColor = "steelblue"; //body color
  messageDisplay.textContent = "";
  resetButton.textContent = "New Color";
}