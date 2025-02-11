import { random_maze } from "../../declarations/random_maze";

let lastMessageCount = 0; 

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

    if (messages.length === lastMessageCount) return;

    for (let i = lastMessageCount; i < messages.length; i++) {
        const msg = messages[i];
        const div = document.createElement("div");
        div.classList.add("message");
        div.innerHTML = `<strong>${msg.user}:</strong> ${msg.content}`;
        board.appendChild(div);
    }

    lastMessageCount = messages.length; 
    board.scrollTop = board.scrollHeight;
}

window.onload = () => {
    loadMessages();
    setInterval(loadMessages, 1000);
};

document.getElementById("sendBtn").addEventListener("click", sendMessage);

document.getElementById("message").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        sendMessage(); 
    }
});
