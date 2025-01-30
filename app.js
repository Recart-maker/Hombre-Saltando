const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 300, width: 30, height: 50, dy: 0, gravity: 0.5, jumping: false };
let obstacles = [];
let keys = {};

for (let i = 1; i <= 10; i++) {
    obstacles.push({ x: i * 200, y: 320, width: 30, height: 50 });
}

document.addEventListener("keydown", (e) => keys[e.code] = true);
document.addEventListener("keyup", (e) => keys[e.code] = false);

function update() {
    if (keys["ArrowUp"]) player.y -= 5;
    if (keys["ArrowDown"]) player.y += 5;
    if (keys["ArrowLeft"]) player.x -= 5;
    if (keys["ArrowRight"]) player.x += 5;
    if (keys["Space"] && !player.jumping) {
        player.dy = -10;
        player.jumping = true;
    }

    player.y += player.dy;
    player.dy += player.gravity;
    if (player.y >= 300) {
        player.y = 300;
        player.jumping = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    ctx.fillStyle = "red";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

