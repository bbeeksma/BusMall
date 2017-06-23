'use strict';

Chart.defaults.global.defaultFontFamily = 'Roboto';

function SurveyItem(name,price,description,imageFile) {
  this.itemName = name;
  this.itemPrice = price;
  this.itemDesc = description;
  this.itemImageFile = imageFile;
  this.numberOfClicks = 0;
  this.numberOfTimesShown = 0;
  this.usedInLastItemSet = false;
  this.pairedWith = [];

}

SurveyItem.prototype.buildSurveyItem = function(conatainerId){
  var container = document.getElementById(conatainerId);
  var newSurveyImageBox = document.createElement('div');
  var newSurveyItemDesc = document.createElement('div');
  var newImage = document.createElement('img');
  var newItemName = document.createElement('h3');
  var newItemDesc = document.createElement('p');
  var newItemPrice = document.createElement('h4');
  container.setAttribute('style', 'display: block');
  newSurveyImageBox.setAttribute('class','surveyImageBox');
  newSurveyItemDesc.setAttribute('class','surveyItemDesc');
  newImage.setAttribute('src',this.itemImageFile);
  newImage.setAttribute('alt',this.itemName);
  newImage.setAttribute('name',this.itemName);
  newItemName.innerText = this.itemName;
  newItemDesc.innerText = this.itemDesc;
  newItemPrice.innerText = this.itemPrice;
  container.appendChild(newSurveyImageBox);
  container.appendChild(newSurveyItemDesc);
  newSurveyImageBox.appendChild(newImage);
  newSurveyItemDesc.appendChild(newItemName);
  newSurveyItemDesc.appendChild(newItemDesc);
  newSurveyItemDesc.appendChild(newItemPrice);
  this.setShownValues();
};

SurveyItem.prototype.setShownValues = function () {
  this.numberOfTimesShown++;
  this.usedInLastItemSet = true;
};

var itemObjects = [
  new SurveyItem('Jabba','$19.50','Ubb maul mace gev jerjerrod dressellian. Falleen arkanis iridonian desann skywalker greedo priapulin hapes.','images/boots.jpg')
  ,new SurveyItem('Leah','$99.99','Neimoidia bollux momaw droid saffa sing b4-d4 tierce. Saurin roan jarael kastolar nunb ralter.','images/chair.jpg')
  ,new SurveyItem('Han','$7.89','Shistavanen phlog depa oppo qui-gon t88 dorvalla. Ailyn darth irek max jabba finis kiffar antonio bith.','images/scissors.jpg')
  ,new SurveyItem('Boba','$10.00','Quence mirta kalee qui-gon halla seerdon bibble. Calamari jacen tund tierce hutt salacious alderaan.','images/water_can.jpg')
  ,new SurveyItem('Vader','$23.99','Vader saffa arkanis kyle givin yavin. Utapaun selkath dat mccool zuggs medon derlin kathol secura.','images/wine_glass.jpg')
  ,new SurveyItem('Jabba2','$19.50','Ubb maul mace gev jerjerrod dressellian. Falleen arkanis iridonian desann skywalker greedo priapulin hapes.','images/boots.jpg')
  ,new SurveyItem('Leah2','$99.99','Neimoidia bollux momaw droid saffa sing b4-d4 tierce. Saurin roan jarael kastolar nunb ralter.','images/chair.jpg')
  ,new SurveyItem('Han2','$7.89','Shistavanen phlog depa oppo qui-gon t88 dorvalla. Ailyn darth irek max jabba finis kiffar antonio bith.','images/scissors.jpg')
  ,new SurveyItem('Boba2','$10.00','Quence mirta kalee qui-gon halla seerdon bibble. Calamari jacen tund tierce hutt salacious alderaan.','images/water_can.jpg')
];

var itemsObjectsWorking;
var itemsChosen = window.localStorage.itemsChosen || 0;
var itemsDisplayed = window.localStorage.itemsDisplayed || 0;

function onLoadValues(){
  updateItemObjects();
  if(itemsChosen > 24){
    var surveyButtonLocation = document.getElementById('startSurvey');
    surveyButtonLocation.setAttribute('style', 'display:none');
    var thanksContainer = document.getElementsByClassName('surveyThankYou')[0];
    thanksContainer.setAttribute('style', 'display: block');
    var howManyQuestions = document.getElementById('completedString');
    howManyQuestions.setAttribute('style','display:none');
    buildAPrettyChart();
  }
  else if(itemsDisplayed > 0){
    var surveyButtonLocation = document.getElementById('startSurvey');
    surveyButtonLocation.setAttribute('style', 'display:none');
    displayPreviousObjects();
    displayHowManyQuestions();
  }
}

function updateItemObjects(){
  if(window.localStorage.itemObjectSavedVallues){
    var storedObjects = JSON.parse(window.localStorage.itemObjectSavedVallues);
    itemObjects.map(function(item){
      item.numberOfTimesShown = storedObjects[item.itemName].numberOfTimesShown;
      item.usedInLastItemSet = storedObjects[item.itemName].usedInLastItemSet;
      item.numberOfClicks = storedObjects[item.itemName].numberOfClicks;
    });
  }
}

function displayPreviousObjects(){
  var locations = ['surveyFirstItem','surveySecondItem','surveyThirdItem'];
  var lastDisplayed = itemObjects.filter(function(item){
    if(item.usedInLastItemSet === true){
      return true;
    }
  });
  console.log(lastDisplayed);
  lastDisplayed.map(function(item,index){
    item.buildSurveyItem(locations[index]);
    item.numberOfTimesShown--; //decrement here because we've already shown once and don't need to count this as a second time
  });
}

