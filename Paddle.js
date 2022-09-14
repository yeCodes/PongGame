const SPEED = 0.009

export default class Paddle{
    // defining  strucutre of new paddle element made
    constructor(paddleElem){
       this.paddleElem  = paddleElem
       this.reset()
    } 

    get position(){
        // documentation uses DOCUMENT query selector first to retrieve element of interest
        // const para = document.querySelector('p'); - https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
        let temp3
        temp3 =  getComputedStyle(this.paddleElem).getPropertyValue("--position")  //https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
        return parseFloat(temp3)
    }
    set position(value){
        this.paddleElem.style.setProperty("--position", value)

    }

    rect(){
        // rect enclosing the ball
        return this.paddleElem.getBoundingClientRect()
    }
    update(delta, ballHeight){
        // a control formula. proportional control - UPDATE FORMULA
        this.position += SPEED *delta* (ballHeight - this.position)

    }

    reset(){
        this.position = 50
    }
    
}
