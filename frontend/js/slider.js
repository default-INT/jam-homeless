
var profiles = [
    {images: ["img/dog1-template.jpg", "img/cat1-template.webp"]}, 
    {images: ["https://i.ytimg.com/vi/bWIb2h_733E/maxresdefault.jpg", "http://developer.intersoftsolutions.com/download/attachments/19992228/Overview.png?version=1&modificationDate=1434361495917&api=v2"]},
    {images: ["https://image.winudf.com/v2/image1/Y29tLmNhcm91c2VsLmJ1c19zY3JlZW5fMF8xNTUzNjE0MTY2XzAwNg/screen-0.jpg?fakeurl=1&type=.jpg", "https://image.winudf.com/v2/image/Y2Fyb3VzZWx3YWxscGFwZXIuc2FtLmNvbV9zY3JlZW5zaG90c18wXzc4OTljMWFm/screen-0.jpg?fakeurl=1&type=.jpg"]}
];

var currentProfileNumber = -1;


var mainCarouselIndicators;
var mainCarouselInner;


init();


function init() {
    mainCarouselIndicators = document.getElementById("mainCarouselIndicators");
    mainCarouselInner = document.getElementById("mainCarouselInner");

    if (profiles.length > 0) {
        currentProfileNumber = 0;
    }

    
}

let title = function(content) {
    return `<div class="title-block"><div id="title">` + content + `</div><div class="back"></div></div>`
}

function getActiveCarouselItem(imgUrl) {
    return `<div class="carousel-item active"><img src="${imgUrl}"  ></div>`;
}

function getCarouselItem(imgUrl) {
    return title("Пропал кот") + `<div class="carousel-item"><img src="${imgUrl}"></div>`;
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
        mainCarouselInner.innerHTML += getCarouselItem(profile.images[i]);
    }
}

function next() {
    currentProfileNumber++;
    if (currentProfileNumber >= profiles.length) {
        currentProfileNumber = 0;
    }
    createCarouselFromProfile(profiles[currentProfileNumber]);
}

function prev() {
    currentProfileNumber--;
    if (currentProfileNumber < 0) {
        currentProfileNumber = profiles.length - 1;
    }
    createCarouselFromProfile(profiles[currentProfileNumber]);
}

function createAdvert() {
    let createForm = document.getElementById('create-advert');
    if (createForm.style.display != "none") {
        createForm.style.display = "none";
        advertSlider.style.display = "block";
    } else {
        //
        createForm.style.display = "inline-block";
        advertSlider.style.display = "none";
    }
}