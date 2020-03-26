/*
 * @Author: Xiaoli Zhou
 * @Date: 2020-03-25 22:24:00
 * @LastEditTime: 2020-03-25 23:05:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /RGBRecognizerApp/colorGame.js
 */
//红，绿，蓝三原色, be careful with the space between comma and numbers
var colors = ["rgb(255, 0, 0)", //red
    "rgb(255, 255, 0)",
    "rgb(0, 255, 0)", //green
    "rgb(0, 255, 255)",
    "rgb(0, 0, 255)", //blue
    "rgb(255, 0, 255)"
];

var squares = document.querySelectorAll(".square");
var pickedColor = colors[3];
var colordisplay = document.querySelector("#colorDisplay");
colordisplay.textContent = pickedColor;

for (var i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.backgroundColor = colors[i]

    //add click event listeners to squares
    squares[i].addEventListener("click", function () {
        //grab color of clicked square
        var currentColor = this.style.backgroundColor;
        //compare it to the picked color
        if (currentColor === pickedColor) {
            alert("correct");
        } else {
            alert("wrong");
        }
    });
};