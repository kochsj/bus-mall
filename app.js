'use strict';

//RANDOM NUMBER GENERATOR/////////////////////////////////////////
var makeRandom = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min;
};

var leftImgEl = document.getElementById('left');
var rightImgEl = document.getElementById('right');
var centerImgEl = document.getElementById('center');

var allProducts = [];

function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

function renderProducts() {
  //store already picked values
  var randomNumbersGenerated = [];
  //get a random index
  var randomIndex = makeRandom(0, ((allProducts.length)-1));
  randomNumbersGenerated.push(randomIndex);
  //display a product with the random index number
  randomIndex = makeRandom(0, ((allProducts.length)-1));
  randomNumbersGenerated.push(randomIndex);
  while(randomNumbersGenerated[0] === randomNumbersGenerated[1]) {
    console.log('Duplicate found. Re-rolling');
    randomNumbersGenerated[1] = makeRandom(0, ((allProducts.length)-1));
  }
  randomIndex = makeRandom(0, ((allProducts.length)-1));
  randomNumbersGenerated.push(randomIndex);
  while(randomNumbersGenerated[2] === randomNumbersGenerated[1] || randomNumbersGenerated[2] === randomNumbersGenerated[0]) {
    console.log('Duplicate found. Re-rolling');
    randomNumbersGenerated[2] = makeRandom(0, ((allProducts.length)-1));
  }
  leftImgEl.src = allProducts[randomNumbersGenerated[0]].path;
  leftImgEl.name = allProducts[randomNumbersGenerated[0]].name;
  leftImgEl.title = allProducts[randomNumbersGenerated[0]].name;
  centerImgEl.src = allProducts[randomNumbersGenerated[1]].path;
  centerImgEl.name = allProducts[randomNumbersGenerated[1]].name;
  centerImgEl.title = allProducts[randomNumbersGenerated[1]].name;
  rightImgEl.src = allProducts[randomNumbersGenerated[2]].path;
  rightImgEl.name = allProducts[randomNumbersGenerated[2]].name;
  rightImgEl.title = allProducts[randomNumbersGenerated[2]].name;
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('chair');


// function handleClick() {
//   var chosenImage = event.target.title;
//   console.log('chosenImage: ', chosenImage);
//   for( var i = 0; i < allProducts.length; i++) {
//     if(allProducts[i].name === chosenImage){
//       allProducts[i].votes++;
//     }
//   }
// }

renderProducts();

