export class Layer{
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.x = 0;
        this.y = 0;
        this.image = image;
    }
    update(deltaTime){
        //Move image to the left//i
        if(this.x > -this.game.width){
            this.x -= this.game.speed  * this.speedModifier;
        } else {
            this.x = 0;
        }
    }
    draw(context){
        if(this.speedModifier == 0.9){
        context.drawImage(this.image,this.x + this.game.width, this.game.height - this.height, this.width, this.height);   
        } else {
            context.drawImage(this.image,this.x + this.game.width, 0, this.width, this.height);   
            context.drawImage(this.image,this.x, 0, this.width, this.height);   
        }
    }


    }
    
export class Background {
      constructor(game){
        this.game = game;

        this.layer1Image = document.getElementById('layer1');
        this.layer2Image = document.getElementById('layer2');
        this.layer3Image = document.getElementById('layer3');
        this.layer4Image = document.getElementById('layer4');
        this.layer5Image = document.getElementById('layer5');
        this.layer6Image = document.getElementById('layer6');

        //INSTANCE FROM EACH LAYER FROM SLOWEST TO FASTEST//
         this.layer1 = new Layer (this.game, this.game.width, 200,0.9, this.layer1Image);
         this.layer2 = new Layer (this.game, this.game.width, this.game.height, 1, this.layer2Image);
         this.layer3 = new Layer (this.game, this.game.width, this.game.height, 2, this.layer3Image);
         this.layer4 = new Layer (this.game, this.game.width, this.game.height , 3, this.layer4Image);
         this.layer5 = new Layer (this.game, this.game.width, this.game.height, 4, this.layer5Image);
         this.layer6 = new Layer (this.game, this.game.width, this.game.height, 5, this.layer6Image);

         this.layers = [ this.layer4, this.layer3, this.layer2, this.layer1, this.layer6, this.layer5 ];
    }
    update(deltaTime){
        this.layers.forEach(layer => layer.update(deltaTime));

    }
    draw(context){
        this.layers.forEach(layer => layer.draw(context))
    }

    }