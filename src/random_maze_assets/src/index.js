import { random_maze } from "../../declarations/random_maze";

async function sendMessage() {
    const user = document.getElementById("username").value.trim();
    const content = document.getElementById("message").value.trim();

    if (user === "" || content === "") {
        alert("Podaj imię i wiadomość!");
        return;
    }

    await random_maze.addMessage(user, content);

    document.getElementById("message").value = ""; 

    loadMessages(); 
}

async function loadMessages() {
    const messages = await random_maze.getMessages();
    const board = document.getElementById("board");
    board.innerHTML = ""; 

    messages.forEach(msg => {
        const div = document.createElement("div");
        div.classList.add("message");
        div.innerHTML = `<strong>${msg.user}:</strong> ${msg.content}`;
        board.appendChild(div);
    });

    board.scrollTop = board.scrollHeight;
}

window.onload = loadMessages;

document.getElementById("sendBtn").addEventListener("click", sendMessage);

document.getElementById("message").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        sendMessage(); 
    }
});
