const elementType = {
    AIR: 0,
    SAND: 1,
    WATER: 2,
    STONE: 3
}
let elementColor = new Map();

elementColor.set(elementType.AIR, "0x000");
elementColor.set(elementType.SAND, "yellow");
elementColor.set(elementType.WATER, "blue");
elementColor.set(elementType.STONE, "gray");

class Velocity{
    constructor(vx,vy){
        this.vx = vx;
        this.vy = vy;
    }
}

class Particle{
    constructor(type,x,y,vx,vy,isGravity){
        sandbox[x][y] = type;
        this.elementType = type;
        this.x = x;
        this.y = y;
        this.velocity = new Velocity(vx,vy)
        this.isGravity = isGravity;
    }
}

class Sand extends Particle{
    constructor(x,y){
        super(elementType.SAND, x, y, 0, 1, true);
    }

    calculatePosition() {

        if (this.y + 1 >= sandbox[0].length) { // bottom
            return;
        }

        let px = this.x;
        let py = this.y;

        if(this.x-1 < 0){ // left edge
            if(sandbox[this.x][this.y+1] == elementType.AIR){
                this.x += 0;
                this.y += 1;
            }else if(sandbox[this.x+1][this.y+1] == elementType.AIR){
                this.x += 1;
                this.y += 1;
            }
            return;
        }

        if(this.x + 1 >= sandbox.length){ // right edge
            if(sandbox[this.x][this.y+1] == elementType.AIR){
                this.x += 0;
                this.y += 1;
            }else if(sandbox[this.x-1][this.y+1] == elementType.AIR){
                this.x += -1;
                this.y += 1;
            }
            return;
        }

        if(sandbox[this.x][this.y+1] == elementType.AIR){
            this.x += 0;
            this.y += 1;
        }else if(sandbox[this.x-1][this.y+1] == elementType.AIR){
            this.x += -1;
            this.y += 1;
        }else if(sandbox[this.x+1][this.y+1] == elementType.AIR){
            this.x += 1;
            this.y += 1;
        }else{
            this.x += 0;
            this.y += 0;
        }

        this.updateSandBox(px, py);
    }

    updateSandBox(px,py){
        sandbox[px][py] = elementType.AIR;
        sandbox[this.x][this.y] = this.elementType;
    }
}

class Water extends Particle{
    constructor(x,y){
        super(elementType.WATER, x, y, 1, 1, true);
    }

    calculatePosition() {

        if (this.y + 1 >= sandbox[0].length) { // bottom
            return;
        }

        let px = this.x;
        let py = this.y;

        if(this.x-1 < 0){ // left edge
            if(sandbox[this.x][this.y+1] == elementType.AIR){
                this.x += 0;
                this.y += 1;
            }else if(sandbox[this.x+1][this.y+1] == elementType.AIR){
                this.x += 1;
                this.y += 1;
            }else if(sandbox[this.x+1][this.y] == elementType.AIR){
                this.x += 1;
                this.y += 0;
            }
            this.updateSandBox(px, py);
            return;
        }

        if(this.x + 1 >= sandbox.length){ // right edge
            if(sandbox[this.x][this.y+1] == elementType.AIR){
                this.x += 0;
                this.y += 1;
            }else if(sandbox[this.x-1][this.y+1] == elementType.AIR){
                this.x += -1;
                this.y += 1;
            }else if(sandbox[this.x-1][this.y] == elementType.AIR){
                this.x += -1;
                this.y += 0;
            }
            this.updateSandBox(px, py);
            return;
        }

        if(Math.random() < 0.5){
            if(sandbox[this.x][this.y+1] == elementType.AIR){
                this.x += 0;
                this.y += 1;
            }else if(sandbox[this.x-1][this.y+1] == elementType.AIR){
                this.x += -1;
                this.y += 1;
            }else if(sandbox[this.x+1][this.y+1] == elementType.AIR){
                this.x += 1;
                this.y += 1;
            }else if(sandbox[this.x-1][this.y] == elementType.AIR){
                this.x += -1;
                this.y += 0;
            }else if(sandbox[this.x+1][this.y] == elementType.AIR){
                this.x += 1;
                this.y += 0;
            }else{
                this.x += 0;
                this.y += 0;
            }
        }else{
            if(sandbox[this.x][this.y+1] == elementType.AIR){
                this.x += 0;
                this.y += 1;
            }else if(sandbox[this.x+1][this.y+1] == elementType.AIR){
                this.x += 1;
                this.y += 1;
            }else if(sandbox[this.x-1][this.y+1] == elementType.AIR){
                this.x += -1;
                this.y += 1;
            }else if(sandbox[this.x+1][this.y] == elementType.AIR){
                this.x += 1;
                this.y += 0;
            }else if(sandbox[this.x-1][this.y] == elementType.AIR){
                this.x += -1;
                this.y += 0;
            }else{
                this.x += 0;
                this.y += 0;
            }
        }

        this.updateSandBox(px, py);
    }

    updateSandBox(px,py){
        sandbox[px][py] = elementType.AIR;
        sandbox[this.x][this.y] = this.elementType;
    }
}

class Stone extends Particle{
    constructor(x,y){
        super(elementType.STONE, x, y, 1, 1, false);
    }
}