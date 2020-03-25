const express = require("express");
const app = express();

const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

app.get("/user-adverts", jsonParser, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.json({
        myAdverts: [
            {
                id: 1,
                title: "Помогите найти щенка!",
                imgUrls: [
                    '/img/dog1-template.jpg'
                ]
            }
        ]
    });
});

app.get("/user-info", jsonParser, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.json({
        id: 1,
        fullName: 'Трофимов Е.В.',
        avatar: '/img/play_cat.webp'
    });
});

app.listen(5000);
console.log("Server start");