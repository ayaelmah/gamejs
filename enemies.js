class enemies{
    constructor(){
        this.fps = 30;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    update(deltaTime){
  
    }
    draw(context){
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width / 3, this.height / 3)

    }
}


export class skeleton extends enemies{
    constructor(game){
        super();
        this.game = game;
        this.skeleton = [];
        this.currentImage = 0;
        this.width = 1215;
        this.height = 715;
        this.maxImages = 11;
        this.markedForDeletion = false;
        
        for(let i = 0; i < 12 ; i++){
            this.skeleton.push(document.getElementById(`ske${i}`));
        }

        this.image = this.skeleton[this.currentImage]
        this.x = this.game.width - this.width/3;
        this.y = this.game.height - this.height/3 - this.game.groundMargin;
    }

    update(deltaTime){
        if (this.frameTimer > this.frameInterval){
            if(this.currentImage < this.maxImages){
                this.currentImage++;
            } else {
                this.currentImage = 0;
            }
            this.frameTimer = 0;
            this.image = this.skeleton[this.currentImage]
    } else {
        this.frameTimer += deltaTime;
    }
        this.x -= this.game.speed * 2;
        if(this.x < -this.width / 3){
            this.markedForDeletion = true;
        } 
    }
}
