let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isRunning = false;

const timeDisplay = document.getElementById('time');
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');
const cards = document.querySelectorAll('.card');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
            }
        }, 1000);
        isRunning = true;
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function increaseTime() {
    timeLeft += 300; // 5 minutes in seconds
    updateDisplay();
}

function decreaseTime() {
    if (timeLeft > 300) {
        timeLeft -= 300; // 5 minutes in seconds
        updateDisplay();
    }
}

playButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
increaseButton.addEventListener('click', increaseTime);
decreaseButton.addEventListener('click', decreaseTime);

cards.forEach(card => {
    card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const sound = new Audio(card.getAttribute('data-sound'));
        sound.play();
    });
});

updateDisplay();
