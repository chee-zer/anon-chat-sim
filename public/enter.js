const asciiText = document.querySelectorAll("pre");
const asciiContainer = document.querySelector(".ascii-container");

let displayIndex = Math.floor(Math.random() * asciiText.length);

asciiText[displayIndex].classList.toggle("hidden");

asciiContainer.addEventListener("click", () => {
  asciiText[displayIndex].classList.toggle("hidden");
  displayIndex = (displayIndex + 1) % asciiText.length;
  asciiText[displayIndex].classList.toggle("hidden");
});

document
  .getElementById("usernameForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const token = window.location.pathname.split("/").pop();

    try {
      const response = await fetch(`/verify/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const status = await response.json();
      document.getElementById("statusMessage").textContent = status.message;
      if (response.ok && status.userCode) {
        window.location.href = `/rooms?u=${status.userCode}`;
      }
    } catch (error) {
      console.log(`error: ${error}`);
      document.getElementById("statusMessage").textContent =
        "An error occured. Please try again";
    }
  });
