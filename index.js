/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var score = 0;
var gameInterval = true;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top);

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge+40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge+20;

    if (rockRightEdge > dodgerLeftEdge && rockLeftEdge < dodgerRightEdge) {
      return true;
    }

    return false;
  }
  return false;
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = -20

  rock.style.top = top

  GAME.appendChild(rock);


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
    var speed = 0;
    function step() {
      rock.style.top = `${top += speed}px`
      if (top < GAME_HEIGHT) {
        if (checkCollision(rock)){
          endGame();
        }
        speed += 0.3
        window.requestAnimationFrame(step)
      }
      else{
        delete rock;
        rock.remove();
        if(gameInterval){
        score++;
        }
        document.getElementById('score').innerHTML = score;
      }
    }

    window.requestAnimationFrame(step)
   }
  ROCKS.push(rock)
  moveRock();

  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  gameInterval = false;
  window.removeEventListener('keydown', moveDodger);
  for (let i=0; i<ROCKS.length; i++){
    ROCKS[i].remove();
    delete ROCKS[i];
  }
  setTimeout(function(){alert(`YOU LOST WITH A SCORE OF ${score}`);},30);
}

function moveDodger(e) {
    if (e.which === 37) {
      e.stopPropagation();
      e.preventDefault();
      moveDodgerLeft();
    }else if (e.which === 39){
      e.stopPropagation();
      e.preventDefault();
      moveDodgerRight();
    }
}

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);

  if (left > 0) {
    DODGER.style.left = `${left - 12}px`;
  }
}

function moveDodgerRight() {
  var leftNumbers = DODGER.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);

  if (left < 360) {
    DODGER.style.left = `${left + 12}px`;
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger);
  document.querySelector('#game p').id = 'score';

  START.style.display = 'none'


  function repeat() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
    setTimeout(function() {
      if (gameInterval) {
        repeat();
      }
    }, Math.max(Math.floor(1200-Math.log10(score+1)*600),0) + Math.floor(Math.random()*300));
  }
  repeat();

}
