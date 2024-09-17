export const states ={
    IDLE: 0,
    JUMP: 1,
    RUN: 2,
    FALL: 3,
    KO: 4,
    DIZZY: 5,
    GETHIT: 6,
    ATTACK: 7,
    DEATH: 8
}
export class State {
    constructor(state){
        this.state = state;
    }
}
export class Idle extends State{
    constructor(game){
        super('IDLE')
        this.game = game;        
    }
    handleInput(){
        if(this.game.input.keys.includes('ArrowRight')){
            this.game.player.playerStates[states.RUN].enter();
        }
        if(this.game.input.keys.includes('ArrowLeft')){
            this.game.player.playerStates[states.RUN].enter();
        }
        if (this.game.input.keys.includes('Enter')){
            this.game.player.playerStates[states.ATTACK].enter();
        }
    }

     enter(){
        this.game.player.currentState = states[this.state];
        this.game.player.currentFrame = 0;
    }

    
    
}

export class Jump extends State{
    constructor(game){
        super('JUMP')
        this.game = game;
    }
    enter(){
        this.game.player.currentState = states[this.state];
        this.player.currentFrame = 0;
    }
    handleInput(){
        if (this.game.input.includes('ArrowDown')){
            this.game.player.playerStates[states.FALL].enter();
        }
    }
}
export class Run extends State{
    constructor(game){
        super('RUN')
        this.game = game;
    }
    enter(){
        this.game.player.currentState = states[this.state];
        this.game.player.currentFrame = 0;    
}
handleInput(){
    if (this.game.player.speed == 0){
        this.game.player.playerStates[states.IDLE].enter();
    }
    if (this.game.input.keys.includes('Enter')){
        console.log("attack : ", states.ATTACK, " playerStates : ", this.game.player.playerStates);
        this.game.player.playerStates[states.ATTACK].enter();
    }

}
}

export class Fall extends State{
    constructor(game){
        super('FALL')
        this.game = game;
    }
    enter(){

        this.game.player.currentState = states[this.state];
        this.player.currentFrame = 0;
    }
    handleInput(){

    }
}

export class Ko extends State{
    constructor(game){
        super('KO')
        this.game = game;
    }
    enter(){
        this.game.player.currentState = states[this.state];
        this.player.currentFrame = 4;    
}
handleInput(){
    
}
}
export class Dizzy extends State{
    constructor(game){
        super('DIZZY')
        this.game = game;
    }
    enter(){
        this.game.player.currentState = states[this.state];
        this.player.currentFrame = 5;    
}
handleInput(){

}
}
export class Gethit extends State{
    constructor(game){
        super('GETHIT')
        this.game = game;
    }
    enter(){
        this.game.player.currentState = states[this.state];
        this.player.currentFrame = 0;    
}
handleInput(){

}
}

export class Attack extends State{
    constructor(game){
        super('ATTACK')
        this.game = game;
    }
    enter(){
        this.game.player.currentState = states[this.state];
        this.game.player.currentFrame = 0;    
}
handleInput(){
    if (!(this.game.input.keys.includes('Enter'))){
        this.game.player.playerStates[states.IDLE].enter();
    }

}
}

export class DEATH extends State{
    constructor(game){
        super('DEATH')
        this.game = game;
    }
    enter(){
        this.game.player.currentState = states[this.state];
        this.game.player.currentFrame = 0;    
}
handleInput(){
    if(this.game.player.currentFrame >= this.game.player.playerIdle[states.DEATH].length - 1){
        this.game.gameOver = true;
    }   
}
}
