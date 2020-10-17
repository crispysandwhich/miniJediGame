/*
 Below is the player class this is basically going to be where you will create a jedi.
 It has two methods
  - jediDuel (takes an object) - creates a dueling effect
  - callOut (takes an object) - that gets the taunts of the jedi
*/

// ================= Player Class ==============
class PlayerJedi{
  constructor(obj){
    this.name = obj.name;
    this.forceAttack = Math.ceil(Math.random() * obj.forceAttack)
    this.health = 50;

    this.taunt = obj.taunt;
  }
  jediDuel(enemy){
    let playerHealth = document.querySelector('.health-player')
    let enemyHealth = document.querySelector('.health-enemy')

    // player attacks
    enemy.health -= this.forceAttack;

    alert(`You hit ${enemy.name} with ${this.forceAttack} force`)


    if(enemy.health <= 0){
      alert('You win refresh')

      playerHealth.innerHTML = 'Health: ' + this.health
      enemyHealth.innerHTML = 'Health: 0'
    }else{
      enemyHealth.innerHTML = 'Health: ' + enemy.health
      // enemy attacks
      this.health -= enemy.forceAttack;
      alert(`${enemy.name} hit you with ${enemy.forceAttack} force`)
      if(this.health <= 0){
        alert('You lost... refresh')
        enemyHealth.innerHTML = 'Health: ' + enemy.health
        playerHealth.innerHTML = 'Health: 0'
      }else{
        playerHealth.innerHTML = 'Health: ' + this.health
      }
    }


  }
  callOut(enemy){
    let randomNum = Math.floor(Math.random() * this.taunt.length);
    return `Hey ${enemy.name} , ${this.taunt[randomNum]}`
  }

}

// =============== Epic Player ==================
class EpicPlayerJedi extends PlayerJedi{
  constructor(epicObj){
    super(epicObj) // replaces call

    this.attackMult = epicObj.forceMult;
    this.forceAttack = Math.ceil((Math.random() * epicObj.forceAttack) * epicObj.forceMult);

  }
}

const listOfPlayers = [
  {
    name: 'Obi-wan',
    forceAttack: 7,
    taunt: ['Eat your candy raw', 'No guts no glory']
  },
  {
    name: 'Yoda',
    forceAttack: 7,
    forceMult: 4,
    taunt: ['I bet you dont know math', 'You smell like luke']
  },
  {
    name: 'Rey',
    forceAttack: 5,
    taunt: ['Give me some gum', 'Move it or Die']
  },
  {
    name: 'Darth Maul',
    forceAttack: 7,
    forceMult: 3,
    taunt: ['You dont know anything about me', 'Get out of my way']
  },
  {
    name: 'Kylo Ren',
    forceAttack: 6,
    taunt: ['You are ungrateful', 'I will take back what is mine']
  }
]
// ===================================================================================

/*
  This function selects takes in a player name and a player list of objects that are already pre made.
  The function goes through the playerList array looking if the jediName is the same as the player list name and then spits it out
*/
function playerSelector(objInsideArr, jediName){
  let playerName;

  objInsideArr.forEach((player) =>{
    if(jediName === player.name){
      playerName = player;
    }
  })

  return playerName;
}

// This needs some work
function enemySelector(obj,jediName){
  let playerName;
  const trash = [];
  let randomNum = Math.floor(Math.random() * obj.length);

  if(obj[randomNum].name != jediName){
    playerName = obj[randomNum]
  }else{
    trash.push(obj[randomNum])
    randomNum = Math.floor(Math.random() * obj.length);
    playerName = obj[randomNum]
  }

  // do while loop

  return playerName
}


/*
  These varaibles are for the global scope which will then be used inside the gameManager constructor
*/
let player;

let enemy;

let jediName;

/*
  Game Manager
  This is a constor function that will take in 4 methods
  - setGameStart - will take the jediName and pass it through the constructor
  - resetPlayer
    - will use the global player variable and assign it new Player object that will take in the function that will choose the jedi with the jediName given.
    -
*/

const gameManager = {
  setGameStart: function(jediName){
    this.resetPlayer(jediName);
    this.setPreFight();

  },
  // This will actually create our player in the game
  resetPlayer: function(jediName){

    if(jediName === 'Yoda'){
      player = new EpicPlayerJedi(playerSelector(listOfPlayers, jediName))
    }else if(jediName === 'Obi-wan'){
      player = new PlayerJedi(playerSelector(listOfPlayers, jediName))
    }else if(jediName === 'Rey'){
      player = new PlayerJedi(playerSelector(listOfPlayers, jediName))
    }else if(jediName === 'Darth Maul'){
      player = new EpicPlayerJedi(playerSelector(listOfPlayers, jediName))
    }else if(jediName === 'Kylo Ren'){
      player = new PlayerJedi(playerSelector(listOfPlayers, jediName))
    }

    // Grabbing the container with all the players
    let getInterface = document.querySelector('.interface');
    const fight = document.createElement('div');
    fight.className = 'innerInterface'
    getInterface.innerHTML = '';
    getInterface.appendChild(fight)
    fight.innerHTML = `
        <div>
          <img src="img/${jediName.toLowerCase()}.jpeg" class="img-avatar">
          <div>
          <h3>${jediName}</h3>
          <p class="health-player">Health: ${player.health}</p>
          <p>Force Attack: ${player.forceAttack}</p>
          <p>Multiplier: ${player.attackMult ? player.attackMult : 'struggle'}</p>
          </div>
        </div>`

  },
  setPreFight: function(jediName){
    let getHeader = document.querySelector('header')
    let getAction = document.querySelector('.actions')
    let getArena = document.querySelector('.arena');

    getHeader.innerHTML = `<p>Goal: Find an enemy and Destroy Enemy</p>`
    getAction.innerHTML = `<a href="#" class="btn-preFight" onclick="gameManager.setFight()">Search for enemy</a>`

    getArena.style.visibility = 'visible'
  },
  setFight: function(){
    let getHeader = document.querySelector('header')
    let getAction = document.querySelector('.actions')
    let getEnemy = document.querySelector('.enemy');
    jediName = player
    // console.log(jediName.jediDuel())
    // Generate Enemy
    enemy = new PlayerJedi(enemySelector(listOfPlayers,jediName));
    // console.log('pls' + jediName.name)
    getHeader.innerHTML = '<p>Attack or Taunt</p>'
    getAction.innerHTML = `<a href="#" class="btn-preFight" onclick="jediName.jediDuel(enemy)">Attack</a>`
    getEnemy.innerHTML = `
    <img src="img/${enemy.name.toLowerCase()}.jpeg" class="img-avatar">
    <div>
    <h3>${enemy.name}</h3>
    <p class="health-enemy">Health: ${enemy.health}</p>
    <p>Force Attack: ${enemy.forceAttack}</p>
    <p>Multiplier: ${enemy.attackMult ? enemy.attackMult : 'struggle'}</p>
    </div>`

  }
}

// console.log(gameManager.setGameStart)
// console.log(player.prototype.jediDuel())









































