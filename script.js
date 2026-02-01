const numberEl = document.getElementById("number");
const machineEl = document.getElementById("machine");
const startBtn = document.getElementById("startBtn");

let images = [];
let interval = null;

// images.txt を読み込む（http / https で自動区切り）
fetch("images.txt")
    .then(res => res.text())
    .then(text => {
        // http:// または https:// で始まるURLをすべて取得
        images = text.match(/https?:\/\/[^\s]+/g) || [];
        console.log("読み込んだ画像数:", images.length);
    });

startBtn.addEventListener("click", () => {
    if (images.length === 0) return;

    clearInterval(interval);

    interval = setInterval(() => {
        const num = Math.floor(Math.random() * 27) + 1;
        const img = images[Math.floor(Math.random() * images.length)];

        numberEl.textContent = num;
        machineEl.style.backgroundImage = `url(${img})`;
    }, 80); // 回転速度

    setTimeout(() => {
        clearInterval(interval);
    }, 3000); // 停止時間
});
