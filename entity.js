

//Cape Generator
abilityClasses = ["Brute", "Breaker", "Mover", "Shaker", "Stranger", "Thinker", "Master", "Blaster", "Striker", "Trump", "Tinker", "Changer",]
abilityPowermods = [5, 0, 1, 3, 1, 1, 5, 5, 7, 0, 0, 3,]
abilityHealthmods = [5, 0, 7, 3, 7, 1, 1, 3, 1, 0, 0, 5,]
function cape(power, health, ability, age){
	this.power = power;
	this.health = health;
	this.ability = ability;
	this.age = age;
	this.generate = function(){
		this.power = Math.floor(Math.random() * 10) + 1;
		this.health = Math.floor(Math.random() * 10) + 1;
		abilityIndex = Math.floor(Math.random()*12);
		this.ability = abilityClasses[abilityIndex];
		this.power += abilityPowermods[abilityIndex];
		this.health += abilityHealthmods[abilityIndex];
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
	entity.capeGather();
	document.getElementById("capes").innerHTML = entity.capes;
	document.getElementById("data").innerHTML = entity.data;
	var capeHolder = new cape(0,0,0,0);
	capeHolder.generate();
	entity.capePopulation.push(capeHolder);
	//temporary
	document.getElementById("power").innerHTML = "Power: " + entity.capePopulation[0].power;
	document.getElementById("classification").innerHTML = entity.capePopulation[0].ability;
	document.getElementById("name").innerHTML = "John Doe";
	document.getElementById("health").innerHTML = "Survivability: " + entity.capePopulation[0].health;
}


