"use strict"

let url = "https://192.168.43.20:5001";

let links = Array.from(document.getElementsByClassName("link"));

let loginRegEx = /^[a-zA-z]{1}[a-zA-Z1-9_]{3,20}$/i;
let passRegEx = /^[a-zA-z]{1}[a-zA-Z0-9_/!/@/#/$/%/&]{3,20}$/i;
let emailRegEx = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

let msgColor = document.getElementsByClassName("msg")[0].style.color;

let defaultImgUrl = "img/sad-smile-fix.jpg";


/*
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function() {
    loadPageToUrl(this.name)
    });
}
*/

let user;

loadPageOnStart();

setUserData();
getMyAdverts();

advertForm.addEventListener("submit", (e) => {
        e.preventDefault();
});

addBtnAdv.addEventListener("click", createAdvert);

function createAdvert() {
    let formData = new FormData(advertForm);
    
    let httpRequest = new XMLHttpRequest();
    let imgsBase64 = new Array();
    let imgBase = encodeImageFileAsURL(uploadImg);

    let json = JSON.stringify({
        id: 0,
        title: formData.get("title"),
        animaType: parseInt(formData.get("animaType")),
        information: formData.get("email"),
        imageUrls: [imgBase]
    });
    httpRequest.open("POST", url + "/api/adverts");
    httpRequest.responseType = "json";
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(json);

    httpRequest.onload = () => {
        if (httpRequest.status == 200) {
            let advert = httpRequest.response;
            if (advert != null || advert != undefined)
                getMyAdverts();
        } else {
            console.log("Bag", ":(");
        }
    }
    
}

function encodeImageFile(file) {
    let reader = new FileReader();
    let data;
    reader.onloadend = function() {
        data = reader.result;
    }
    reader.readAsDataURL(file);
    return data;
}

function encodeImageFileAsURL(element) {
    let file = element.files[0];
    let reader = new FileReader();
    let data;
    reader.onloadend = function() {
        data = reader.result;
    }
    reader.readAsDataURL(file);
    return data;
}


function setUserData() {
    avatar.src = localStorage.getItem("avatarUrl");
    fullname.innerHTML = localStorage.getItem("fullname");

}

function getAdverts() {
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", url + "/api/adverts");
    httpRequest.responseType = "json";
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.setRequestHeader('authorization', 'Bearer ' + localStorage.getItem("token"));
    httpRequest.send();

    httpRequest.onload = () => {
        if (httpRequest.status == 200) {
            let adverts = httpRequest.response;

            if (adverts === undefined) {
                return;
            } else if (adverts == null) {
                //notHavePages
                return;
            }
            profiles = [];
            adverts.forEach((advert, index, adverts) => {
                if (advert.imageUrls == null || advert.imageUrls == "") {
                    advert.imageUrls = [defaultImgUrl];
                }
                profiles.push({
                    images: advert.imageUrls,
                    title: advert.title
                });
            });
            next();
        }
    }
}


function getAdvert(id) {
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", url + "/api/profile/adverts/" + id);
    httpRequest.responseType = "json";
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.setRequestHeader('authorization', 'Bearer ' + localStorage.getItem("token"));
    httpRequest.send();

    httpRequest.onload = () => {
        if (httpRequest.status == 200) {
            let adverts = httpRequest.response;

            itemList.innerHTML = "";

            if (adverts == null || adverts.length == 0) {
                let advert = {
                    title: "У вас нету объявлений",
                    imageUrls: [defaultImgUrl]
                }
                itemList.appendChild(getAdvertHTML(advert));
                return;
            }

            adverts.forEach((advert, index, adverts) => {
                itemList.appendChild(getAdvertHTML(advert));
            });

        } else {
            let advert = {
                title: "Не удалось загрузить данные",
                imageUrls: [defaultImgUrl]
            }
            itemList.appendChild(getAdvertHTML(advert));
        }
    }
}

function getMyAdverts() {
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", url + "/api/profile/adverts");
    httpRequest.responseType = "json";
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.setRequestHeader('authorization', 'Bearer ' + localStorage.getItem("token"));
    httpRequest.send();

    httpRequest.onload = () => {
        if (httpRequest.status == 200) {
            let adverts = httpRequest.response;

            itemList.innerHTML = "";

            if (adverts == null || adverts.length == 0) {
                let advert = {
                    title: "У вас нету объявлений",
                    imageUrls: [defaultImgUrl]
                }
                itemList.appendChild(getAdvertHTML(advert));
                return;
            }

            adverts.forEach((advert, index, adverts) => {
                itemList.appendChild(getAdvertHTML(advert));
            });

        } else {
            let advert = {
                title: "Не удалось загрузить данные",
                imageUrls: [defaultImgUrl]
            }
            itemList.appendChild(getAdvertHTML(advert));
        }
    }
}

function getAdvertHTML(advert) {
    let item = document.createElement("div");
    item.classList.add("item");

    let itemImg = document.createElement("div");
    itemImg.classList.add("item-img");

    let img = document.createElement("img");
    img.style.width = "80px";
    if (advert.imageUrls != undefined && advert.imageUrls != null) {
        img.src = advert.imageUrls[0];
    }

    img.alt = defaultImgUrl;


    itemImg.appendChild(img);

    let title = document.createElement("div");
    title.classList.add("title");
    title.innerHTML = advert.title;

    item.appendChild(itemImg);
    item.appendChild(title);

    return item;
}


// old method


let submenus = Array.from(document.getElementsByClassName("menu"));

submenus.forEach(function (submenu, index, submenus) {
    submenu.addEventListener("click", openMenu)
});

// Get the modal
let modals = Array.from(document.getElementsByClassName("modal"));

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    modals.forEach(function (modal, index, modals) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearForms();
        }
    });
}

