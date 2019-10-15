'use strict';

//RANDOM NUMBER GENERATOR/////////////////////////////////////////
var makeRandom = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min;
};

//GLOBAL VARIABLES/////////////////////////////////////////////////
var allProducts = [];
var clearArray = [];

//PRODUCT OBJECT CONSTRUCTOR FUNCTION/////////////////////////////////////
function Product(name) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
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
  event.preventDefault();
  var chosenImage = event.target.title;
  console.log('chosenImage: ', chosenImage);
  for(var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].name === chosenImage){
      allProducts[i].votes++;
    }
  }
  if(eventCounter === 24){
    onClick.removeEventListener('click', handleClick);
    var removePictures = document.getElementById('imageContainer');
    removePictures.remove();
    printTableHeadings();
    var refreshLink = document.createElement('a');
    refreshLink.setAttribute('href', 'index.html');
    resetButton.appendChild(refreshLink);
    refreshLink.textContent = 'Refresh Page';
    return;
  }
  for(var b = 0; b < clearArray.length; b++){
    var clear = document.getElementById(clearArray[b]);
    clear.remove();
  }
  clearArray = [];
  eventCounter++;
  howManyPictures();
}

//USERFORM EVENT LISTENER - HOW MANY IMAGES TO SHOW/////////////////////
var onSubmit = document.getElementById('userForm');
onSubmit.addEventListener('submit', handleSubmit);

function handleSubmit() {
  event.preventDefault();
  if(event.target.numberOfPictures.value > 0){
    if(event.target.numberOfPictures.value <= 9){
      numberOfPics = (event.target.numberOfPictures.value);
      createUniqueArray();
      howManyPictures();
    } else {
      alert('Invalid Entry. Please choose a number between 1 and 9.');
      return;
    }
  }else {
    alert('Invalid Entry. Please choose a number between 1 and 9.');
    return;
  }
}
//making a unique random numbers array from user input
var uniqueArray = [];
function createUniqueArray(){
  while(uniqueArray.length < 2*(numberOfPics)){
    var randomIndex = makeRandom(0, ((allProducts.length)-1));
    while(!uniqueArray.includes(randomIndex)){
      uniqueArray.push(randomIndex);
    }
  }
}


//RENDER NUMBER OF IMAGES SELECTED////////////////////////////
var imageParent = document.getElementById('imageContainer');
function howManyPictures() {
  onSubmit.remove();
  for( var i = 0; i < numberOfPics; i++){
    var temp = uniqueArray.shift();
    var createImgElement = document.createElement('img');
    imageParent.appendChild(createImgElement);
    createImgElement.setAttribute('id', `${temp}`);
    clearArray.push(temp);
    createImgElement.setAttribute('src', `${allProducts[temp].path}`);
    createImgElement.setAttribute('title', `${allProducts[temp].name}`);
    allProducts[temp].views++;
    createUniqueArray();
  }
}

//RESULTS TABLE DISPLAY///////////////////////
var tableHeadings = document.getElementById('resultsTable');
var resetButton = document.getElementById('buttonPlacement');
function printTableHeadings() {
  tableHeadings.setAttribute('class', 'tableBorder');
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
    var averagePicked = ((allProducts[a].votes)/(allProducts[a].views))*100;
    if(isNaN(averagePicked)){
      averagePicked = 0;
    }
    var percentagePicked = document.createElement('td');
    rowData.appendChild(percentagePicked);
    percentagePicked.textContent = `${averagePicked.toFixed(2)}%`;
  }
}
var numberOfPics = 0;

//MAKING A BAR GRAPH////////////////////////////
// <!-- from https://www.chartjs.org/docs/latest/ -->
// var ctx = document.getElementById('myGraph').getContext('2d');
// var myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Banana', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 5
//     }]
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }