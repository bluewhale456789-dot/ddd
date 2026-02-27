// ------------------ CANVAS SETUP ------------------
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = 800;
const HEIGHT = 500;

// ------------------ GAME VARIABLES ------------------
let score = 0;
let resultText = "";

// ------------------ PEOPLE LIST ------------------
const people = [
    ["Ariana Grande", 22, "Ariana grande.webp"],
    ["Lionel Messi", 35, "MESSI.jpg"],
    ["Kai Cenat", 12, "kai.jpg"],
    ["Kevin Hart", 28, "kevinhart.jpg"],
    ["MrBeast", 55, "mrbeast.jpg"],
    ["IShowSpeed", 8, "IshowSpeed.jpg"],
    ["Drake", 14, "drake.png"],
    ["Taylor Swift", 45, "png-clipart-taylor-swift-taylor-swift-1-thumbnail.png"],
    // (your full list goes here)
];

// ------------------ RANDOM SELECTION ------------------
function getRandomPerson(exclude) {
    let p = people[Math.floor(Math.random() * people.length)];
    while (p === exclude) {
        p = people[Math.floor(Math.random() * people.length)];
    }
    return p;
}

let left = getRandomPerson(null);
let right = getRandomPerson(left);

// ------------------ BUTTONS ------------------
const lowerBtn = { x: 150, y: 380, w: 200, h: 60 };
const higherBtn = { x: 450, y: 380, w: 200, h: 60 };

// ------------------ IMAGE LOADER ------------------
function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

// ------------------ DRAW BUTTON ------------------
function drawButton(btn, color, text) {
    ctx.fillStyle = color;
    ctx.fillRect(btn.x, btn.y, btn.w, btn.h);

    ctx.fillStyle = "white";
    ctx.font = "26px Arial";
    ctx.fillText(text, btn.x + 60, btn.y + 38);
}

// ------------------ GAME LOOP ------------------
function draw() {
    ctx.fillStyle = "#141414";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // SCORE (moved high up)
    ctx.fillStyle = "white";
    ctx.font = "28px Arial";
    ctx.fillText("Score: " + score, 20, 40);

    // NAMES (moved down)
    ctx.font = "26px Arial";
    ctx.fillText(left[0], 120, 100);
    ctx.fillText(right[0], 520, 100);

    // IMAGES (centered vertically)
    const leftImg = loadImage(left[2]);
    const rightImg = loadImage(right[2]);

    ctx.drawImage(leftImg, 100, 130, 200, 200);
    ctx.drawImage(rightImg, 500, 130, 200, 200);

    // VS (perfect center)
    ctx.fillStyle = "gray";
    ctx.font = "34px Arial";
    ctx.fillText("VS", WIDTH / 2 - 20, 240);

    // RESULT TEXT
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(resultText, WIDTH / 2 - 60, 320);

    // BUTTONS
    drawButton(lowerBtn, "red", "Lower");
    drawButton(higherBtn, "green", "Higher");

    requestAnimationFrame(draw);
}

draw();

// ------------------ CLICK HANDLER ------------------
canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    function inside(btn) {
        return mouseX > btn.x && mouseX < btn.x + btn.w &&
               mouseY > btn.y && mouseY < btn.y + btn.h;
    }

    if (inside(higherBtn)) {
        if (right[1] >= left[1]) {
            score++;
            resultText = "Correct!";
        } else {
            score = 0;
            resultText = "Wrong!";
        }
        left = right;
        right = getRandomPerson(left);
    }

    if (inside(lowerBtn)) {
        if (right[1] <= left[1]) {
            score++;
            resultText = "Correct!";
        } else {
            score = 0;
            resultText = "Wrong!";
        }
        left = right;
        right = getRandomPerson(left);
    }
});
