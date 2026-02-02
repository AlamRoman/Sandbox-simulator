const g = 9.81;

function resetSandbox() {
    for (let i = 0; i < GRID_WIDTH; i++) {
        for (let j = 0; j < GRID_HEIGHT; j++) {
            sandbox[i][j] = elementType.AIR;
        }
    }
    particles.length = 0;
}


function updatePosition(p, deltaTime){

    if(p.isGravity){
        p.calculatePosition();
    } 
}

function addParticle(x,y){
    let stroke = 1;

    x = Math.floor(x);
    y = Math.floor(y);

    for (let i = -stroke; i < stroke; i++) {
        for (let j = -stroke; j < stroke; j++) {
            let d = Math.sqrt(i*i + j*j);

            if(d < stroke){
                let tx = x + i;
                let ty = y + j;

                if(tx >= 0 && tx <= GRID_WIDTH && ty >= 0 && ty <= GRID_HEIGHT){
                    createParticle(tx,ty);
                }
            }
        }
    }
}

function createParticle(x,y){
    switch (selectedElement) {
        case elementType.SAND:
            particles.push(new Sand(x,y));
            break;
        case elementType.WATER:
            particles.push(new Water(x,y));
            break;
        case elementType.STONE:
            //particles.push(new STONE(tx,ty));
            break;
    }
}
