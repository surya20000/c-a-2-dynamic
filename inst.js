

const main = document.getElementById("back");
main.onclick = () => {
  location.href = "game.html"
} 

const playerNameInput = document.getElementById("p-name");

main.addEventListener("click", function () {
    const playerName = playerNameInput.value;

    if (playerName.trim() !== "") {
        sessionStorage.setItem("username", playerName);


        location.href = "game.html";
    } else {
        alert("Please enter your name.");
    }
});

window.addEventListener("load", function () {
    const storedUsername = sessionStorage.getItem("username");

    if (storedUsername) {
        const nameElement = document.getElementById("name");
        nameElement.textContent = storedUsername;
    }
});
