/*
  Alrighty so we are going to get started with building a player class that will have the default Jedi params.
  There will also be an Epic Jedi that will be able to a multiplier
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

/*
  Below are player objects that we will be using... Each player with their own unique.... skills
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
  return playerName
}


//This is going to be able to assaign in global and not just availble in the game manager method
let player;

let enemy;

let jediName;



// player = playerSelector(listOfPlayers, 'Yoda');
// player = new EpicPlayerJedi(player);
// console.log(player.name)


/*
  Game Manager

*/

const gameManager = {
  setGameStart: function(jediName){
    this.resetPlayer(jediName);
    this.setPreFight(jediName);
    // this.name = jediName
    // console.log(this.name)
    // this.setFight(jediName)
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
    getInterface.innerHTML = `
        <img src="img/${jediName.toLowerCase()}.jpeg" class="img-avatar">
        <div>
        <h3>${jediName}</h3>
        <p class="health-player">Health: ${player.health}</p>
        <p>Force Attack: ${player.forceAttack}</p>
        <p>Multiplier: ${player.attackMult ? player.attackMult : 'struggle'}</p>
        </div>`

  },
  setPreFight: function(jediName){
    const jedi = jediName;
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
    console.log('pls' + jediName.name)
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









































