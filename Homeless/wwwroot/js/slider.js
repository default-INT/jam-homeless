"use strict"

let profiles = [
    {
        images: ["img/dog1-template.jpg", "img/cat1-template.webp"],
        title: "Пропал пёс и кот"
    },
    {
        images: ["img/sobaka-drug.jpg", "img/dog1_help.png"],
        title: "Не нашли"
    },
    {
        images: ["img/play_cat.webp", "img/dog-help.jpg"],
        title: "Нашли"
    }
];

let currentProfileNumber = -1;


let mainCarouselIndicators;
let mainCarouselInner;


init();


function title(content) {
    return `<div class="title-block"><div id="title">` + content + `</div><div class="back"></div></div>`
}

function init() {
    mainCarouselIndicators = document.getElementById("mainCarouselIndicators");
    mainCarouselInner = document.getElementById("mainCarouselInner");

    if (profiles.length > 0) {
        next();
    }


}

function getActiveCarouselItem(imgUrl) {
    return `<div class="carousel-item active"><img src="${imgUrl}"  ></div>`;
}

function getCarouselItem(imgUrl, titleAdvert) {
    return title(titleAdvert) + `<div class="carousel-item"><img src="${imgUrl}"></div>`;
}

function getActiveCarouselIndicator() {
    return `<li data-target="#mainCarousel" data-slide-to="0" class="active"></li>`;
}

function getCarouselIndicator(num) {
    return `<li data-target="#mainCarousel" data-slide-to="${num}"></li>`;
}

function createCarouselFromProfile(profile) {
    mainCarouselIndicators.innerHTML = "";
    mainCarouselInner.innerHTML = "";


    mainCarouselIndicators.innerHTML += getActiveCarouselIndicator();
    mainCarouselInner.innerHTML += getActiveCarouselItem(profile.images[0]);

    for (let i = 1; i < profile.images.length; i++) {
        mainCarouselIndicators.innerHTML += getCarouselIndicator(i);
        mainCarouselInner.innerHTML += getCarouselItem(profile.images[i], profile.title);
    }
}

//добавить лайк
function next() {
    currentProfileNumber++;
    if (currentProfileNumber >= profiles.length) {
        currentProfileNumber = 0;
    }
    createCarouselFromProfile(profiles[currentProfileNumber]);
}

//добавить дизлайк
function prev() {
    currentProfileNumber--;
    if (currentProfileNumber < 0) {
        currentProfileNumber = profiles.length - 1;
    }
    createCarouselFromProfile(profiles[currentProfileNumber]);
}

function openFormCreateAdvert() {
    if (dataContainer.style.display != "none") {
        dataContainer.style.display = "none";
        advertSlider.style.display = "block";
    } else {
        //
        dataContainer.style.display = "grid";
        advertSlider.style.display = "none";
    }
}