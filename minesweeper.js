const image = document.getElementById("hidden");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const size = 50;
let x = 0;
let y = 0;

ctx.drawImage(image, x, y, size, size);
ctx.drawImage(image, x + size, y + size, size, size);