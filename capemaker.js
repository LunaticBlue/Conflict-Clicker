abilityClasses = ["Brute", "Breaker", "Mover", "Shaker", "Stranger", "Thinker", "Master", "Blaster", "Striker", "Trump", "Tinker", "Changer",]
abilityPowermods = [5, 0, 1, 3, 1, 1, 5, 5, 7, 0, 0, 3,]
abilityHealthmods = [5, 0, 7, 3, 7, 1, 1, 3, 1, 0, 0, 5,]
var newCape = {
	power: 0,
	health: 0,
	class: null,
	age:0,
	generate: function(){
		this.power = Math.floor(Math.random() * 10) + 1;
		this.health = Math.floor(Math.random() * 10) + 1;
		abilityIndex = Math.floor(Math.random()*12);
		this.class = abilityClasses[abilityIndex];
		this.power += abilityPowermods[abilityIndex];
		this.health += abilityHealthmods[abilityIndex];
	}
}

powerguy = newCape;
powerguy.generate();
console.log("Name: John Doe, Power = " + powerguy.power + " Survivability = " + powerguy.health + ", classification: " + powerguy.class);

document.getElementById("power").innerHTML = "Power: " + powerguy.power;
document.getElementById("classification").innerHTML = powerguy.class;
document.getElementById("name").innerHTML = "John Doe";
document.getElementById("health").innerHTML = "Survivability: " + powerguy.health;




