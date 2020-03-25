"use strict"

if (document.getElementById("filter-title") != undefined) {
    document.getElementById("filter-title").addEventListener("click", () => {
        let form = document.getElementById("form-filter");
        if (form.style.display != "none") {
            form.style.display = "none";
        } else {
            form.style.display = "block";
        }
    });    
}
