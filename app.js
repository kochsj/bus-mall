'use strict';

//FEATURE TASKS FOR LOCAL STORAGE USER STORY//////////////////////
//1) CHECK IF THERE IS DATA
//2) IF THERE IS : GET IT
//3) PARSE IT AND REINSTANTIATE IT
//4)AFTER CHART RENDERS : SET IT

//GLOBAL VARIABLES/////////////////////////////////////////////////
var allProducts = [];
var clearArray = [];

//CHECKING IF THERE IS DATA IN LOCAL STORAGE//////////////////////
// if(localStorage.hasOwnProperty('data') === true){
if(localStorage.data === '[]'){
  //PRODUCT OBJECT CREATION////////////////////////////////////////
  new Product('bag', 0, 0);
  new Product('banana', 0, 0);
  new Product('bathroom', 0, 0);
  new Product('boots', 0, 0);
  new Product('breakfast', 0, 0);
  new Product('bubblegum', 0, 0);
  new Product('chair', 0, 0);
  new Product('cthulhu', 0, 0);
  new Product('dog-duck', 0, 0);
  new Product('dragon', 0, 0);
  new Product('pen', 0, 0);
  new Product('pet-sweep', 0, 0);
  new Product('scissors', 0, 0);
  new Product('shark', 0, 0);
  new Product('sweep', 0, 0);
  new Product('tauntaun', 0, 0);
  new Product('unicorn', 0, 0);
  new Product('usb', 0, 0);
  new Product('water-can', 0, 0);
  new Product('wine-glass', 0, 0);
} else if(localStorage.data){
  var grabData = localStorage.getItem('data');
  var dataParsed = JSON.parse(grabData);
  for(var i = 0; i < dataParsed.length; i++){
    new Product(dataParsed[i].name, dataParsed[i].views, dataParsed[i].votes);
  }
} else {
  //PRODUCT OBJECT CREATION////////////////////////////////////////
  new Product('bag', 0, 0);
  new Product('banana', 0, 0);
  new Product('bathroom', 0, 0);
  new Product('boots', 0, 0);
  new Product('breakfast', 0, 0);
  new Product('bubblegum', 0, 0);
  new Product('chair', 0, 0);
  new Product('cthulhu', 0, 0);
  new Product('dog-duck', 0, 0);
  new Product('dragon', 0, 0);
  new Product('pen', 0, 0);
  new Product('pet-sweep', 0, 0);
  new Product('scissors', 0, 0);
  new Product('shark', 0, 0);
  new Product('sweep', 0, 0);
  new Product('tauntaun', 0, 0);
  new Product('unicorn', 0, 0);
  new Product('usb', 0, 0);
  new Product('water-can', 0, 0);
  new Product('wine-glass', 0, 0);
}

//RANDOM NUMBER GENERATOR/////////////////////////////////////////
var makeRandom = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min;
};



