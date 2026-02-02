let isPainting = false;

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    addParticle(x/PARTICLE_SIZE, y/PARTICLE_SIZE);
});

canvas.addEventListener('mouseup', (e) => {
    isPainting = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPainting) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        addParticle(x/PARTICLE_SIZE, y/PARTICLE_SIZE);
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === '1') {
        selectedElement = elementType.SAND;
    } else if (event.key === '2') {
        selectedElement = elementType.WATER;
    }else if (event.key === '3') {
        selectedElement = elementType.STONE;
    } else if (event.key === 'c') {
        resetSandbox();
    }
});


function fixDPI(canvas, ctx) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
}

function draw(p){
    ctx.fillStyle = elementColor.get(p.elementType);
    ctx.fillRect(p.x*PARTICLE_SIZE, p.y*PARTICLE_SIZE,PARTICLE_SIZE,PARTICLE_SIZE);
}
