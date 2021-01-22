const bg = document.querySelector(".bg");

const IMG_NUMBER = 4;

function handleImgLoad() {
    console.log("finished loading");
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber +1}.jpg`;
    image.addEventListener("loaded", handleImgLoad);
    bg.appendChild(image);

}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}init();