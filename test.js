// Obi-wan
let obi = new PlayerJedi({
  name: 'Obi-wan',
  forceAttack: 7,
  taunt: ['Eat your candy raw', 'No guts no glory']
});

// Yoda
let yoda = new EpicPlayerJedi({
  name: 'Yoda',
  forceAttack: 7,
  forceMult: 4,
  taunt: ['I bet you dont know math', 'You smell like luke']
})
// Rey
let Rey = new PlayerJedi({
  name: 'Rey',
  forceAttack: 5,
  taunt: ['Give me some gum', 'Move it or Die']
})
// Darth Maul
let darthMaul = new EpicPlayerJedi({
  name: 'Darth Maul',
  forceAttack: 7,
  forceMult: 3,
  taunt: ['You dont know anything about me', 'Get out of my way']
})
// Kylo Ren
let kyloRen = new PlayerJedi({
  name: 'Kylo Ren',
  forceAttack: 6,
  taunt: ['You are ungrateful', 'I will take back what is mine']
})




// // ================  Player Class ==============
// /*
//   This is what all players will have access to preety much...

//   We create a playerG variable because we are going to be using it to change it.
// */
// let playerG;

// class Player{
//   constructor(obj){
//     this.name = obj.name;
//     this.forceAttack = Math.ceil(Math.random() * obj.forceAttack);
//     this.health = 25;
//   }
// }

// // ================== Epic Status =================
// class EpicJediSith extends Player{
//   constructor(epicObj){
//     super(epicObj) // replaces call

//     this.attackMult = epicObj.forceMult;
//     this.forceAttack = Math.ceil((Math.random() * epicObj.forceAttack) * epicObj.forceMult)

//   }
// }

// // ================== Game Manager ================
// /*
//   This is going to be a method where it will preety much control the game...

//   creating 3 different methods inside our gameManager Object

//   @setGameStart - string - the player name

//   @resetPlayer - string - the player name
// */
// const gameManager = {
//   setGameStart: function(name){
//     this.resetPlayer(name);
//     this.setPreFight();
//   },
//   resetPlayer: function(name){
//
//     // create an interface varibale that links to index page that selects the interface section
//     let getInterface = document.querySelector('.interface');
//     getInterface.innerHTML =

//   },
//   setPreFight: function(){
//     let getHeader = document.querySelector('header');
//     let getActions = document.querySelector('.actions');

//     getHeader.innerHTML = `<p>Find an Enemy!</p>`
//     getActions.innerHTML = `<a href="#" class='btn-pre' onclick="gameManager.setFight()">Search for enemy</a>`

//   },
//   setFight: function(){
//     let getHeader = document.querySelector('header');
//     let getActions = document.querySelector('.actions');
//     let getEnemy = document.querySelector('.enemy');
//     // create enemy
//     let enemy00 = new Player({name: 'Rey', forceAttack: 4})
//   }
// }
