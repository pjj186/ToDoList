const API_KEY = "5c0d48b47e4e66d7f58ccc1abf22e802";
const COORDS = 'coords';
const weather = document.querySelector(".js-weather");
const jsplace = document.querySelector(".js-place");
const jscountry = document.querySelector(".js-country");

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        //then : then 앞에있는 동작을 마치면 then이 함수를 호출
        return response.json() 
    }).then(function(json) {
        const temperature = json.main.temp;
        const country = json.sys.country;
        const place = json.name;
        weather.innerText = `${temperature}°C`;
        jsplace.innerText = `${place}`;
        jscountry.innerText = `${country}`;
    })
}


function saveCoords(coordsObj){
    //JSON.stringify 쓰는 이유: 로컬 스토리지에서는 string으로 저장해야함
    // 객체를 string으로 바꾸는것임
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    console.dir(position);
    const latitude = position.coords.latitude; // 위도
    const longitude = position.coords.longitude; // 경도
    const coordsObj = {
        // 변수 이름과 객체의 키 값의 이름이 같다면 다음과 같이 객체 생성 가능
        latitude, // latitude = latitude
        longitude // longitude = longitude
    };
    saveCoords(coordsObj);
    getWeather(CITY_ID);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}


function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();