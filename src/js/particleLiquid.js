class ParticleLiquid extends Particle{
    constructor(type,x,y){
        super(type, x, y);

        this.isGravity = true;
        this.flowRate = 1;
    }

    calculatePosition(){
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
        
            for (let i = 0; i < this.flowRate; i++) {
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

class Water extends ParticleLiquid{
    constructor(x,y){
        super(elementType.WATER, x, y);
        this.isFlammable = false;
        this.density = 1000;

        this.flowRate = 5;
    
        this.color = `hsl(${200 + myRandom() * 15}, 80%, ${35 + myRandom() * 15}%)`;
    }

    update() {
        if(myRandom()<0.005){ 
            this.color = `hsl(${200 + myRandom() * 15}, 80%, ${35 + myRandom() * 15}%)`;
        }

        this.calculatePosition();
    }
}