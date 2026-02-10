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
    }else if (event.key === '4') {
        selectedElement = elementType.FIRE;
    }else if (event.key === '5') {
        selectedElement = elementType.WOOD;
    } else if (event.key === 'c') {
        console.log("Deleting particles: ", particles.length);
        resetSandbox();
    }else if (event.key === 'e') {
        selectedElement = elementType.VOID;
    }
});

const clearBtn = document.getElementById('clearAll');

clearBtn.addEventListener('click', () => {
    resetSandbox();
});

document.querySelectorAll('input[name="selectedElement"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        switch(e.target.value){
            case "0":
                selectedElement = elementType.VOID;
                break;
            case "1":
                selectedElement = elementType.SAND;
                break;
            case "2":
                selectedElement = elementType.WATER;
                break;
            case "3":
                selectedElement = elementType.STONE;
                break;
            case "4":
                selectedElement = elementType.FIRE;
                break;
            case "5":
                selectedElement = elementType.WOOD;
                break;
            case "7":
                selectedElement = elementType.STEAM;
                break;
        }
    });
});

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
