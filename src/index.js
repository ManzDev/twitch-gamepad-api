import xboxGamepad from "./assets/xbox-gamepad.svg?raw";
const container = document.querySelector(".container");
container.insertAdjacentHTML("beforeend", xboxGamepad);

const visualGamepad = [
  ".a-button",
  ".b-button",
  ".x-button",
  ".y-button",
  ".lb",
  ".rb",
  ".lt",
  ".rt",
  ".l-options",
  ".r-options",
  ".ls",
  ".rs",
  ".t-axes",
  ".b-axes",
  ".l-axes",
  ".r-axes",
].map((name) => container.querySelector(name));

const visualAxes = [
  ".ls",
  ".rs"
].map((name) => container.querySelector(name));

let id;

const loop = async () => {
  const [gamepad] = await navigator.getGamepads();
  const { buttons, axes, vibrationActuator } = gamepad;

  const gpButtons = buttons.slice(0, visualGamepad.length);
  const gpAxes = [[axes[0], axes[1]], [axes[2], axes[3]]];

  gpButtons.forEach((button, index) => {
    const visualButton = visualGamepad[index];
    const action = button.pressed ? "add" : "remove";
    visualButton.classList[action]("pressed");
  });

  gpAxes.forEach((stick, index) => {
    const [x, y] = stick;
    const visualStick = visualAxes[index];
    visualStick.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
  });

  id = requestAnimationFrame(loop);
};

addEventListener("gamepadconnected", () => {
  console.log("Gamepad conectado.");
  container.classList.remove("off");
  loop();
});
addEventListener("gamepaddisconnected", () => {
  console.log("Gamepad desconectado.");
  container.classList.add("off");
  cancelAnimationFrame(id);
});
