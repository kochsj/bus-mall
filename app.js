'use strict';

//RANDOM NUMBER GENERATOR/////////////////////////////////////////
var makeRandom = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min;
};

//GLOBAL VARIABLES/////////////////////////////////////////////////
var leftImgEl = document.getElementById('left');
var rightImgEl = document.getElementById('right');
var centerImgEl = document.getElementById('center');
var allProducts = [];


//PRODUCT OBJECT CONSTRUCTOR FUNCTION/////////////////////////////////////
function Product(name) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

//DISPLAYING THREE UNIQUE RANDOM PICTURES ON THE PAGE//////////////////////
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
  allProducts[randomNumbersGenerated[0]].views++;
  centerImgEl.src = allProducts[randomNumbersGenerated[1]].path;
  centerImgEl.name = allProducts[randomNumbersGenerated[1]].name;
  centerImgEl.title = allProducts[randomNumbersGenerated[1]].name;
  allProducts[randomNumbersGenerated[1]].views++;
  rightImgEl.src = allProducts[randomNumbersGenerated[2]].path;
  rightImgEl.name = allProducts[randomNumbersGenerated[2]].name;
  rightImgEl.title = allProducts[randomNumbersGenerated[2]].name;
  allProducts[randomNumbersGenerated[2]].views++;
}

//PRODUCT OBJECT CREATION////////////////////////////////////////
//loop? new Product(images/[i])??
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('usb');
new Product('water-can');
new Product('wine-glass');

//ON CLICK EVENT HANDLER/////////////////////////////////////////
var onClick = document.getElementById('imageContainer');
onClick.addEventListener('click', handleClick);
var eventCounter = 0;

function handleClick() {
  var chosenImage = event.target.title;
  console.log('chosenImage: ', chosenImage);
  for(var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].name === chosenImage){
      allProducts[i].votes++;
    }
  }
  if(eventCounter === 2){
    onClick.removeEventListener('click', handleClick);
    var removePictures = document.getElementById('imageContainer');
    removePictures.remove();
    printTableHeadings();
  }
  eventCounter++;
  renderProducts();
}
renderProducts();

//RESULTS TABLE DISPLAY///////////////////////
var tableHeadings = document.getElementById('resultsTable');
function printTableHeadings() {
  var headerRow = document.createElement('tr');
  tableHeadings.appendChild(headerRow);
  headerRow.textContent = '';
  var productsHeader = document.createElement('th');
  headerRow.appendChild(productsHeader);
  productsHeader.textContent = 'Products';
  var viewsHeader = document.createElement('th');
  headerRow.appendChild(viewsHeader);
  viewsHeader.textContent = 'Total Views';
  var clicksHeader = document.createElement('th');
  headerRow.appendChild(clicksHeader);
  clicksHeader.textContent = 'Total Clicks';
  var percentageHeader = document.createElement('th');
  headerRow.appendChild(percentageHeader);
  percentageHeader.textContent = 'Frequency Picked';
  for(var a = 0; a < allProducts.length; a++) {
    var rowData = document.createElement('tr');
    tableHeadings.appendChild(rowData);
    rowData.setAttribute('class', 'products');
    rowData.textContent = `${(allProducts[a].name).toUpperCase()}`;
    var viewsByProduct = document.createElement('td');
    rowData.appendChild(viewsByProduct);
    viewsByProduct.textContent = `${allProducts[a].views}`;
    var clicksByProduct = document.createElement('td');
    rowData.appendChild(clicksByProduct);
    clicksByProduct.textContent = `${allProducts[a].votes}`;
    var averagePicked = (allProducts[a].votes)/(allProducts[a].views);
    if(isNaN(averagePicked)){
      averagePicked = 0;
    }
    var percentagePicked = document.createElement('td');
    rowData.appendChild(percentagePicked);
    percentagePicked.textContent = `${averagePicked}`;
  }
}

