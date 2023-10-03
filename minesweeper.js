const image = document.getElementById("hidden");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const size = 50;
let x = 0;
let y = 0;
const columns = canvas.width / size;
const rows = canvas.height / size;

function draw(x, y) {
  ctx.drawImage(image, x, y, size, size);
}

function drawMap() {
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      draw(i * size, j * size);
    }
  }
}

drawMap();