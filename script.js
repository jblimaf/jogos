const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const snakeSpeed = 150;
const snake = [{ x: 5, y: 5 }];
const food = { x: 10, y: 10 };
let direction = "right";

function drawSnakePart(part) {
    ctx.fillStyle = "green";
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y -= 1;
            break;
        case "down":
            head.y += 1;
            break;
        case "left":
            head.x -= 1;
            break;
        case "right":
            head.x += 1;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        // Snake ate the food
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    const maxX = canvas.width / gridSize;
    const maxY = canvas.height / gridSize;
    food.x = Math.floor(Math.random() * maxX);
    food.y = Math.floor(Math.random() * maxY);
}

function checkCollision() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= canvas.width / gridSize ||
        head.y < 0 || head.y >= canvas.height / gridSize) {
        return true;
    }

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert("Game Over! Press OK to restart.");
        location.reload();
    }

    drawFood();
    snake.forEach(drawSnakePart);
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    switch (key) {
        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;
        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
    }
});

generateFood();
const gameInterval = setInterval(gameLoop, snakeSpeed);
