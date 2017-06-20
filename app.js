'use strict';

function SurveyItem(name,price,description,imageFile) {
  this.itemName = name;
  this.itemPrice = price;
  this.itemDesc = description;
  this.itemImageFile = imageFile;
  this.numberOfClicks = 0;
  this.numberOfTimesShown = 0;
  this.usedInLastItemSet = false;
  this.pairedWith = [];

  this.buildRandomChartValues();
}

SurveyItem.prototype.buildSurveyItem = function(conatainerId){
  var container = document.getElementById(conatainerId);
  var newSurveyImageBox = document.createElement('div');
  var newSurveyItemDesc = document.createElement('div');
  var newImage = document.createElement('img');
  var newItemName = document.createElement('h4');
  var newItemDesc = document.createElement('p');
  newSurveyImageBox.setAttribute('class','surveyImageBox');
  newSurveyItemDesc.setAttribute('class','surveyItemDesc');
  newImage.setAttribute('src',this.itemImageFile);
  newImage.setAttribute('alt',this.itemName);
  newItemName.innerText = this.itemName;
  newItemDesc.innerText = this.itemDesc;
  container.appendChild(newSurveyImageBox);
  container.appendChild(newSurveyItemDesc);
  newSurveyImageBox.appendChild(newImage);
  newSurveyItemDesc.appendChild(newItemName);
  newSurveyItemDesc.appendChild(newItemDesc);
  this.usedInLastItemSet = true; //set this to true because you just used it
};

SurveyItem.prototype.buildRandomChartValues = function() {
  this.numberOfClicks = Math.floor(Math.random() * 10);
  this.numberOfTimesShown = Math.floor(Math.random() * 15 + 10);
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
var itemsChosen = 0;

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
  console.log(itemsObjectsWorking);
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
}

function surveyItemContainerClick(){
  if(itemsChosen < 25){
    itemsChosen++;
    displayRandomItems();
  }
}

function surveyButtonClick(){
  var surveyButtonLocation = document.getElementById('startSurvey');
  surveyButtonLocation.setAttribute('style', 'display:none');
  displayRandomItems();
}

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

document.getElementById('surveyButton').addEventListener('click',surveyButtonClick);
document.getElementsByClassName('surveyItemContainer')[0].addEventListener('click', surveyItemContainerClick);
document.getElementsByClassName('surveyItemContainer')[1].addEventListener('click', surveyItemContainerClick);
document.getElementsByClassName('surveyItemContainer')[2].addEventListener('click', surveyItemContainerClick);
