const body = document.querySelector("body");

const BG_API_KEY = "vuojNA21BCqRoxut92dKZ_kGPKnsqlpaIKkNHKL9BbU";
const IMG_NUMBER = 3;


function loadImage() {
    fetch(`https://api.unsplash.com/photos/random?client_id=${BG_API_KEY}`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        // console.log(json.urls.full);
        const imgUrl = json.urls.full;
        paintImage(imgUrl);
    });
}

// function paintImage(imgNumber) {
function paintImage(url) {
    const image = new Image();
    // image.src = `/images/background${imgNumber + 1}.jpg`;
    image.src = url;
    image.classList.add("bgImage");
    body.appendChild(image);

}

// function genRandom() {
//     const number = Math.floor(Math.random() * IMG_NUMBER);
//     return number;
// }

function init() {
    // const randomNumber = genRandom();
    // paintImage(randomNumber);
    loadImage();
}

init();