function logInUser() {
    let loginForm = document.getElementById("login-form");
    let msgLabel = loginForm.querySelector(".msg");

    let loginEnrty = loginForm.querySelector("input[name='login']");
    let passEntry = loginForm.querySelector("input[name='password']");

    if (isLoginValidation(loginEnrty.value) && isPassValidation(passEntry.value)) {
        msgLabel.style.color = msgColor;
        msgLabel.innerHTML = "Идет проверка данных...";
        //ajax
        let authFormData = new FormData(document.getElementById("auth-form"));

        let httpRequest = new XMLHttpRequest();

        let siteUrl = new URL(document.URL);
        let url = new URL("/account", siteUrl.origin);
        url.searchParams.set('login', authFormData.get("login"));
        url.searchParams.set('password', authFormData.get("password"));

        httpRequest.open("GET", url);
        httpRequest.responseType = "json";
        httpRequest.setRequestHeader('Content-Type', 'application/json');
        let json = JSON.stringify({
            login: authFormData.get("login"),
            password: authFormData.get("password"),
            email: null
        });

        httpRequest.send(json);

        httpRequest.onload = () => {
            if (httpRequest.status == 200) {
                if (httpRequest == undefined) {
                    msgLabel.style.color = "red";
                    msgLabel.innerHTML = "Неверный логин, либо пароль";
                    return;
                }
                setUser(httpRequest);
                document.getElementById("login-form").style.display = "none";
                clearForms();
                loadPageOnStart();
            }
        }

    } else {
        msgLabel.style.color = "red";
        msgLabel.innerHTML = "Данные некорректного формата";
    }
}

function signUpUser() {
    let regForm = document.getElementById("registration-form");
    let msgLabel = regForm.querySelector(".msg");

    let loginEnrty = regForm.querySelector("input[name='login']");
    let passEntry = regForm.querySelector("input[name='password']");
    let retryPassEntry = regForm.querySelector("input[name='retryPasswrod']");
    let emailEntry = regForm.querySelector("input[name='email']");

    if (isLoginValidation(loginEnrty.value) && isPassValidation(passEntry.value)
        && isEmailValidation(emailEntry.value) && isPassValidation(retryPassEntry.value)) {
        if (passEntry.value != retryPassEntry.value) {

            passEntry.style.color = "red";
            retryPassEntry.style.color = "red";

            msgLabel.style.color = "red";
            msgLabel.innerHTML = "Пароли не совпадают";

            return;
        }
        msgLabel.style.color = msgColor;
        msgLabel.innerHTML = "Идет проверка данных...";
        //ajax
        let formData = new FormData(document.getElementById("reg-form"));

        let httpRequest = new XMLHttpRequest();
        let json = JSON.stringify({
            login: formData.get("login"),
            password: formData.get("password"),
            email: formData.get("email")
        });

        httpRequest.open("POST", "/account");
        httpRequest.responseType = 'json';
        httpRequest.send(json);

        httpRequest.onload = () => {
            if (httpRequest.status == 200) {
                if (httpRequest.response == undefined) {
                    msgLabel.style.color = "red";
                    msgLabel.innerHTML = "Пользователь с таким логином, или почтой уже существует!";
                    return;
                }
                setUser(httpRequest);
                document.getElementById("registration-form").style.display = "none";
                loadPageOnStart();
            }
        };
        //end ajax
    } else {
        msgLabel.style.color = "red";
        msgLabel.innerHTML = "Данные некорректного формата";
    }
}

