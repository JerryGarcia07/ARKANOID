const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 440;
canvas.height = 512;

//variables de nuestro juegos
let counter = 0;

//variables de la pelota
const ballRadius = 4;
let x = canvas.width / 2;
let y = canvas.height - 30;
//velocidad de la pelota
let dx = 2;
let dy = -2;

function drawBall() {}
function drawPaddle() {}
function drawBricks() {}

function collisionDetection() {}
function ballMovement() {}
function paddleMovement() {}

function draw() {
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
