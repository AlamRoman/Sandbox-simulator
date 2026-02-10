const elementType = {
    VOID: 0,
    SAND: 1,
    WATER: 2,
    STONE: 3,
    FIRE: 4,
    WOOD: 5,
    ASH: 6,
    STEAM: 7
}

class Velocity{
    constructor(vx,vy){
        this.vx = vx;
        this.vy = vy;
    }
}

class Particle{
    constructor(type,x,y){
        sandbox[x][y] = this;
        this.type = type;
        this.x = x;
        this.y = y;

        this.isGravity = false;
        this.isFlammable = false;
        this.density = 1000;
        this.color = "red";
    }

    calculatePosition(){

    }

    canMoveTo(nx, ny) {

        if (nx >= 0 && nx < sandbox.length && ny >= 0 && ny < sandbox[0].length) {
            let target = sandbox[nx][ny];
    
            if (target === null) return true;
    
            if (target.isGravity && this.density > target.density) {
                return true;
            }
        }
        return false;
    }

    updateSandBox(px, py) {
        
        let occupant = sandbox[this.x][this.y];
    
        if (occupant !== null) {
            occupant.x = px;
            occupant.y = py;
            sandbox[px][py] = occupant;
        } else {
            sandbox[px][py] = null;
        }

        sandbox[this.x][this.y] = this;
    }
}

class Sand extends Particle{
    constructor(x,y){
        super(elementType.SAND, x, y);
        this.isGravity = true;
        this.isFlammable = false;
        this.density = 1600;

        this.color = `hsl(40, ${80 + myRandom() * 20}%, ${60 + myRandom() * 10}%)`;
    }

    calculatePosition() {
        if (this.y + 1 >= sandbox[0].length) return;
    
        let px = this.x;
        let py = this.y;
        let moved = false;

        if (this.canMoveTo(this.x, this.y + 1)) {
            this.y += 1;
            moved = true;
        }
        else {
            let dir = myRandom() < 0.5 ? -1 : 1;
            
            if (this.canMoveTo(this.x + dir, this.y + 1)) {
                this.x += dir;
                this.y += 1;
                moved = true;
            } else if (this.canMoveTo(this.x - dir, this.y + 1)) {
                this.x -= dir;
                this.y += 1;
                moved = true;
            }
        }
    
        if (moved) this.updateSandBox(px, py);
    }
}

class Water extends Particle{
    constructor(x,y){
        super(elementType.WATER, x, y);
        this.isGravity = true;
        this.isFlammable = false;
        this.density = 1000;
    
        this.color = `hsl(${200 + myRandom() * 15}, 80%, ${35 + myRandom() * 15}%)`;
    }

    calculatePosition() {

        if(myRandom()<0.005){ 
            this.color = `hsl(${200 + myRandom() * 15}, 80%, ${35 + myRandom() * 15}%)`;
        }

        if (this.y + 1 >= sandbox[0].length) return;
    
        let px = this.x;
        let py = this.y;
        let moved = false;
    
        if (this.canMoveTo(this.x, this.y + 1)) {
            this.y += 1;
            moved = true;
        } 
        
        if (!moved) {
            let dir = myRandom() < 0.5 ? -1 : 1;
            if (this.canMoveTo(this.x + dir, this.y + 1)) {
                this.x += dir;
                this.y += 1;
                moved = true;
            } else if (this.canMoveTo(this.x - dir, this.y + 1)) {
                this.x -= dir;
                this.y += 1;
                moved = true;
            }
        }
    
        if (!moved) {
            let flowDir = myRandom() < 0.5 ? -1 : 1;
            let speed = 5;
        
            for (let i = 0; i < speed; i++) {
                if (this.canMoveTo(this.x, this.y + 1)) {
                    this.y += 1;
                    moved = true;
                    break; 
                }
        
                if (this.canMoveTo(this.x + flowDir, this.y)) {
                    this.x += flowDir;
                    moved = true;
                } else {
                    break; // Hit a wall
                }
            }
        }
    
        if (moved) this.updateSandBox(px, py);
    }
}

class Stone extends Particle{
    constructor(x,y){
        super(elementType.STONE, x, y);
        this.isGravity = false;
        this.isFlammable = false;
        this.density = 2500;
        
        this.color = "gray";
    }
}

class Fire extends Particle {
    constructor(x, y) {
        super(elementType.FIRE, x, y);
        this.isGravity = false;
        this.density = 5;

        this.life = 5 + myRandom() * 20;
        this.color = `hsl(${10 + myRandom() * 20}, 100%, 50%)`;
    }

