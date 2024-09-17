import { Player } from './player.js';
import { InputHandler } from './inputhandeler.js';
import { Layer, Background } from './layer.js';
import { skeleton } from './enemies.js';
import { UI } from './Ui.js';


window.addEventListener('load',  function(){0
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = 1920;
    let height = canvas.height = 1080;
    const box = document.getElementById("textBox");
    const question = document.querySelector("#textBox h3");
    const input = document.querySelector("input");
    const submit = document.getElementById("submit");
    const error = document.querySelector("#error");

    submit.addEventListener("click", (e)=>{
        if(input.value == game.questions[Math.floor(game.currentQuestion)].answer){
            game.time = 0;
            game.gameOver = false;
            game.ui.draw(ctx);
            input.value = "";
            box.classList.add("hide");
            error.classList.remove("hide");
            game.player.life = 10;
            game.player.currentState = 0;
            animate(0)
        } else {
            error.classList.remove("hide");
        }
    })

    class Game{
        constructor(width, height){
            box.classList.add("hide");
            error.classList.add("hide");
            this.questions = [{
                question: "In what year did the Titanic sink? (a) 1905 (b) 1912 (c) 1920",
                answer: "b"
            }, {
                question: "Who was the first President of the United States? (a) Thomas Jefferson (b) John Adams (c) George Washington",
                answer: "c"
            }, {
                question: "What year did World War II end? (a) 1939 (b) 1941 (c) 1945",
                answer: "c"
            }, {
                question: "Which ancient civilization built the pyramids? (a) Greeks (b) Romans (c) Egyptians",
                answer: "c"
            }, {
                question: "In which year did the Berlin Wall fall? (a) 1980 (b) 1985 (c) 1989",
                answer: "c"
            }];
            this.currentQuestion = 0;
            this.width = width;
            this.height = height;
            this.speed = 3;
            this.fontColor = 'black';
            this.maxSpeed = 10;
            this.groundMargin = 200;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.background = new Background(this);
            this.enemies = [new skeleton(this), new skeleton(this)];
            this.timeInterval = 2000;
            this.timeCounter = 0;
            this.score = 0;
            this.time = 0;
            this.maxTime = 60000;
            this.gameOver = false;
            this.ui = new UI(this);
        }
        update(deltaTime){
            if (this.timeCounter > this.timeInterval){
                this.enemies.unshift(new skeleton(this));

                this.timeCounter = 0;
             } else this.timeCounter += deltaTime;         
            this.background.update(deltaTime);
            this.player.update(this.input.keys, deltaTime);
            this.enemies.forEach((enemy)=>{
                enemy.update(deltaTime);
                if(enemy.markedForDeletion){
                    this.enemies.splice(this.enemies.indexOf(this.enemy), 1);
                }
            })
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach((enemy)=>{
                enemy.draw(context)
            })
            this.ui.draw(context);
        }
    
    }

    const game = new Game(width, height);

    let lastTime = 0;
    
    function animate(timeStamp){
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, width, height);
    game.update(deltaTime);
    game.draw(ctx);
    game.time += deltaTime;
    if(game.time > game.maxTime){
        game.gameOver = true;
    }
    if(game.gameOver){
        box.classList.remove("hide");
        game.currentQuestion = Math.random();
        question.innerText = game.questions[Math.floor(game.currentQuestion)].question;
        game.ui.draw(ctx);     
    }
   if(!game.gameOver) {
    requestAnimationFrame(animate);
    }
}
animate(0);


});