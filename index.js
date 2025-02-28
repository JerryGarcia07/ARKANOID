const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 440;
canvas.height = 512;

//variables de nuestro juegos
let counter = 0;

//variables de la pelota
const ballRadius = 3;
let x = canvas.width / 2;
let y = canvas.height - 30;
//velocidad de la pelota
let dx = 2;
let dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {}
function drawBricks() {}

function collisionDetection() {}
function ballMovement() {
  //rebotar las pelotas en los laterales
  if (
    x + dx > canvas.width - ballRadius || //la pared derecho
    x + dx < ballRadius //la pared izquierda
  ) {
    dx = -dx;
  }
  //rebotar en la parte de arriba
  if (y + dy < ballRadius) {
    dy = -dy;
  }

  //si tocan la parte inferiro

  if (y + dy > canvas.height - ballRadius) {
    console.log("game over");
    document.location.reload();
  }

  x += dx;
  y += dy;
}
function paddleMovement() {}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  cleanCanvas();
  //hay que deibujar los elemenots
  drawBall();
  drawPaddle();
  drawBricks();

  //collisones y movimientos
  collisionDetection();
  ballMovement();
  paddleMovement();

  window.requestAnimationFrame(draw);
}

draw();
