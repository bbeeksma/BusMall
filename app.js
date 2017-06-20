'use strict';

function SurveyItem(name,price,description,imageFile) {
  this.itemName = name;
  this.itemPrice = price;
  this.itemDesc = description;
  this.itemImageFile = imageFile;
  this.numberOfClicks = 0;
  this.numberOfTimesShown = 0;
  this.lastLoopUsed = 0;
  this.pairedWith = 0;

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
};

var boots = new SurveyItem('Jabba','$19.50','Ubb maul mace gev jerjerrod dressellian. Falleen arkanis iridonian desann skywalker greedo priapulin hapes.','images/boots.jpg');
var chair = new SurveyItem('Leah','$99.99','Neimoidia bollux momaw droid saffa sing b4-d4 tierce. Saurin roan jarael kastolar nunb ralter.','images/chair.jpg');
var scissors = new SurveyItem('Han','$7.89','Shistavanen phlog depa oppo qui-gon t88 dorvalla. Ailyn darth irek max jabba finis kiffar antonio bith.','images/schissors.jpg');
var water_can = new SurveyItem('Boba','$10.00','Quence mirta kalee qui-gon halla seerdon bibble. Calamari jacen tund tierce hutt salacious alderaan.','images/water_can');
var wine_glass = new SurveyItem('Vader','$23.99','Vader saffa arkanis kyle givin yavin. Utapaun selkath dat mccool zuggs medon derlin kathol secura.','images/wine_glass');
/*
boots.buildSurveyItem('surveyFirstItem');
aViolet.buildSurveyItem('surveySecondItem');
violeta.buildSurveyItem('surveyThirdItem');
*/
