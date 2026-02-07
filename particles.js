const elementType = {
    ERASER: 0,
    SAND: 1,
    WATER: 2,
    STONE: 3
}

class Velocity{
    constructor(vx,vy){
        this.vx = vx;
        this.vy = vy;
    }
}

class Particle{
    constructor(type,x,y,vx,vy,isGravity, density){
        sandbox[x][y] = this;
        this.elementType = type;
        this.x = x;
        this.y = y;
        this.velocity = new Velocity(vx,vy)
        this.isGravity = isGravity;
        this.density = density;
        this.color = "red";
    }

    calculatePosition(){

    }

    canMoveTo(nx, ny) {
        if(nx >= 0 && nx < sandbox.length){
            if(sandbox[nx][ny] === null || sandbox[nx][ny].density < this.density){
                return true;
            }
        }
        return false;
    }

    updateSandBox(px,py){
        if(sandbox[this.x][this.y] != null){ // if they new position isn't empty
            sandbox[this.x][this.y].x = px;
            sandbox[this.x][this.y].y = py;
            sandbox[px][py] = sandbox[this.x][this.y];
        }else{
            sandbox[px][py] = null;
        }
        sandbox[this.x][this.y] = this;
    }
}

class Sand extends Particle{
    constructor(x,y){
        super(elementType.SAND, x, y, 0, 1, true, 2);

        // Vibrant Orange-Gold
this.color = `hsl(40, ${80 + Math.random() * 20}%, ${60 + Math.random() * 10}%)`;
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
            let dir = Math.random() < 0.5 ? -1 : 1;
            
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
        super(elementType.WATER, x, y, 1, 1, true, 1);
    
        this.color = `hsl(190, ${80 + Math.random() * 20}%, ${50 + Math.random() * 20}%)`;
    }

    calculatePosition() {

        if(Math.random()<0.02){ 
            this.color = `hsl(190, ${80 + Math.random() * 20}%, ${50 + Math.random() * 20}%)`;
        }

        if (this.y + 1 >= sandbox[0].length) return;
    
        let px = this.x;
        let py = this.y;
        let moved = false;
    
        if (sandbox[this.x][this.y + 1] === null) {
            this.y += 1;
            moved = true;
        } 
        
        if (!moved) {
            let dir = Math.random() < 0.5 ? -1 : 1;
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
            let flowDir = Math.random() < 0.5 ? -1 : 1;
            let speed = 5;
            
            for (let i = 0; i < speed; i++) {
                if (this.canMoveTo(this.x + flowDir, this.y)) {
                    this.x += flowDir;
                    moved = true;
                } else {
                    break;
                }
            }
        }
    
        if (moved) this.updateSandBox(px, py);
    }
}

class Stone extends Particle{
    constructor(x,y){
        super(elementType.STONE, x, y, 0, 0, false, 3);
        
        this.color = "gray";
    }
}