const numberEl = document.getElementById("number");
const machineEl = document.getElementById("machine");
const startBtn = document.getElementById("startBtn");

let images = [];
let interval = null;

// images.txt を読み込んで画像リスト生成
fetch("images.txt")
  .then(res => res.text())
  .then(text => {
    /*
      対応形式:
      - https://example.com/image.jpg
      - http://example.com/image.png
      - data:image/jpeg;base64,AAAA...
      - data:image/png;base64,BBBB...

      区切りなし・改行なしでもOK
    */
    images =
      text.match(
        /(data:image\/[a-zA-Z+]+;base64,[A-Za-z0-9+/=]+|https?:\/\/.*?)(?=data:image\/|https?:\/\/|$)/g
      ) || [];

    console.log("読み込んだ画像数:", images.length);
  })
  .catch(err => {
    console.error("images.txt 読み込み失敗", err);
  });

startBtn.addEventListener("click", () => {
  if (images.length === 0) {
    alert("画像が読み込まれていません");
    return;
  }

  clearInterval(interval);

  interval = setInterval(() => {
    // 1〜27 の数字
    const num = Math.floor(Math.random() * 27) + 1;

    // ランダム画像
    const img = images[Math.floor(Math.random() * images.length)];

    numberEl.textContent = num;
    machineEl.style.backgroundImage = `url("${img}")`;
  }, 80); // 回転スピード（ms）

  // 3秒後に停止
  setTimeout(() => {
    clearInterval(interval);
  }, 3000);
});
