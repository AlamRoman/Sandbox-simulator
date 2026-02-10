const g = 9.81;

function resetSandbox() {
    for (let i = 0; i < GRID_WIDTH; i++) {
        for (let j = 0; j < GRID_HEIGHT; j++) {
            sandbox[i][j] = null;
        }
    }
    particles.length = 0;
}

function addParticle(x, y) {
    let stroke = 3;

    x = Math.floor(x);
    y = Math.floor(y);

    for (let i = -stroke; i < stroke; i++) {
        for (let j = -stroke; j < stroke; j++) {

            if (i * i + j * j < stroke * stroke) {
                let tx = x + i;
                let ty = y + j;

                if (tx >= 0 && tx < GRID_WIDTH && ty >= 0 && ty < GRID_HEIGHT) {
                    
                    createParticle(tx, ty);
                }
            }
        }
    }
}

function createParticle(x, y, type = selectedElement) {

    if (x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT) return;

    if (sandbox[x][y] != null) {
        deleteParticle(x, y);
    }

    if (type === elementType.ERASER) return;

    let p;
    switch (type) {
        case elementType.SAND:  p = new Sand(x, y);  break;
        case elementType.WATER: p = new Water(x, y); break;
        case elementType.STONE: p = new Stone(x, y); break;
        case elementType.FIRE:  p = new Fire(x, y);  break;
        case elementType.WOOD:  p = new Wood(x, y);  break;
        case elementType.ASH:  p = new Ash(x, y);  break;
    }

    if (p) {
        particles.push(p);
    }
}

function deleteParticle(x,y) {
    const p = sandbox[x][y];
    if (!p) return;
    
    const index = particles.indexOf(p);

    particles[index] = particles[particles.length - 1];
    particles.pop();

    sandbox[x][y] = null;
}
