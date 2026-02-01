const numberEl = document.getElementById("number");
const machineEl = document.getElementById("machine");
const startBtn = document.getElementById("startBtn");

let images = [];
let interval = null;

// images.txt を読み込む（http/https が来たら区切る）
fetch("images.txt")
    .then(res => res.text())
    .then(text => {
        // 次の http(s) の直前で分割
        images = text.match(/https?:\/\/.*?(?=https?:\/\/|$)/g) || [];
        console.log("画像数:", images.length);
    });

startBtn.addEventListener("click", () => {
    if (images.length === 0) return;

    clearInterval(interval);

    interval = setInterval(() => {
        const num = Math.floor(Math.random() * 27) + 1;
        const img = images[Math.floor(Math.random() * images.length)];

        numberEl.textContent = num;
        machineEl.style.backgroundImage = `url("${img}")`;
    }, 80);

    setTimeout(() => {
        clearInterval(interval);
    }, 3000);
});
