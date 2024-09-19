document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const obstacle = document.getElementById('obstacle');
    const scoreElement = document.getElementById('score');

    let isJumping = false;
    let score = 0;
    let obstacleSpeed = 5;
    let jumpHeight = 0;

    function jump() {
        if (!isJumping) {
            isJumping = true;
            jumpHeight = 0;
            const jumpInterval = setInterval(() => {
                if (jumpHeight < 100) {
                    dino.style.bottom = `${20 + jumpHeight}px`;
                    jumpHeight += 10;
                } else {
                    clearInterval(jumpInterval);
                    const fallInterval = setInterval(() => {
                        if (jumpHeight > 0) {
                            dino.style.bottom = `${20 + jumpHeight}px`;
                            jumpHeight -= 10;
                        } else {
                            clearInterval(fallInterval);
                            dino.style.bottom = '20px';
                            isJumping = false;
                        }
                    }, 20);
                }
            }, 20);
        }
    }

    function checkCollision() {
        const dinoRect = dino.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        return (
            dinoRect.left < obstacleRect.right &&
            dinoRect.right > obstacleRect.left &&
            dinoRect.top < obstacleRect.bottom &&
            dinoRect.bottom > obstacleRect.top
        );
    }

    function moveObstacle() {
        let obstaclePosition = window.innerWidth;
        const obstacleInterval = setInterval(() => {
            if (obstaclePosition > -30) {
                obstaclePosition -= obstacleSpeed;
                obstacle.style.right = `${obstaclePosition}px`;

                if (checkCollision() && !isJumping) {
                    gameOver();
                }

                if (obstaclePosition <= 0) {
                    score += 10;
                    scoreElement.textContent = `Score: ${score}`;
                    obstaclePosition = window.innerWidth;
                    obstacleSpeed += 0.1; // Gradually increase speed
                }
            } else {
                clearInterval(obstacleInterval);
                moveObstacle();
            }
        }, 20);
    }

    function resetGame() {
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        obstacle.style.right = '-50px';
        obstacleSpeed = 5;
        document.getElementById('game-over').style.display = 'none';
    }

    function gameOver() {
        document.getElementById('final-score').textContent = score;
        document.getElementById('game-over').style.display = 'block';
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            jump();
        }
    });

    moveObstacle();
});
