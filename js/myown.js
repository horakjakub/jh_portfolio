"use strict";

var div     = document.createElement('div');		
div.classList.add('first-title');

var divText = document.createTextNode('kotek');
div.appendChild(divText);

document.body.appendChild(div);

debugger;  

var Animal = function(name){
	this.name = name; 
}; 

Animal.prototype.eats = function(){
	console.log( this.name + 'is eating now');  
};

var Dog = function(name){ this.name = name;}; 

Dog.prototype = new Animal('pies');

/*Dog.prototype.bark = function(){
	console.log(this.name + 'makes woof');
};  */
var Kundel = function(name){ this.name = name; }; 

Kundel.prototype = new Dog;

var borys = new Kundel('borys'); 

// zastanowić się nad różnic międzu __proto__  a .prototype 
debugger;  
