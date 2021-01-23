const MUSIC_ON = "music_click";
const bgm = document.querySelector(".fa-compact-disc");
var audio1 = new Audio("audio/sparkle.mp3");
audio1.loop = false; // 반복재생하지 않음
audio1.volume = 0.05; // 음량 설정

document.querySelector(".fa-compact-disc").addEventListener("click", function () {
  if (audio1.paused) {
    audio1.play();
    bgm.classList.add(MUSIC_ON);
  } else {
    audio1.pause();
    audio1.currentTime = 0;
    bgm.classList.remove(MUSIC_ON);
  }
  });