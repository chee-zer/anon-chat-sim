const asciiText = document.querySelectorAll("pre");
const asciiContainer = document.querySelector(".ascii-container-small");

let displayIndex = Math.floor(Math.random() * asciiText.length);

asciiText[displayIndex].classList.toggle("hidden");

asciiContainer.addEventListener("click", () => {
  asciiText[displayIndex].classList.toggle("hidden");
  displayIndex = (displayIndex + 1) % asciiText.length;
  asciiText[displayIndex].classList.toggle("hidden");
});
