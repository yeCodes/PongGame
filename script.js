
import Ball from './Ball.js'
import Paddle from "/Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle")) // get DOM from HTML
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime

function update(time) {
    if (lastTime != null){
        const delta = time - lastTime   // compute time since last frame refresh
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])             //setting frame rate here. How often frame refreshes/ updates
        computerPaddle.update(delta, ball.y)

        if(isLose()){
            console.log("lose")
            handleLose()

        }
    }
 
    lastTime = time			// update lastTime frame refreshed
    
    window.requestAnimationFrame(update)

}

function isLose(){
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <=0
}

function handleLose(){
    const rect = ball.rect()
    if (rect.right >= window.innerWidth){
        // player scored
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    }else{
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }

    ball.reset()
    computerPaddle.reset()
}
// add evemt listener to document
document.addEventListener("mousemove", e=>{
    playerPaddle.position = (e.y/ window.innerHeight)*100 // converts pixel position to relative position wrt. window
})

window.requestAnimationFrame(update)
