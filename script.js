const canvas = document.querySelector(".canvas");
const header = document.querySelector(".header");
const contextMenu = document.querySelector(".context-menu");
const menuItems = document.querySelectorAll(".menu-item");
const successState = document.querySelectorAll(".success-state");
const startModal = document.querySelector(".start-modal-container");
const endModal = document.querySelector(".end-modal-container");
const gameEndTime = document.querySelector(".game-endtime");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const gameTimer = document.querySelector(".game-timer");
let posX = 0,
    posY = 0;
let interval;
let timer = 0;

startBtn.addEventListener("click", () => {
    document.body.classList.remove("modal-open");
    startModal.classList.remove("modal-open");
    startGame();
});

resetBtn.addEventListener("click", () => {
    document.body.classList.remove("modal-open");
    endModal.classList.remove("modal-open");
    startGame();
});

header.addEventListener("click", () => {
    contextMenu.classList.remove("active");
});

// Move context menu to position clicked on the canvas
canvas.addEventListener("click", (e) => {
    posX = (e.offsetX * 100) / canvas.clientWidth;
    posY = (e.offsetY * 100) / canvas.clientHeight;
    contextMenu.style.top = posY + "%";
    contextMenu.style.left = posX + "%";
    contextMenu.classList.add("active");
});

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        contextMenu.classList.remove("active");

        if (waldoArr[index].didTouch(posX, posY)) {
            successState[index].classList.add("success");
            if (checkCompletion()) {
                endGame();
            }
        }
    });
});

// Check if all three character is found
function checkCompletion() {
    let count = 0;
    successState.forEach((item) => {
        if (item.classList.contains("success")) {
            count++;
        }
    });
    if (count === 3) {
        return true;
    }
    return false;
}

function startGame() {
    scrollToTop();
    resetScore();
    timer = 0;
    gameTimer.textContent = "0:00";
    interval = setInterval(() => {
        timer += 1;
        gameTimer.textContent = durationToClock(timer);
    }, 1000);
}

function endGame() {
    document.body.classList.add("modal-open");
    endModal.classList.add("modal-open");
    gameEndTime.textContent = durationToClock(timer);
    clearInterval(interval);
}

function resetScore() {
    successState.forEach((item) => {
        item.classList.remove("success");
    });
}

// Convert duration into clock timer
function durationToClock(value) {
    let timer = {
        minute: "0",
        second: "0",
    };
    if (value < 10) {
        timer.second = value.toString();
    } else if (value < 60) {
        timer.second = value.toString();
    } else if (value > 60) {
        timer.minute = Math.floor(value / 60).toString();
        timer.second = (value % 60).toString();
    }
    if (timer.second < 10) {
        timer.second = "0" + timer.second;
    }

    return `${timer.minute}:${timer.second}`;
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

// Waldo Object
class Waldo {
    constructor(lowX, highX, lowY, highY) {
        this.lowX = lowX;
        this.highX = highX;
        this.lowY = lowY;
        this.highY = highY;
    }
    didTouch(currentX, currentY) {
        const inRangeX = currentX > this.lowX && currentX < this.highX;
        const inRangeY = currentY > this.lowY && currentY < this.highY;

        if (inRangeX && inRangeY) {
            return true;
        } else {
            return false;
        }
    }
}
const mario = new Waldo(87.9, 92.25, 48.9, 51.1);
const megaman = new Waldo(27.9, 30.9, 56.6, 59.11);
const donkeykong = new Waldo(15.5, 21.38, 51.96, 54.16);
const waldoArr = [mario, megaman, donkeykong];
