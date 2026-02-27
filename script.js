// ------------------ CANVAS SETUP ------------------
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ------------------ GAME VARIABLES ------------------
let score = 0;
let resultText = "";

// ------------------ PEOPLE LIST ------------------
const people = [
    ["Selena Gomez", 29, "selena.jpg"],
    ["SZA", 18, "sza.jpg"],
    ["Ariana Grande", 22, "Ariana grande.webp"],
    ["Lionel Messi", 35, "MESSI.jpg"],
    ["Kai Cenat", 12, "kai.jpg"],
    ["Kevin Hart", 28, "kevinhart.jpg"],
    ["MrBeast", 55, "mrbeast.jpg"],
    ["IShowSpeed", 8, "IshowSpeed.jpg"],
    ["Drake", 14, "drake.png"],
    ["Taylor Swift", 45, "png-clipart-taylor-swift-taylor-swift-1-thumbnail.png"]
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

// ------------------ IMAGE LOADER ------------------
function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

// ------------------ DRAW BUTTON ------------------
function drawButton(x, y, w, h, color, text) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = "white";
    ctx.font = `${h * 0.45}px Arial`;
    ctx.fillText(text, x + w * 0.25, y + h * 0.65);
}

// ------------------ GAME LOOP ------------------
function draw() {
    const W = canvas.width;
    const H = canvas.height;

    ctx.fillStyle = "#141414";
    ctx.fillRect(0, 0, W, H);

    // Dynamic sizes
    const imgSize = Math.min(W, H) * 0.28;
    const topMargin = H * 0.15;

    // SCORE
    ctx.fillStyle = "white";
    ctx.font = `${H * 0.05}px Arial`;
    ctx.fillText("Score: " + score, 20, H * 0.08);

    // NAMES
    ctx.font = `${H * 0.045}px Arial`;
    ctx.fillText(left[0], W * 0.18, topMargin);
    ctx.fillText(right[0], W * 0.68, topMargin);

    // IMAGES
    const leftImg = loadImage(left[2]);
    const rightImg = loadImage(right[2]);

    ctx.drawImage(leftImg, W * 0.1, topMargin + 20, imgSize, imgSize);
    ctx.drawImage(rightImg, W * 0.6, topMargin + 20, imgSize, imgSize);

    // VS (centered)
    ctx.fillStyle = "gray";
    ctx.font = `${H * 0.06}px Arial`;
    ctx.fillText("VS", W / 2 - 20, H / 2);

    // RESULT TEXT
    ctx.fillStyle = "white";
    ctx.font = `${H * 0.05}px Arial`;
    ctx.fillText(resultText, W / 2 - 60, H * 0.65);

    // BUTTONS
    drawButton(W * 0.15, H * 0.75, W * 0.25, H * 0.12, "red", "Lower");
    drawButton(W * 0.60, H * 0.75, W * 0.25, H * 0.12, "green", "Higher");

    requestAnimationFrame(draw);
}

draw();

// ------------------ CLICK HANDLER ------------------
canvas.addEventListener("mousedown", (e) => {
    const W = canvas.width;
    const H = canvas.height;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const lowerBtn = { x: W * 0.15, y: H * 0.75, w: W * 0.25, h: H * 0.12 };
    const higherBtn = { x: W * 0.60, y: H * 0.75, w: W * 0.25, h: H * 0.12 };

    function inside(btn) {
        return mouseX > btn.x && mouseX < btn.x + btn.w &&
               mouseY > btn.y && mouseY < btn.y + btn.h;
    }

    if (inside(higherBtn)) {
        resultText = right[1] >= left[1] ? "Correct!" : "Wrong!";
        score = right[1] >= left[1] ? score + 1 : 0;
        left = right;
        right = getRandomPerson(left);
    }

    if (inside(lowerBtn)) {
        resultText = right[1] <= left[1] ? "Correct!" : "Wrong!";
        score = right[1] <= left[1] ? score + 1 : 0;
        left = right;
        right = getRandomPerson(left);
    }
});
