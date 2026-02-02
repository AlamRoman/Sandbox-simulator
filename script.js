console.log("hiii")

const canvas = document.getElementById("canvas");
const WIDTH  = 1000;
const HEIGHT = 500;
const ctx = canvas.getContext("2d");


const PARTICLE_SIZE = 5;
const GRID_WIDTH = WIDTH / PARTICLE_SIZE;
const GRID_HEIGHT = HEIGHT / PARTICLE_SIZE;

var selectedElement = elementType.SAND;

let sandbox = Array.from({ length: GRID_WIDTH }, () =>
    Array(GRID_HEIGHT).fill(0)
);

let particles = [];

// ----------------------------------------------

resetSandbox();

particles.push(new Sand(20, 10));
/* particles.push(new Water(30, 15));
particles.push(new Stone(40, 10)); */

//console.log(particles[0], sandbox);

fixDPI(canvas, ctx);

requestAnimationFrame(loop);