//PRODUCT OBJECT CONSTRUCTOR FUNCTION/////////////////////////////////////
function Product(name, views, votes) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = views;
  this.votes = votes;
  allProducts.push(this);
}

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
      console.log('number of votes: ' + allProducts[i].votes);
    }
  }
  if(eventCounter === 24){
    onClick.removeEventListener('click', handleClick);
    var removePictures = document.getElementById('imageContainer');
    var toggleHideDiv = document.getElementById('hideDiv');
    removePictures.remove();
    // var newCanvas = document.createElement('canvas');
    // newCanvas.setAttribute('id', 'myGraph');
    // var createCanvas = document.getElementById('canvasPlacement');
    // createCanvas.appendChild(newCanvas);
    for(var f = 0; f < allProducts.length; f++) {
      myChart.data.labels.push(allProducts[f].name);
      myChart.data.datasets[0].data.push(allProducts[f].views);
      myChart.data.datasets[1].data.push(allProducts[f].votes);
    }
    myChart.update();
    toggleHideDiv.setAttribute('style', 'display: block');
    tableHeadings.setAttribute('style', 'margin-top: 30vw;');
    printTableHeadings();
    var resetButton = document.getElementById('buttonPlacement');
    var refreshLinkButton = document.createElement('button');
    resetButton.appendChild(refreshLinkButton);
    var refreshLink = document.createElement('a');
    refreshLink.setAttribute('href', 'index.html');
    refreshLinkButton.appendChild(refreshLink);
    refreshLink.textContent = 'Refresh Page';
    var refreshDataButton = document.createElement('button');
    refreshDataButton.setAttribute('id', 'refreshData');
    resetButton.appendChild(refreshDataButton);
    refreshDataButton.textContent = 'Reset Stored Data';
    var buttonPressed = document.getElementById('refreshData');
    buttonPressed.addEventListener('click', handleReset);
    //I THINK THIS IS WHERE I WANT TO STORE THE DATA IN LOCAL STORAGE//////////
    var storingData = JSON.stringify(allProducts);
    localStorage.setItem('data', storingData);
    return;
  }
  for(var b = 0; b < clearArray.length; b++){
    var clear = document.getElementById(clearArray[b]);
    clear.remove();
  }
  clearArray = [];
  eventCounter++;
  renderPictures();
}
//.getElementsByTagName()
//RESET LOCALSTORAGE EVENT LISTENER////////////////////////////////////
var tableReset = document.getElementById('resultsTable');
function handleReset(){
  event.preventDefault();
  localStorage.setItem('data', '[]');
  allProducts[0].views = 0;
  for(var i = 0; i < allProducts.length; i++){
    allProducts[i].views = 0;
    allProducts[i].votes = 0;
  }
  for(var j = 0; j < 20; j++){
    while(tableReset.firstChild){
      tableReset.removeChild(tableReset.firstChild);
    }
  }
  // tableHeadings.removeChild(tableHeadings.firstChild);
  printTableHeadings();
  myChart.data.datasets[0].data = [];
  myChart.data.datasets[1].data = [];
  myChart.update();
}
//USERFORM EVENT LISTENER - HOW MANY IMAGES TO SHOW/////////////////////
var numberOfPics = 0;
var onSubmit = document.getElementById('userForm');
onSubmit.addEventListener('submit', handleSubmit);

function handleSubmit() {
  event.preventDefault();
  if(event.target.numberOfPictures.value > 0){
    if(event.target.numberOfPictures.value <= 10){
      numberOfPics = (event.target.numberOfPictures.value);
      createUniqueArray();
      renderPictures();
    } else {
      alert('Invalid Entry. Please choose a number between 1 and 10.');
      return;
    }
  }else {
    alert('Invalid Entry. Please choose a number between 1 and 10.');
    return;
  }
}
//USER STORY ONE - making a unique random numbers array from user input////////////////
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
function renderPictures() {
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
    //names
    var rowData = document.createElement('tr');
    tableHeadings.appendChild(rowData);
    rowData.setAttribute('class', 'products');
    rowData.textContent = `${(allProducts[a].name).toUpperCase()}`;
    //views
    var viewsByProduct = document.createElement('td');
    rowData.appendChild(viewsByProduct);
    viewsByProduct.textContent = `${allProducts[a].views}`;
    //votes
    var clicksByProduct = document.createElement('td');
    rowData.appendChild(clicksByProduct);
    clicksByProduct.textContent = `${allProducts[a].votes}`;
    //frequency
    var averagePicked = ((allProducts[a].votes)/(allProducts[a].views))*100;
    if(isNaN(averagePicked)){
      averagePicked = 0;
    }
    var percentagePicked = document.createElement('td');
    rowData.appendChild(percentagePicked);
    percentagePicked.textContent = `${averagePicked.toFixed(2)}%`;
  }
}

//MAKING A BAR GRAPH////////////////////////////
// <!-- from https://www.chartjs.org/docs/latest/ -->

var ctx = document.getElementById('myGraph').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: '# of Views',
      data: [],
      backgroundColor: 'rgba(134, 30, 30, 0.2)',
      borderColor: 'rgba(134, 30, 30, 1)',
      borderWidth: 5,
    }, {
      label: '# of Clicks',
      data: [],
      backgroundColor: 'rgba(10, 63, 17, 0.2)',
      borderColor: 'rgba(10, 63, 17, 1)',
      borderWidth: 5,
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

