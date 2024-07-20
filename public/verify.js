const asciiText = document.querySelectorAll("pre");
const asciiContainer = document.querySelector(".ascii-container");

let displayIndex = Math.floor(Math.random() * asciiText.length);

asciiText[displayIndex].classList.toggle("hidden");

asciiContainer.addEventListener("click", () => {
  asciiText[displayIndex].classList.toggle("hidden");
  displayIndex = (displayIndex + 1) % asciiText.length;
  asciiText[displayIndex].classList.toggle("hidden");
});

document.getElementById("verifyForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("inputId").value;

  fetch("/verify", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((res) => res.text())
    .then((data) => alert(data))
    .catch((err) => {
      console.log(`Error: ${err}`);
      alert("An error occured");
    });
});
