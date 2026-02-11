class ParticleGas extends Particle{
    constructor(type,x,y){
        super(type, x, y);
        this.isGravity = false;
    }
}

class Fire extends Particle {
    constructor(x, y) {
        super(elementType.FIRE, x, y);
        this.isGravity = true;
        this.density = 5;

        this.life = 5 + myRandom() * 20;
        this.color = `hsl(${10 + myRandom() * 20}, 100%, 50%)`;
    }

    update() {

        if (sandbox[this.x][this.y] !== this) {
            deleteParticle(this.x, this.y);
            return;
        }

        this.life--;

        if (this.life <= 0) {
            deleteParticle(this.x, this.y);
            return;
        }

        this.color = `hsl(${10 + this.life}, 100%, ${30 + this.life / 2}%)`;

        let oldX = this.x;
        let oldY = this.y;
        let moved = false;

        let dirY = -1; 
        let dirX = myRandom() < 0.5 ? -1 : 1;

        if(myRandom() < 0.2){
            if (this.canMoveTo(this.x + dirX, this.y + dirY)) {
                this.x += dirX;
                this.y += dirY;
                moved = true;
            }
        }else{
            if (this.canMoveTo(this.x, this.y + dirY)) {
                this.y += dirY;
                moved = true;
            } else if (this.canMoveTo(this.x + dirX, this.y + dirY)) {
                this.x += dirX;
                this.y += dirY;
                moved = true;
            }
        }

        if (moved) {
            this.updateSandBox(oldX, oldY);
        }

        this.checkInteractions();
    }

    checkInteractions() {

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let tx = this.x + i;
                let ty = this.y + j;

                if (i === 0 && j === 0) continue;

                if (tx >= 0 && tx < GRID_WIDTH && ty >= 0 && ty < GRID_HEIGHT) {
                    let target = sandbox[tx][ty];
                    
                    if (target && target.type === elementType.WATER) {
                        deleteParticle(this.x, this.y);
                        deleteParticle(tx,ty);
                        createParticle(tx,ty,elementType.STEAM);
                        return;
                    }

                    if(myRandom() < 0.7){
                        if (target && target.isFlammable) {
                            target.burning = true;
                        }
                    }
                }
            }
        }
    }
}

class Steam extends Particle {
    constructor(x, y) {
        super(elementType.STEAM, x, y);
        this.isGravity = true;
        this.isFlammable = false;
        this.density = 10;
        this.maxLife = 300 + myRandom() * 100;
        this.life = this.maxLife;
        this.color = "white";
    }

    update() {
        this.life--;

        if (this.life <= 0) {
            deleteParticle(this.x, this.y);
            if (this.life < this.life / 2 && myRandom() < 0.03) { 
                createParticle(this.x, this.y, elementType.WATER);
            }
            return;
        }
    
        let b = 180 + Math.floor((this.life / this.maxLife) * 75);
        let r = (this.life < 50) ? Math.max(100, b - 50) : b;
        let g = (this.life < 50) ? Math.max(150, b - 20) : b;
        this.color = `rgb(${r}, ${g}, ${b})`;

        let px = this.x;
        let py = this.y;
        let moved = false;

        if (myRandom() < 0.5) { 
            if (this.canMoveTo(this.x, this.y - 1)) {
                this.y -= 1;
                moved = true;
            } else {
                let dir = myRandom() < 0.5 ? -1 : 1;
                if (this.canMoveTo(this.x + dir, this.y - 1)) {
                    this.x += dir;
                    this.y -= 1;
                    moved = true;
                }
            }
        }
        
        if (!moved) {
            let dir = myRandom() < 0.5 ? -1 : 1;

            if (this.canMoveTo(this.x + dir, this.y)) {
                this.x += dir;
                moved = true;
            } else if (this.canMoveTo(this.x - dir, this.y)) {
                this.x -= dir;
                moved = true;
            }
        }

        if (moved) {
            this.updateSandBox(px, py);
        } else {
            if (this.life < 50 && myRandom() < 0.06) {
                deleteParticle(this.x, this.y);
                createParticle(this.x, this.y, elementType.WATER);
                return;
            }
        }
    }
}