import { states, Idle, Jump, Run, Fall, Dizzy, Gethit, Attack, Ko, DEATH } from "./playerstates.js";


export class Player {
    constructor(game){
        this.game = game;
        this.width = 306;
        this.height = 148;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1.5;
        this.speed = 0;
        this.maxSpeed = 13;
        this.currentFrame = 0;
        this.currentState = 0;
        this.playerIdle = [[], [], [], [], [], [], [], [], []];
        this.fillArray();
        this.playerStates = [new Idle(game), new Jump(game), new Run(game),new Ko(game), new Fall(game), new Dizzy(game), new Gethit(game), new Attack(game), new DEATH(game)];
        this.life = 8;
        this.image = this.playerIdle[this.currentState][this.currentFrame];
        this.fps = 54;
        this.timeInterval = 1000/ this.fps;
        this.countTime = 0;
        this.collisionTime = 0;
    }

    fillArray() {
        for (let i = 1; i < 21; i++){
            this.playerIdle[states.IDLE].push(document.getElementById(`idle${i}`)); 
        }
        for(let i = 0; i < 10; i++){
            this.playerIdle[states.JUMP].push(document.getElementById(`jump${i}`));
        }
        for (let i = 0; i < 12; i++){
            this.playerIdle[states.RUN].push(document.getElementById(`run${i}`));
        }
        for (let i = 0; i < 11; i++){
            this.playerIdle[states.FALL].push(document.getElementById(`fall${i}`));
        }
        for (let i = 0; i < 31; i++){
            this.playerIdle[states.KO].push(document.getElementById(`ko${i}`));
        }
        for (let i = 0; i < 21; i++){
            this.playerIdle[states.DIZZY].push(document.getElementById(`dizzy${i}`));
        }
        for (let i = 0; i < 9; i++){
            this.playerIdle[states.GETHIT].push(document.getElementById(`gethit${i}`));
        }
        for (let i= 0; i < 31; i++){
            this.playerIdle[states.ATTACK].push(document.getElementById(`attack${i}`));
        }

        for (let i= 0; i < 11; i++){
            this.playerIdle[states.DEATH].push(document.getElementById(`death${i}`));
        }

    }

    update(input, deltaTime){
        this.checkCollision(deltaTime);
        this.playerStates[this.currentState].handleInput();
        //Horizontal mouvement//
        this.x += this.speed;
        this.speed = this.maxSpeed;
        if (input.includes('ArrowRight')){
        this.speed = this.maxSpeed;
        }
        else if (input.includes('ArrowLeft')){
            this.speed = -this.maxSpeed;
        }
        else this.speed = 0;
        //Horizontal Boundaries//
        if ( this.x < 0){
            this.x = 0;
        }
        else if ( this.x > this.game.width - this.width){
            this.x = this.game.width - this.width;
        }
        //VERTICAL MOUVEMENT//
        this.y += this.vy;
        
        if (this.onGround() && input.includes('ArrowUp')){
            this.vy = -50;
        }
        if (input.includes('ArrowDown')){
            this.vy = 70;
        }
        
        if(!this.onGround()){
            this.vy += this.weight;
        }

        // vertical boundaries
        if(this.onGround() && this.vy > 0){
            this.vy = 0;
            this.y = this.game.height - this.height;
        }

        //Arrow and States//
        if(input.includes('ArrowUp')){
                   
        }

        //CHANGING FRAMES//
        if (this.countTime > this.timeInterval){
            this.countTime = 0;
            this.changeFrame();
        } else {
            this.countTime += deltaTime;
        }
                      
        
    }
    //COLLISION//
    checkCollision(deltaTime){
        this.game.enemies.forEach(enemy => {
            if ( enemy.x +  200 < this.x + this.width 
                &&
                enemy.x + enemy.width> this.x + 200
                &&
                enemy.y < this.y + this.height
                && 
                enemy.y + enemy.height > this.y){
                    if(this.currentState == states.ATTACK){
                        this.game.score++;
                        enemy.markedForDeletion = true;
                    } 
                    if(this.collisionTime > 2000){
                        if(this.life < 1){
                            this.playerStates[states.DEATH].enter();
                        } else this.life--;
                        this.collisionTime = 0;
                    } else {
                        this.collisionTime += deltaTime;
                    }
            }
        })
    }
 
    onGround(){
        return this.y > this.game.height - this.height - this.game.groundMargin;
    }

    changeFrame(){
        if(this.currentFrame < this.playerIdle[this.currentState].length - 1){
            this.currentFrame++;
        }
        else{
            this.currentFrame = 0;
        }       
        this.image = this.playerIdle[this.currentState][this.currentFrame];
    }

    draw(context){
        context.drawImage(this.image, 0, 0, 1430, 786, this.x, this.y - this.game.groundMargin, this.width, this.height);
    }
}