function setUser(xhr) {
    user = xhr.response;

    if (user != undefined) {
        document.getElementById("login").innerHTML = user.login;
        let userSidebar = document.getElementById("user-sidebar");

        userSidebar.innerHTML = "";

        let li = document.createElement("li");
        li.addEventListener('click', exit);

        let a = document.createElement("a");
        a.class = "link";
        a.innerHTML = "Выход";

        li.appendChild(a);

        userSidebar.appendChild(li);
        clearForms();
    }
}

function openMenu() {
    let submenu = this.getElementsByClassName("submenu")[0];
    if (submenu.style.transform == "scaleY(1)") {
        submenu.style.transform = "scaleY(0)";
    } else {
        submenu.style.transform = "scaleY(1)";
    }
}

function loadPageOnStart() {
    let url = document.location.href;

    //Временное решение, ибо не все ссылки сайта могут быть на странице
    links.forEach(function (link, index, links) {
        if (url.includes(link.name)) {
            loadPageToUrl(link.name);
        }
    });
}

function loadPageToUrl(path) {
    if (path == "") return;
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "/route" + path);
    httpRequest.responseType = 'text/html';
    httpRequest.send();

    httpRequest.onload = function () {
        if (httpRequest.status == 200) {

            let content = httpRequest.response;
            document.getElementById("wrapper").innerHTML = content;
            history.pushState(null, null, path);
            printWelcome();
        }
    };
}


function printWelcome() {
    let welcome = document.getElementById("welcome-user");

    if (!(user === undefined) && welcome != undefined) {
        welcome.innerHTML = "Добро пожаловать, " + user.login + ". Ваша почта: " + user.email;
    } else if (welcome != undefined) {
        welcome.innerHTML = "Авторизуйтесь в системе.";
    }
}

/*
 * Adding zeros in start to numbers
 */
function setZeroFirstFormat(value) {
    if (value < 10) {
        value = '0' + value;
    }
    return value;
}

function getDateTime() {
    let currentDateTime = new Date();
    let day = setZeroFirstFormat(currentDateTime.getDate());
    let month = setZeroFirstFormat(currentDateTime.getMonth() + 1);
    let year = currentDateTime.getFullYear();
    let hours = setZeroFirstFormat(currentDateTime.getHours());
    let minutes = setZeroFirstFormat(currentDateTime.getMinutes());
    let seconds = setZeroFirstFormat(currentDateTime.getSeconds());

    return day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds;
}

function exit() {
    user = undefined;
    document.getElementById("login").innerHTML = "Гость";
    let userSidebar = document.getElementById("user-sidebar");

    userSidebar.innerHTML = "";

    let li = document.createElement("li");
    li.addEventListener('click', () => {
        document.getElementById('login-form').style.display = 'block';
    });

    let aLog = document.createElement("a");
    aLog.class = "link";
    aLog.innerHTML = "Войти";
    li.appendChild(aLog);

    userSidebar.appendChild(li);

    li = document.createElement("li");
    li.addEventListener('click', () => {
        document.getElementById('registration-form').style.display = 'block';
    });
    let aReg = document.createElement("a");
    aReg.class = "link";
    aReg.innerHTML = "Зарегистрироваться";
    li.appendChild(aReg);

    userSidebar.appendChild(li);
    loadPageOnStart();
}

$(window).on('mousewheel DOMMouseScroll', function (e) {
    let $target = $(e.target);

    if ($target.hasClass('prevent-scroll')) {
        let scrollTop = $target.scrollTop();
        let scrollHeight = $target[0].scrollHeight;
        let height = $target.outerHeight(false);
        let delta = e.deltaY || e.detail * -1 || e.originalEvent.wheelDelta;

        if (scrollTop <= 0 && delta >= 0) {
            return false;
        }
        else if (scrollTop >= scrollHeight - height && delta < 0) {
            return false;
        }
    }
});