
var profiles = [
    {title: "first", images: ["https://raw.githubusercontent.com/sayyam/carouselview/master/sample/src/main/assets/carousel_baner.jpg"]}, 
    {title: "second", images: ["https://i.ytimg.com/vi/bWIb2h_733E/maxresdefault.jpg", "http://developer.intersoftsolutions.com/download/attachments/19992228/Overview.png?version=1&modificationDate=1434361495917&api=v2"]},
    {title: "third", images: ["https://image.winudf.com/v2/image1/Y29tLmNhcm91c2VsLmJ1c19zY3JlZW5fMF8xNTUzNjE0MTY2XzAwNg/screen-0.jpg?fakeurl=1&type=.jpg", "https://image.winudf.com/v2/image/Y2Fyb3VzZWx3YWxscGFwZXIuc2FtLmNvbV9zY3JlZW5zaG90c18wXzc4OTljMWFm/screen-0.jpg?fakeurl=1&type=.jpg"]}
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

function getActiveCarouselItem(imgUrl) {
    return `<div class="carousel-item active"><img src="${imgUrl}" class="d-block w-100"></div>`;
}

function getCarouselItem(imgUrl) {
    return `<div class="carousel-item"><img src="${imgUrl}" class="d-block w-100"></div>`;
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