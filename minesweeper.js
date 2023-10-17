const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const actionButton = document.getElementById("action-button"); 

const size = 50;
let x = 0;
let y = 0;
const columns = canvas.width / size;
const rows = canvas.height / size;
const mine = "mine";
const mineCount = 20;
const images = {
  "hidden" : document.getElementById("hidden"),
  "mine" : document.getElementById("mine"),
  "0" : document.getElementById("field-0"),
  "1" : document.getElementById("field-1"),
  "2" : document.getElementById("field-2"),
  "3" : document.getElementById("field-3"),
  "4" : document.getElementById("field-4"),
  "5" : document.getElementById("field-5"),
  "6" : document.getElementById("field-6"),
  "7" : document.getElementById("field-7"),
  "8" : document.getElementById("field-8"),
}; 

let firstClick = true;
let isGameOver = false;

const buttons = {
  start: "assets/button-start.png",
  lost: "assets/button-lost.png",
  won: "assets/button-won.png",  
};

let map = createMap(0);
let exploreMap = createMap(false);
drawMap();

canvas.addEventListener("click", function(event) {
  if (isGameOver) return;
  const x = event.offsetX;
  const y = event.offsetY;
  const row = Math.floor(y / size);
  const col = Math.floor(x / size);
  if (firstClick) {
    placeMines(map, mineCount, row, col);
    calculateFieldValues(map);
    firstClick = false;
  }
  exploreField(row, col);
  drawMap();
  if (map[row][col] === mine) {
    isGameOver = true;
    actionButton.src = buttons.lost;
  }
});

function exploreField(row, col) {
  if (exploreMap[row][col] === false) {
    exploreMap[row][col] = true;
    if (map[row][col] === 0) {
      let neighborCoordinates = findNeighborField(map, row, col);
      for (let i = 0; i < neighborCoordinates.length; i++) {
        let neighbor = neighborCoordinates[i];
        exploreField(neighbor.row, neighbor.col);
      }
    }
  }
}

function calculateFieldValues(map) {
  for(let rowI = 0; rowI < rows; rowI++) {
    for(let colI = 0; colI < columns; colI++) {
      let field = map[rowI][colI];
      if(field !== mine) {
        let neighborCoordinates = findNeighborField(map, rowI, colI);
        let mines = countMines(map, neighborCoordinates);
        map[rowI][colI] = mines;
      }
    } 
  }
};

function findNeighborField(map, rowI, colI) {
  let neighborCoordinates = [];
  for(let row = rowI - 1; row <= rowI + 1; row++) {
    for(let col = colI - 1; col <= colI + 1; col++) {
      if(row >= 0 && row < rows && col >= 0 && col < columns) {
        if(row !== rowI || col !== colI) {
        neighborCoordinates.push({row: row, col: col});
        }
      }
    }
  } 
  return neighborCoordinates;
}

function countMines(map, neighborCoordinates) {
  let mines = 0;
  for(let i = 0; i < neighborCoordinates.length; i++) {
    let neighbor = neighborCoordinates[i];
    if(map[neighbor.row][neighbor.col] === mine) {
      mines++;
    }
  }
  return mines;
}


function placeMines(map, mineCount, firstRow, firstCol) {
  let mines = 0;
  while(mines < mineCount) {
    let x = Math.floor(Math.random() * columns);
    let y = Math.floor(Math.random() * rows);
    if (x !== firstCol && y !== firstRow && map[y][x] !== mine) {
      map[y][x] = mine;
      mines++;
    }
  }
}


function createMap(defaultValue) {
  let map = [];
  for (let j = 0; j < rows; j++) {
    let row = [];
    for (let i = 0; i < columns; i++) {
      row[i] = defaultValue;
    }
    map[j] = row;
  }
  return map;
}



function draw(image, x, y) {
  ctx.drawImage(image, x, y, size, size);
}

function drawMap() {
  for (let rowI = 0; rowI < rows; rowI++) {
    for (let colI = 0; colI < columns; colI++) {
      if(exploreMap[rowI][colI] === false) {
        draw(images["hidden"], colI * size, rowI * size);
      } else {
      let field = map[rowI][colI];
      draw(images[field], colI * size, rowI * size);
      }      
    }
  }
}

