"use strict";
let iconInfo = [
    {
        name: "home",
        iconClass: "bi bi-house-fill",
    },
    {
        name: "setting",
        iconClass: "bi bi-gear-fill",
    },
    {
        name: "wifi",
        iconClass: "bi bi-broadcast",
    },
    {
        name: "mode",
        iconClass: "bi bi-sun",
    },
    {
        name: "date",
        iconClass: "bi bi-calendar",
    },
    {
        name: "camera",
        iconClass: "bi bi-camera",
    },
    {
        name: "chat",
        iconClass: "bi bi-chat",
    },
    {
        name: "tasks",
        iconClass: "bi bi-clipboard-check",
    },
];
let iconGap = 25;
let menu = document.createElement("div"), menuContainer = document.createElement("div"), menuList = document.createElement("div"), menuButton = document.createElement("button");
menu.classList.add("menu");
menuList.classList.add("menu-list");
menuButton.classList.add("bi", "bi-x-lg", "menu-btn");
menu.appendChild(menuList);
menu.appendChild(menuButton);
let menuButtons = iconInfo.map((obj) => {
    let btn = document.createElement("button");
    let spanText = document.createElement("span");
    menuList.appendChild(document.createElement("div")).appendChild(btn).setAttribute("class", obj.iconClass);
    btn.addEventListener("mouseenter", () => {
        [...spanText.childNodes].forEach((e) => e.remove());
        spanText.appendChild(document.createTextNode(obj.name)), menuButton.appendChild(spanText);
        menuButton.classList.add("hide");
        setTimeout(() => spanText.classList.add("text"), 1);
    });
    btn.addEventListener("mouseleave", () => {
        spanText.remove();
        spanText.removeAttribute("style");
        spanText.classList.remove("text");
        menuButton.classList.remove("hide");
    });
    return btn;
});
window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (![menuButton, ...menuButtons].some((b) => b === e.target)) {
        hideMenu();
        menu.style.cssText = `position: absolute;top: ${e.clientY}px;left: ${e.clientX}px;transform: translate(-50%,-50%);`;
        document.body.appendChild(menu);
        setTimeout(() => showMenu(), 50);
    }
});
window.addEventListener("click", (e) => !menuButtons.some((b) => b === e.target) && (hideMenu(), setTimeout(() => menu.remove(), 300)));
function showMenu() {
    menu.classList.add("show");
    let circleNum = 0;
    let counter = setInterval(() => {
        if (circleNum >= menuButtons.length)
            clearInterval(counter);
        else {
            menuButtons.forEach((e, i) => {
                var _a, _b;
                if (circleNum <= i) {
                    let deg = (360 / menuButtons.length) * circleNum;
                    let iconWidth = e.offsetWidth;
                    let iconDistanceFromCenter = Math.ceil(((iconGap / 2 + iconWidth) * 2) / Math.sqrt(Math.sin(360 / iconInfo.length)) - iconWidth / 2);
                    (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.style.setProperty("transform", `translate(-50%,-100%) rotate(${deg}deg)`);
                    e.style.setProperty("transform", `rotate(-${deg}deg)`);
                    (_b = e.parentElement) === null || _b === void 0 ? void 0 : _b.style.setProperty("height", `${iconDistanceFromCenter}px`);
                }
            });
            circleNum++;
        }
    }, 50);
}
function hideMenu() {
    menu.classList.remove("show");
    menuButtons.forEach((e) => { var _a, _b; return ((_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.style.removeProperty("transform"), (_b = e.parentElement) === null || _b === void 0 ? void 0 : _b.style.removeProperty("height")); });
}
