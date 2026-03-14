const canvas = document.getElementById("canvas");
const WIDTH  = 1000;
const HEIGHT = 500;
const ctx = canvas.getContext("2d");

const PARTICLE_SIZE = 5;
const GRID_WIDTH = Math.floor(WIDTH / PARTICLE_SIZE);
const GRID_HEIGHT = Math.floor(HEIGHT / PARTICLE_SIZE);

var selectedElement = elementType.SAND;

let sandbox = Array.from({ length: GRID_WIDTH }, () =>
    Array(GRID_HEIGHT).fill(null)
);

let particles = [];

// ----------------------------------------------

resetSandbox();

fixDPI(canvas, ctx);

requestAnimationFrame(loop);