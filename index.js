const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const $sprite = document.querySelector("#sprite");
const $brickes = document.querySelector("#bricks");

canvas.width = 440;
canvas.height = 512;

//variables de nuestro juegos
let counter = 0;

//variables de la pelota
const ballRadius = 3;
let x = canvas.width / 2;
let y = canvas.height - 30;
//velocidad de la pelota
let dx = 3;
let dy = -3;
//Variables de la paleta
const paddleHight = 10;
const paddlewidth = 50;

let paddleX = (canvas.width - paddlewidth) / 2;
let paddleY = canvas.height - paddleHight - 10;

let rightPressed = false;
let leftPressed = false;

//variables de los ladrillos
const brickRowCount = 6;
const brickCollumnCount = 13;
const brickWitdht = 30;
const brickHeight = 14;
const brickPadding = 0;
const brickOffsetTop = 80;
const brickOffsetLeft = 16;
const bricks = [];

const BRICK_STATUS = {
  ACTIVE: 1,
  DESTROY: 0,
};

for (let c = 0; c < brickCollumnCount; c++) {
  bricks[c] = []; //inicializamos con un array vacio
  for (let r = 0; r < brickRowCount; r++) {
    //calculamos la posicion del ladrillo en la pantalla
    const brickX = c * (brickWitdht + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    //asignar un color aletorio a cada ladrillo
    const random = Math.floor(Math.random() * 8);
    //este truquilla es bastante importante que los tengas en la memoria
    //guarda la impormacion de cada ladrillo
    bricks[c][r] = {
      x: brickX,
      y: brickY,
      status: BRICK_STATUS.ACTIVE,
      color: random,
    };
  }
}

const DADDLE_SENSIBILITY = 8;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.drawImage(
    $sprite, //imagen
    29, //clicx: donde empieza a recortar
    174, //clicY: donde empiesa a recortar
    paddlewidth, //el tamaño del recorte
    paddleHight, //tamaño del recorte
    paddleX, //posicion x del dibujo
    paddleY, //posicion y del dibujo
    paddlewidth, //ancho del dibujo
    paddleHight //elto del dibujo
  );
}
function drawBricks() {
  for (let c = 0; c < brickCollumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const currentBrick = bricks[c][r];
      if (currentBrick.status === BRICK_STATUS.DESTROY) continue;

      // ctx.fillStyle = "yellow";
      // ctx.rect(currentBrick.x, currentBrick.y, brickWitdht, brickHeight);
      // ctx.stroke();
      // ctx.fill();
      const clickX = currentBrick.color * 32;
      ctx.drawImage(
        $brickes,
        clickX,
        0,
        31,
        14,
        currentBrick.x,
        currentBrick.y,
        brickWitdht,
        brickHeight
      );
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickCollumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const currentBrick = bricks[c][r];
      if (currentBrick.status === BRICK_STATUS.DESTROY) continue;
      const isBallSameXAsBrick =
        x > currentBrick.x && x < currentBrick.x + paddlewidth;
      const isBallSameYAsBrick =
        y > currentBrick.y && y < currentBrick.y + paddleHight;
      if (isBallSameXAsBrick && isBallSameYAsBrick) {
        dy = -dy;
        currentBrick.status = BRICK_STATUS.DESTROY;
      }
    }
  }
}
function ballMovement() {
  //rebotar las pelotas en los laterales
  if (
    x + dx > canvas.width - ballRadius || //la pared derecho
    x + dx < ballRadius //la pared izquierda
  ) {
    dx = -dx;
  }
  //rebotar en la parte de arriba
  const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddlewidth;

  const isBallTouchingPaddle = y + dy > paddleY;
  if (isBallSameXAsPaddle && isBallTouchingPaddle) {
    dy = -dy; //cambia la direccion de la pelota
  }
  //la pelto toca el suela
  else if (y + dy < ballRadius) {
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
function paddleMovement() {
  if (rightPressed && paddleX < canvas.width - paddlewidth) {
    paddleX += DADDLE_SENSIBILITY;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= DADDLE_SENSIBILITY;
  }
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvent() {
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function keyDownHandler(event) {
    const { key } = event;
    if (key === "right" || key === "ArrowRight") {
      rightPressed = true;
    } else if (key === "Left" || key === "ArrowLeft") {
      leftPressed = true;
    }
  }
  function keyUpHandler(event) {
    const { key } = event;
    if (key === "right" || key === "ArrowRight") {
      rightPressed = false;
    } else if (key === "Left" || key === "ArrowLeft") {
      leftPressed = false;
    }
  }
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
initEvent();
