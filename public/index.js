// socket setup
const socket = io("http://localhost:4000");

let output = document.getElementById("output");
let message = document.getElementById("message");
let name = document.getElementById("name");
let send = document.getElementById("send");
let feedback = document.getElementById("feedback");

send.addEventListener("click", () => {
  let data = {
    name: name.value,
    message: message.value,
  };
  socket.emit("chat", data);

  console.log(data);
});

//listen events
socket.on("chat", (data) => {
  output.innerHTML += `<p><strong>${data.name}</strong> : ${data.message}</p>`;
  message.value = "";
});
socket.on("typing", (name) => {
  feedback.innerHTML = `<p><em>${name} is typing a message...</em></p>`;
  setTimeout(() => {
    feedback.innerHTML = "";
  }, 3000);
});
