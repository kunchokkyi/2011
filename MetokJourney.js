function setup() {
  createCanvas(400, 400);
}

let gameState = "start";


function draw() {
  background(220);
  
}
let methok;
let coinImg;
let coins = [];
let storyIndex = 0;
let story = [
  "Methok lived in a poor village in Tibet.",
  "She dreamed of becoming a successful computer scientist.",
  "One morning, she began her long walk north. And met a poor guy in disguise that helped her.",
  "She got into MIT and became a compuster scientist ",
  "She went back to improve her village and support tibetan people",
  "Each coin she found told a piece of her story."
];

let showMessage = false;
let messageTimer = 0;
let bgColor;

let player = {
  x: 50,
  y: 250,
  size: 40
};

function preload() {
  methok = loadImage("Methok.png");
  coinImg = loadImage("Coin.png");
}
function setup() {
  createCanvas(600, 400);
  bgColor = color(200, 230, 250);

  coins = [
    { x: 150, y: 350, collected: false },
    { x: 250, y: 250, collected: false },
    { x: 350, y: 350, collected: false },
    { x: 450, y: 250, collected: false },
    { x: 550, y: 350, collected: false },
    { x: 150, y: 250, collected: false } 
  ];

  noSmooth();
}

function showStartScreen() {
  background(50, 100, 150);

  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Methok's Journey", width / 2, height / 2 - 40);

  textSize(16);
  text("Press any key to Play", width / 2, height / 2 + 20);
}

function draw() {
  if (gameState === "start") {
    showStartScreen();
  } else if (gameState === "play") {
    background(bgColor);
    drawPath();
    drawCoins();
    drawPlayer();
    showStoryMessage();
  }
}

function drawPath() {
  fill(220, 220, 180); // dirt path color
  noStroke();
  beginShape();
  
  // Draw a straight line across the canvas at y = 250
  vertex(0, 250);  // Start at the left edge, y = 250
  vertex(600, 250); // End at the right edge, y = 250
  vertex(600, 400); // Move down to the bottom-right corner
  vertex(0, 400);   // Move to the bottom-left corner
  endShape(CLOSE);  // Close the shape
}

function drawPlayer() {
  let nextX = player.x;
  let nextY = player.y;

  if (keyIsDown(LEFT_ARROW)) nextX -= 2;
  if (keyIsDown(RIGHT_ARROW)) nextX += 2;
  if (keyIsDown(UP_ARROW)) nextY -= 2;
  if (keyIsDown(DOWN_ARROW)) nextY += 2;

  if (isOnPath(nextX, nextY)) {
    player.x = nextX;
    player.y = nextY;
  }

  image(methok, player.x, player.y, player.size, player.size);
}

function isOnPath(x, y) {
  let c = get(x + player.size / 2, y + player.size / 2);
  return c[0] === 220 && c[1] === 220 && c[2] === 180;
}

function drawCoins() {
  let allCollected = true;

  for (let i = 0; i < coins.length; i++) {
    if (!coins[i].collected) {
      allCollected = false;
      image(coinImg, coins[i].x, coins[i].y, 30, 30);

      if (dist(player.x, player.y, coins[i].x, coins[i].y) < 30) {
        coins[i].collected = true;
        storyIndex = i;
        showMessage = true;
        messageTimer = millis();
      }
    }
  }
}

function showStoryMessage() {
  if (showMessage && storyIndex < story.length) {
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(50, height - 80, width - 100, 60, 10);
    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(story[storyIndex], width / 2, height - 50);

    if (millis() - messageTimer > 3000) {
      showMessage = false;
    }
  }
}
function keyPressed() {
  if (gameState === "start") {
    gameState = "play";
  }
}

function mousePressed() {
  if (gameState === "start") {
    gameState = "play";
  }
}

