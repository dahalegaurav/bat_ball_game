const gameContainer = document.getElementById('game-container');
  const bat = document.getElementById('bat');
  const ball = document.getElementById('ball');
  const scoreValue = document.getElementById('score-value');
  const popup = document.getElementById('popup');
  const finalScore = document.getElementById('final-score');
  const startupPopup = document.getElementById('startup-popup');
  const startGameButton = document.getElementById('start-game-button');
  const restartButton = document.getElementById('restart-button');
  const gameWidth = gameContainer.offsetWidth;
  const gameHeight = gameContainer.offsetHeight;
  gameContainer.style.display = 'none';
  popup.style.display = 'none';
  let batX = gameWidth / 2;
  let ballX = gameWidth / 2;
  let ballY = gameHeight / 2;
  let ballSpeedX = 1;
  let ballSpeedY = 1;
  let score = 0;
  let startTime = null;
  let isGameRunning = false;
  window.onload = function() {
    startupPopup.style.display = 'flex';
  };
  startGameButton.addEventListener('click', startGame);

    function startGame() {
    startupPopup.style.display = 'none';

    gameContainer.style.display = 'block';

    isGameRunning = true;
    requestAnimationFrame(updateGameArea);
    }
  function updateGameArea(timestamp) {
    if (!isGameRunning) {
      requestAnimationFrame(updateGameArea);
      return;
    }
  
    if (!startTime) startTime = timestamp;
    const elapsedTime = timestamp - startTime;
    startTime = timestamp;
  
    batX = Math.min(Math.max(mouseX - 50, 0), gameWidth - 100);
    bat.style.left = batX + 'px';
  
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  
    if (ballX < 0 || ballX > gameWidth - 40) {
      ballSpeedX = -ballSpeedX; 
    }
  
    if (ballY <= 0) {
      ballSpeedY = -ballSpeedY;
    }
  
    if (
      ballY + 20 >= gameHeight - 10 - 20 && 
      ballY + 20 <= gameHeight - 10 &&     
      ballX + 20 >= batX &&
      ballX <= batX + 100
    ) {
      ballSpeedY = -ballSpeedY;
      score++;
      scoreValue.textContent = score;
    }
  
    if (ballY >= gameHeight) {
      showPopup();
    }
  
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
  
    requestAnimationFrame(updateGameArea);
  }
  

  function resetBall() {
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    ballSpeedX = 5;
    ballSpeedY = 5;
  }

  let mouseX = 0;
  gameContainer.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - gameContainer.getBoundingClientRect().left;
  });

  function showPopup() {
    isGameRunning = false;
    popup.style.display = 'flex';
    finalScore.textContent = score;
  }

  function hidePopup() {

    isGameRunning = true;
    popup.style.display = 'none';
    resetBall();
    score = 0;
    scoreValue.textContent = score;
    startTime = null;
    window.location.reload();
    requestAnimationFrame(updateGameArea);
  }

  restartButton.addEventListener('click', hidePopup);

  requestAnimationFrame(updateGameArea);