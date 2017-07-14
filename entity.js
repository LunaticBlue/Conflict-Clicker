

//Cape Generator
var phIDs = 0
abilityClasses = ["Mover", "Shaker", "Brute", "Breaker", "Master", "Tinker", "Blaster", "Thinker", "Striker", "Changer", "Trump", "Stranger", ]
abilityPowermods = [1, 3, 5, 0, 5, 0, 5, 1, 7, 3, 0, 1,]  
abilityHealthmods = [7, 3, 5, 0, 1, 0, 3, 1, 1, 5, 0, 7,]
function cape(power, health, ability, age){
	this.phID = 0
	this.power = power;
	this.health = health;
	this.ability = ability;
	this.age = age;
	this.name = "Place Holder";
	this.posted = false;
	this.generate = function(){
		this.power = Math.floor(Math.random() * 10) + 1;
		this.health = Math.floor(Math.random() * 10) + 1;
		this.abilityIndex = Math.floor(Math.random()*12);
		this.ability = abilityClasses[this.abilityIndex];
		this.power += abilityPowermods[this.abilityIndex];
		this.health += abilityHealthmods[this.abilityIndex];
		this.phID = phIDs;
		phIDs += 1;
	}
	this.post = function(elem){
		elem.innerHTML += "<div class = 'capeContainer'id = 'ph" + this.phID + "'><p>Name: "+ this.name +", Class: "+ this.ability +", Power: "+ this.power +", Survivability: "+ this.health +" <button onclick='killCape("+this.phID+")' type='button'>Terminate</button></p></div>";
		this.posted = true;
	}
	this.die = function(){
		document.getElementById("ph"+ this.phID +"").innerHTML = "";
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
	capePurge: function(){
		for (var i = this.capePopulation.length - 1; i >= 0; i--) {
			if(this.capePopulation[i] == undefined){
				this.capePopulation.splice(i,1);
			}
		}
		this.capes = this.capePopulation.length;
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
	}
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
		element = document.getElementById("tabs-"+ (c.abilityIndex+1));
		if(c.posted === false){
			c.post(element);
		}
	}
}
setInterval(postCapes, 1000);

function killCape(id){
	for (var i = entity.capePopulation.length - 1; i >= 0; i--) {
		if (entity.capePopulation[i].phID === id){
			entity.capePopulation[i].die();
			delete entity.capePopulation[i];
		}
	}
	entity.capePurge();
	document.getElementById("capes").innerHTML = entity.capes;	
}
function tabCountUpdate(){
	lst = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
	elems = document.querySelectorAll(".tab span");
	for (var i = entity.capePopulation.length - 1; i >= 0; i--) {
		lst[entity.capePopulation[i].abilityIndex] += 1;
		elems[entity.capePopulation[i].abilityIndex].innerHTML = "(" + lst[entity.capePopulation[i].abilityIndex] + ")";
	}
}
setInterval(tabCountUpdate, 1000);