function writeToStorage(){
  window.localStorage.itemsChosen = itemsChosen;
  window.localStorage.itemsDisplayed = itemsDisplayed;
  window.localStorage.itemObjectSavedVallues = prepForStorage();
}

function prepForStorage(){
  var obj = {};
  for(var i = 0; i < itemObjects.length; i++){
    obj[itemObjects[i].itemName] = prepData(i);
  }
  return JSON.stringify(obj);
}

function prepData(index){
  var numberOfTimesShown = itemObjects[index].numberOfTimesShown;
  var usedInLastItemSet = itemObjects[index].usedInLastItemSet;
  var numberOfClicks = itemObjects[index].numberOfClicks;
  return {numberOfTimesShown: numberOfTimesShown, usedInLastItemSet: usedInLastItemSet, numberOfClicks: numberOfClicks};
}

function displaySingleRandom(elementIndex,locationID){
  var index = Math.floor(Math.random() * (itemsObjectsWorking.length));
  if(document.getElementsByClassName('surveyImageBox')[elementIndex] && document.getElementsByClassName('surveyItemDesc')[elementIndex]){ //remove old elements if the exist
    var oldImage = document.getElementsByClassName('surveyImageBox')[elementIndex];
    var oldItemDesc = document.getElementsByClassName('surveyItemDesc')[elementIndex];
    oldImage.remove();
    oldItemDesc.remove();
  }
  itemsObjectsWorking[index].buildSurveyItem(locationID); //build new element
  itemsObjectsWorking.splice(index,1);
}

function preventDuplicateDisplay(){
  itemsObjectsWorking = itemObjects.slice();
  var indexesToRemove = [];
  for(var i = 0; i < itemsObjectsWorking.length; i++){
    if(itemsObjectsWorking[i].usedInLastItemSet){
      indexesToRemove.push(i);
    }
  }
  for(var j = (indexesToRemove.length - 1); j > -1; j--){
    itemsObjectsWorking.splice(indexesToRemove[j],1);
  }
  itemObjects.map(function(item) { //set all the SurveyItem.lastLoopUsed back to false to be ready for next set
    item.usedInLastItemSet = false;
  });
}

function displayRandomItems(){
  preventDuplicateDisplay();
  displaySingleRandom(0,'surveyFirstItem');
  displaySingleRandom(1, 'surveySecondItem');
  displaySingleRandom(2, 'surveyThirdItem');
  itemsDisplayed++;
}

function surveyItemContainerClick(e){
  itemObjects.map(function(item) {
    if(item.itemName === e.target.getAttribute('name')){
      item.numberOfClicks++;
    }
  });
  if(itemsChosen < 24){
    itemsChosen++;
    displayRandomItems();
    displayHowManyQuestions();
    writeToStorage();
  }
  else{
    itemsChosen++;
    writeToStorage();
    var itemContainer = document.getElementsByClassName('surveyThreeItemsContainer')[0];
    itemContainer.setAttribute('style','display:none');
    var thanksContainer = document.getElementsByClassName('surveyThankYou')[0];
    thanksContainer.setAttribute('style', 'display: block');
    var howManyQuestions = document.getElementById('completedString');
    howManyQuestions.setAttribute('style','display:none');
    buildAPrettyChart();
  }
}

function surveyStartButtonClick(){
  var surveyButtonLocation = document.getElementById('startSurvey');
  surveyButtonLocation.setAttribute('style', 'display:none');
  displayRandomItems();
  writeToStorage();
}

function displayHowManyQuestions(){
  var howManyQuestions = document.getElementById('completedString');
  howManyQuestions.setAttribute('style','display:block');
  howManyQuestions.innerText = 'You have completed ' + itemsChosen + ' out of 25 questions.';
}

function buildAPrettyChart(){
  var chartClicks = itemObjects.map(function(item) {
    return item.numberOfClicks;
  });
  var chartTimesShown = itemObjects.map(function(item) {
    return item.numberOfTimesShown;
  });
  var chartNames = itemObjects.map(function(item) {
    return item.itemName;
  });
  var chartClicksColor = itemObjects.map(function(item) {
    return '#ad65c8';
  });
  var chartShownColor = itemObjects.map(function(item) {
    return '#fbd7fb';
  });

  var chartLoc = document.getElementById('clickResults');
  var resultsChart = new Chart(chartLoc, {
    type: 'horizontalBar',
    data: {
      labels: chartNames,
      datasets: [{
        label: '# of Clicks',
        data: chartClicks,
        backgroundColor: chartClicksColor,
      },
      {
        label: '# of Times Shown',
        data: chartTimesShown,
        backgroundColor: chartShownColor,
      }],
    },
    options: {
      title:{
        display: true,
        text: 'Results'
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,
        }]
      }
    }
  });
}

window.addEventListener('load',onLoadValues);
document.getElementById('surveyButton').addEventListener('click',surveyStartButtonClick);
document.getElementsByClassName('surveyItemContainer')[0].addEventListener('click', function(event){
  surveyItemContainerClick(event);
});
document.getElementsByClassName('surveyItemContainer')[1].addEventListener('click', function(event){
  surveyItemContainerClick(event);
});
document.getElementsByClassName('surveyItemContainer')[2].addEventListener('click', function(event){
  surveyItemContainerClick(event);
});
