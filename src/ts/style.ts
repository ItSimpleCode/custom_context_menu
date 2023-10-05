/* Icons Options */
let icon_info = {
  width: 55,
  gap: 25,
};

/* The target elements by classes or click */
let menu = document.createElement("div"),
  menuContainer = document.createElement("div"),
  menuList = document.createElement("div"),
  menuButton = document.createElement("button");

/* Adding classes for styling */
menu.classList.add("menu");
menuList.classList.add("menu-list");
menuButton.classList.add("bi", "bi-x-lg", "menu-btn");

/* Appending Elements */
menu.appendChild(menuList);
menu.appendChild(menuButton);

/*
    Menu Buttons
    ** To add and remove the menu button dynamically
*/
fetch("../../json/icon.json")
  .then((res) => res.json())
  .then((res) => {
    /* Appending elements */
    let menuButtons = res.icons.map((icon: { iconClass: string; name: string }) => {
      let btn: HTMLButtonElement = document.createElement("button");
      let spanText: HTMLSpanElement = document.createElement("span");

      btn.setAttribute("class", icon.iconClass);
      btn.style.setProperty("width", `${icon_info.width}px`);
      btn.style.setProperty("height", `${icon_info.width}px`);

      menuList.appendChild(document.createElement("div")).appendChild(btn);

      /* prepare the hover event */
      btn.addEventListener("mouseenter", () => {
        if (!(spanText.textContent === icon.name)) {
          [...spanText.childNodes].forEach((e) => e.remove());
          spanText.appendChild(document.createTextNode(icon.name));
        }
        menuButton.appendChild(spanText);
        menuButton.classList.add("hide");
        setTimeout(() => spanText.classList.add("text"), 10);
      });
      btn.addEventListener("mouseout", () => {
        spanText.classList.remove("text");
        menuButton.classList.remove("hide");
        spanText.remove();
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

    window.addEventListener(
      "click",
      (e) => !menuButtons.some((b) => b === e.target) && (hideMenu(), setTimeout(() => menu.remove(), 300))
    );

    function showMenu() {
      menu.classList.add("show");
      let circleNum: number = 0;
      let counter = setInterval(() => {
        if (circleNum >= menuButtons.length) clearInterval(counter);
        else {
          menuButtons.forEach((e, i) => {
            if (circleNum <= i) {
              let deg: number = (360 / menuButtons.length) * circleNum;

              e.style.setProperty("transform", `rotate(-${deg}deg)`);
              e.parentElement.style.setProperty("transform", `translate(-50%,-100%) rotate(${deg}deg)`);
              e.parentElement.style.setProperty(
                "height",
                `${
                  (icon_info.gap + icon_info.width * 2) / Math.sqrt(Math.sin(360 / res.icons.length)) -
                  icon_info.width / 2
                }px`
              );
            }
          });
          circleNum++;
        }
      }, 50);
    }
    function hideMenu() {
      menu.classList.remove("show");
      menuButtons.forEach(
        (e) => (e.parentElement.style.removeProperty("transform"), e.parentElement.style.removeProperty("height"))
      );
    }
  });
