

//Cape Generator
abilityClasses = ["Mover", "Shaker", "Brute", "Breaker", "Master", "Tinker", "Blaster", "Thinker", "Striker", "Changer", "Trump", "Stranger", ]
abilityPowermods = [1, 3, 5, 0, 5, 0, 5, 1, 7, 3, 0, 1,]  
abilityHealthmods = [7, 3, 5, 0, 1, 0, 3, 1, 1, 5, 0, 7,]
function cape(power, health, ability, age){
	this.power = power;
	this.health = health;
	this.ability = ability;
	this.age = age;
	this.name = "Place Holder";
	this.generate = function(){
		this.power = Math.floor(Math.random() * 10) + 1;
		this.health = Math.floor(Math.random() * 10) + 1;
		abilityIndex = Math.floor(Math.random()*12);
		this.ability = abilityClasses[abilityIndex];
		this.power += abilityPowermods[abilityIndex];
		this.health += abilityHealthmods[abilityIndex];
		this.abilityIndex = abilityIndex;
	}
	this.post = function(elem){
		elem.innerHTML = "<li>Name: "+ this.name +"</li><li>, Class: "+ this.ability +"</li><li>, Power: "+ this.power +"</li><li>, Survivability: "+ this.health +"</li>"
	}
}

//Entity object and system
var entity = {
	race: null,
	data: 0,
	conflict: 0,
	shards: 0,
	capes: 0,
	capePopulation: [],
	dataGather: function(){
		this.data += 1;
	},
	conflictGather: function(j){
		for (var i = j-1; i >= 0; i--) {
			this.conflict += 1
			if(this.conflict >= 100){
				this.conflict -= 100
				this.data += 1
			}
		}
	},
	capeGather: function(){
		if(this.data >= 10){
			this.data -= 10;
			this.capes += 1;
			return true;
		}
		else{
			return false;
		}
	},
	chooseRace: function(str){
		str = str.charAt(0).toUpperCase() + str.slice(1);
		this.race = str;
		document.getElementById("race").innerHTML = "Race: " + this.race
	},
	
}
function addData(){
	entity.dataGather();
	document.getElementById("data").innerHTML = entity.data;
}
function addConflict(){
	entity.conflictGather(25);
	document.getElementById("conflict").innerHTML = entity.conflict;
	document.getElementById("data").innerHTML = entity.data;
}
function addCapes(){
	if (entity.capeGather() == true){
	document.getElementById("capes").innerHTML = entity.capes;
	document.getElementById("data").innerHTML = entity.data;
	var capeHolder = new cape(0,0,0,0);
	capeHolder.generate();
	entity.capePopulation.push(capeHolder);
	//temporary
	document.getElementById("power").innerHTML = "Power: " + entity.capePopulation[0].power;
	document.getElementById("classification").innerHTML = entity.capePopulation[0].ability;
	document.getElementById("name").innerHTML = entity.capePopulation[0].name;
	document.getElementById("health").innerHTML = "Survivability: " + entity.capePopulation[0].health;
	}
	//end temporary
}
function conflictHarvest(){
	pass = 0;
	for (var i = entity.capePopulation.length - 1; i >= 0; i--) {
		pass += entity.capePopulation[i].power;
	}
	entity.conflictGather(pass);
	document.getElementById("conflict").innerHTML = entity.conflict;
	document.getElementById("data").innerHTML = entity.data;
}
setInterval(conflictHarvest, 1000);

function capePowerComparator(a, b){
	return parseInt(a.price, 10) - parseInt(b.price, 10);
}


function postCapes(){
	for (var i = entity.capePopulation.length - 1; i >= 0; i--) {
		c = entity.capePopulation[i];
		element = document.querySelectorAll("td:nth-of-type(" + (i+1) + ") ul");
		element[0].innerHTML = "<li>Name: "+ c.name +"</li><li>Class: "+ c.ability +"</li><li>Power: "+ c.power +"</li><li>Survivability: "+ c.health +"</li>";
	}
}

setInterval(postCapes, 1000);
