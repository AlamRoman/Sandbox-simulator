class ParticleSolid extends Particle{
    constructor(type,x,y){
        super(type, x, y);
    }
    
    calculatePosition() {
        if(!this.isGravity) return;
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

class Sand extends ParticleSolid{
    constructor(x,y){
        super(elementType.SAND, x, y);
        this.isGravity = true;
        this.isFlammable = false;
        this.density = 1600;

        this.color = `hsl(40, ${80 + myRandom() * 20}%, ${60 + myRandom() * 10}%)`;
    }

    update() {
        this.calculatePosition();
    }
}

class Stone extends ParticleSolid{
    constructor(x,y){
        super(elementType.STONE, x, y);
        this.isGravity = false;
        this.isFlammable = false;
        this.density = 2500;
        
        const v = 80 + Math.floor(myRandom() * 20); 
        this.color = `rgb(${v}, ${v + 2}, ${v + 10})`;
    }
}

class Wood extends ParticleSolid {
    constructor(x, y) {
        super(elementType.WOOD, x, y);
        this.isGravity = false;
        this.isFlammable = true;
        this.density = 500;
        
        const v = Math.floor(myRandom() * 10); 
        this.baseColor = `rgb(${60 + v}, ${35 + v}, ${15 + v})`;
        this.color = this.baseColor;
        
        this.fuel = 100 + myRandom() * 100;
        this.burning = false;
        this.wetness = 0;
    }

    update() {
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
                    if (this.y - 1 >= 0 && sandbox[this.x][this.y - 1] === null) {
                        createParticle(this.x, this.y, elementType.FIRE);
                    }
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

class Ash extends ParticleSolid {
    constructor(x,y){
        super(elementType.ASH, x, y);
        this.isGravity = true;
        this.isFlammable = false;
        this.density = 400;

        this.color = `hsl(0, 0%, ${10 + myRandom() * 10}%)`;
    }

    update() {
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