    calculatePosition() {

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

class Wood extends Particle {
    constructor(x, y) {
        super(elementType.WOOD, x, y);
        this.isGravity = false;
        this.isFlammable = true;
        this.density = 500;
        this.baseColor = "#451b0c";
        this.color = this.baseColor;
        
        this.fuel = 100 + myRandom() * 100;
        this.burning = false;
        this.wetness = 0;
    }

    calculatePosition() {
        this.checkInteractions();

        if (this.wetness > 0) {
            this.wetness--;
            this.isFlammable = false;
            this.color = "#2a1208";
        } else if (!this.burning) {
            this.isFlammable = true;
            this.color = this.baseColor;
        }

        if (this.burning) {
            this.fuel -= 1;
            let glow = 255 - this.fuel;
            this.color = `rgb(${glow}, 50, 20)`;
    
            if (this.fuel <= 0) {
                let tx = this.x;
                let ty = this.y;
                deleteParticle(tx, ty);

                if (myRandom() < 0.9) {
                    createParticle(tx, ty, elementType.FIRE);
                }else{
                    createParticle(tx, ty, elementType.ASH);
                }
                return;
            }

            let neighbors = [[0,1], [0,-1], [1,0], [-1,0]];
            for (let [dx, dy] of neighbors) {
                let nx = this.x + dx;
                let ny = this.y + dy;
                if (nx >= 0 && nx < GRID_WIDTH && ny >= 0 && ny < GRID_HEIGHT) {
                    let neighbor = sandbox[nx][ny];

                    if (neighbor && neighbor.isFlammable && !neighbor.burning) {
                        if (myRandom() < 0.01  && neighbor.wetness <= 0) {
                            neighbor.burning = true;
                        }
                    }
                }
            }
    
            if (myRandom() < 0.05) {
                if (this.y - 1 >= 0 && sandbox[this.x][this.y - 1] === null) {
                    createParticle(this.x, this.y - 1, elementType.FIRE);
                }
            }
        }
    }
    
    checkInteractions() {
        let neighbors = [[0,1], [0,-1], [1,0], [-1,0]];
        for (let [dx, dy] of neighbors) {
            let nx = this.x + dx;
            let ny = this.y + dy;
            
            if (nx >= 0 && nx < GRID_WIDTH && ny >= 0 && ny < GRID_HEIGHT) {
                let target = sandbox[nx][ny];
                if (!target) continue;
    
                if (target.type == elementType.WATER) {
                    this.wetness = 500;

                    if (this.burning) {
                        this.burning = false;
                    }
                }
            }
        }
    }
}

class Ash extends Particle {
    constructor(x,y){
        super(elementType.ASH, x, y);
        this.isGravity = true;
        this.isFlammable = false;
        this.density = 400;

        this.color = `hsl(0, 0%, ${30 + myRandom() * 20}%)`;
    }

    calculatePosition() {
        if (this.y + 1 >= sandbox[0].length) return;
    
        let px = this.x;
        let py = this.y;
        let moved = false;
    
        const isUnderneath = this.y + 1 < sandbox[0].length && sandbox[this.x][this.y + 1] !== null;
        const isBlockedSide = (this.x + 1 >= sandbox.length || sandbox[this.x + 1][this.y] !== null) && 
                              (this.x - 1 < 0 || sandbox[this.x - 1][this.y] !== null);
    
        if (!(isUnderneath && isBlockedSide)) {
            let p = myRandom();
            
            if (p < 0.3) {
                if (this.canMoveTo(this.x, this.y + 1)) {
                    this.y += 1;
                    moved = true;
                } else {
                    let dir = myRandom() < 0.5 ? -1 : 1;
                    if (this.canMoveTo(this.x + dir, this.y + 1)) {
                        this.x += dir;
                        this.y += 1;
                        moved = true;
                    } else if (this.canMoveTo(this.x - dir, this.y + 1)) {
                        this.x -= dir;
                        this.y += 1;
                        moved = true;
                    }
                }
            } 
            else if (p < 0.8) {
                if (this.canMoveTo(this.x, this.y + 1)) {
                    let dirX = myRandom() < 0.5 ? -1 : 1;
                    if (this.canMoveTo(this.x + dirX, this.y)) {
                        this.x += dirX;
                        moved = true;
                    }
                }
            }
        }
    
        if (moved) this.updateSandBox(px, py);
    }
}

class Steam extends Particle {
    constructor(x, y) {
        super(elementType.STEAM, x, y);
        this.isGravity = false;
        this.isFlammable = false;
        this.density = 10;
        this.maxLife = 300 + myRandom() * 100;
        this.life = this.maxLife;
        this.color = "white";
    }

    calculatePosition() {
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