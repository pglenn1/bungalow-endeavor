document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guess');
    const submitButton = document.getElementById('submitGuess');
    const resultParagraph = document.getElementById('result');
    const restartButton = document.getElementById('restartGame');

    let randomNumber = generateRandomNumber();
    let attempts = 0;

    submitButton.addEventListener('click', () => {
        const userGuess = Number(guessInput.value);
        attempts++;

        if (userGuess === randomNumber) {
            resultParagraph.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
            resultParagraph.style.color = 'green';
            restartButton.style.display = 'inline-block';
            submitButton.disabled = true;
        } else if (userGuess < randomNumber) {
            resultParagraph.textContent = 'Too low! Try again.';
            resultParagraph.style.color = 'red';
        } else if (userGuess > randomNumber) {
            resultParagraph.textContent = 'Too high! Try again.';
            resultParagraph.style.color = 'red';
        }
    });

    restartButton.addEventListener('click', () => {
        randomNumber = generateRandomNumber();
        attempts = 0;
        resultParagraph.textContent = '';
        guessInput.value = '';
        submitButton.disabled = false;
        restartButton.style.display = 'none';
    });

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }
});
