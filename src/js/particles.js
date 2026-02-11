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
        this.isDead = false;

        this.isGravity = false;
        this.isFlammable = false;
        this.density = 1000;
        this.flowRate = 0;
        this.life = 0;
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