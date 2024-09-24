let dino = document.getElementById('dino');
let scoreDisplay = document.getElementById('score');
let gameOverDisplay = document.getElementById('game-over');
let finalScoreDisplay = document.getElementById('final-score');
let score = 0;
let isJumping = false;
let obstacles = [];
let obstacleCount = 3; // Number of obstacles

function jump() {
    if (isJumping) return;
    isJumping = true;
    dino.classList.add('jump');

    setTimeout(() => {
        dino.classList.remove('jump');
        isJumping = false;
    }, 500);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') { // Ensure jump is triggered by spacebar
        jump();
    }
});

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.right = '-30px'; // Start off-screen from the right
    document.querySelector('.game-container').appendChild(obstacle);
    obstacles.push(obstacle);
    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    let obstacleInterval = setInterval(() => {
        let rightPosition = parseInt(obstacle.style.right);
        if (rightPosition >= window.innerWidth) {
            obstacle.remove();
            clearInterval(obstacleInterval);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        } else {
            obstacle.style.right = `${rightPosition + 5}px`; // Move left across the screen
        }
        checkCollision(obstacle, obstacleInterval);
    }, 20);
}

function checkCollision(obstacle, obstacleInterval) {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        dinoRect.x < obstacleRect.x + obstacleRect.width &&
        dinoRect.x + dinoRect.width > obstacleRect.x &&
        dinoRect.y < obstacleRect.y + obstacleRect.height &&
        dinoRect.y + dinoRect.height > obstacleRect.y
    ) {
        gameOverDisplay.style.display = 'block';
        finalScoreDisplay.textContent = score;
        obstacles.forEach(obs => obs.remove()); // Remove all obstacles
        clearInterval(obstacleInterval); // Stop moving obstacle
    }
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    gameOverDisplay.style.display = 'none';
    obstacles.forEach(obs => obs.remove()); // Remove existing obstacles
    obstacles = []; // Reset obstacles array

    for (let i = 0; i < obstacleCount; i++) {
        createObstacle();
    }
}

function resetGame() {
    startGame();
}

// Start generating obstacles every 1 second
setInterval(createObstacle, 1000);
