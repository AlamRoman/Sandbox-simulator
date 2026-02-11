
function fixDPI(canvas, ctx) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
}

function draw(p){
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x*PARTICLE_SIZE, p.y*PARTICLE_SIZE,PARTICLE_SIZE+1,PARTICLE_SIZE+1);
}
