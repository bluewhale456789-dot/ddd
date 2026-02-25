// ------------------ CANVAS SETUP ------------------
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = 700;
const HEIGHT = 400;

// ------------------ GAME VARIABLES ------------------
let score = 0;
let resultText = "";

// ------------------ PEOPLE LIST ------------------
const people = [
    ["Taylor Swift", 45, "png-clipart-taylor-swift-taylor-swift-1-thumbnail.png"],
    ["Ariana Grande", 22, "Ariana grande.webp"],
    ["Bad Bunny", 28, "Bad Bunny.jpg"],
    ["Billie Eilish", 18, "Billie_Eilish_.jpg"],
    ["Cristiano Ronaldo", 40, "CR7.jpg"],
    ["Drake", 14, "drake.png"],
    ["Elon Musk", 50, "Elon Musk.jpg"],
    ["IShowSpeed", 8, "IshowSpeed.jpg"],
    ["Kanye West", 11, "kanye.png"],
    ["Lil Uzi Vert", 8, "Lil_Uzi_Vert_(2018).png"],
    ["Lionel Messi", 35, "MESSI.jpg"],
    ["Minecraft", 36, "MINECRAFT.jpg"],
    ["Playboi Carti", 8, "Playboi Carti.jpg"],
    ["Travis Scott", 12, "travis scott.jpg"],
    ["The Weeknd", 20, "WeekEnd.jpg"],
    ["Zendaya", 17, "Zendaya.jpg"],
    ["Apple", 48, "APPLE LOGO.png"],
    ["LeBron James", 42, "lebron.jpg"],
    ["Stephen Curry", 38, "curry.jpg"],
    ["Kendrick Lamar", 30, "kendrick.jpg"],
    ["J. Cole", 25, "jcole.jpg"],
    ["Doja Cat", 19, "doja.jpg"],
    ["Olivia Rodrigo", 21, "olivia.jpg"],
    ["MrBeast", 55, "mrbeast.jpg"],
    ["PewDiePie", 50, "pewdiepie.jpg"],
    ["Kai Cenat", 12, "kai.jpg"],
    ["21 Savage", 16, "21savage.jpg"],
    ["SZA", 18, "sza.jpg"],
    ["Ice Spice", 14, "icespice.jpg"],
    ["Post Malone", 22, "postmalone.jpg"],
    ["Dua Lipa", 20, "dualipa.jpg"],
    ["Rihanna", 40, "rihanna.jpg"],
    ["Nicki Minaj", 35, "nicki.jpg"],
    ["Shakira", 28, "shakira.jpg"],
    ["Ed Sheeran", 33, "edsheeran.jpg"],
    ["Justin Bieber", 30, "bieber.jpg"],
    ["Selena Gomez", 29, "selena.jpg"],
    ["Kylie Jenner", 32, "kylie.jpg"],
    ["Kim Kardashian", 38, "kimk.jpg"],
    ["Tom Holland", 26, "tomholland.jpg"],
    ["Robert Downey Jr.", 50, "rdj.jpg"],
    ["Chris Hemsworth", 44, "hemsworth.jpg"],
    ["Dwayne Johnson", 60, "therock.jpg"],
    ["Kevin Hart", 28, "kevinhart.jpg"],
    ["Gordon Ramsay", 35, "ramsay.jpg"],
    ["Markiplier", 22, "markiplier.jpg"],
    ["Jacksepticeye", 18, "jack.jpg"],
    ["Neymar Jr.", 33, "neymar.jpg"],
    ["Kylian Mbappé", 29, "mbappe.jpg"],
    ["Virgil van Dijk", 18, "vandijk.jpg"]
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
const higherBtn = { x: 400, y: 300, w: 200, h: 50 };
const lowerBtn = { x: 100, y: 300, w: 200, h: 50 };

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
    ctx.font = "22px Arial";
    ctx.fillText(text, btn.x + 60, btn.y + 32);
}

// ------------------ GAME LOOP ------------------
function draw() {
    // Background
    ctx.fillStyle = "#141414";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Score (moved up)
    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.fillText("Score: " + score, 20, 30);

    // Names (moved down)
    ctx.font = "20px Arial";
    ctx.fillText(left[0], 100, 70);
    ctx.fillText(right[0], 450, 70);

    // Images (bigger canvas = more space)
    const leftImg = loadImage(left[2]);
    const rightImg = loadImage(right[2]);

    ctx.drawImage(leftImg, 80, 90, 160, 160);
    ctx.drawImage(rightImg, 460, 90, 160, 160);

    // VS (centered perfectly)
    ctx.fillStyle = "gray";
    ctx.font = "28px Arial";
    ctx.fillText("VS", WIDTH / 2 - 15, 170);

    // Result text
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(resultText, WIDTH / 2 - 50, 240);

    // Buttons
    drawButton(higherBtn, "green", "Higher");
    drawButton(lowerBtn, "red", "Lower");

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
