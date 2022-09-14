
// https://www.geeksforgeeks.org/what-is-export-default-in-javascript/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

// So static ball is made DYNAMIC by making it an obkect with attributes
// hence need for class + constructor

const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.00001

export default class Ball{
    constructor(ballElem){
    this.ballElem = ballElem

    // for better readbility, think should have DECLARED the variables here!!
    //this.direction
    //this.velocity
    this.reset()        // method, not attribute
    }

    get x(){
        // get x co-ord of ball

        let temp        // declare new variable. Not updated with value yet.
        // get whole ball object from css, then select the specific attribute/ property needed
        
        temp =  getComputedStyle(this.ballElem).getPropertyValue("--x")  //https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
        return parseFloat(temp)
    }
    
    set x(value){
        //set x co-ord of ball
        this.ballElem.style.setProperty("--x", value)
    }

    get y(){
        
        let temp2       
        temp2 =  getComputedStyle(this.ballElem).getPropertyValue("--y")  
        return parseFloat(temp2)
    }
    
    set y(value){
        this.ballElem.style.setProperty("--y", value)
    }

    rect(){
        return this.ballElem.getBoundingClientRect()  // return info about smallest rect that completely encloses the object of interest here
                                                    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    }

    // reset ball position. Re-start game
    // sets random starting direction by choosing random number and taking vertical + horizontal components for directin vector
    reset(){
        this.x = 50
        this.y = 50

        //set direction
        this.direction = {x:0}   // creating attriubute for ball?

        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x > 0.9)){
            const heading = randomNumberBetween(0,2*Math.PI)
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }
        // set velocity
        //console.log(this.direction)
        this.velocity = INITIAL_VELOCITY 
    }
    update(delta, paddleRects){
        // update ball position + properties after delta has passed?
        // then pass to screen so can be rendered.Delta is added complexity as tutor considering frame rate + seconds elapsed since last update
        // AND is treating this as variable!!

        // ball params/ attributes have been specified in stylesheet!!
           
        this.x += this.direction.x * this.velocity *delta       // so JS is clever and automatically runs setter!!
        this.y += this.direction.y * this.velocity *delta
        
        this.velocity += VELOCITY_INCREASE* delta

        // reverse direction of ball if hits x boundaries OR y boundaries
        const rect = this.rect()
        if(rect.bottom >= window.innerHeight || rect.top <=0){
            // so 0,0 is top LHS? - https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
            this.direction.y *= -1  // flip direction
        }

        //if(rect.right >= window.innerWidth || rect.left <=0){
            // so 0,0 is top LHS? - https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        //    this.direction.x *= -1  // flip direction
        //}

        if(paddleRects.some(r => isCollision(r,rect))){
            // some checks if each item in ARRAY passes the test
            this.direction.x *= -1        // reverese direction
        }
    }
    
}

// function outside getter and setter scope. global? Sits outside the methods
// DO NOT belong to classes/ objects - https://www.geeksforgeeks.org/difference-between-methods-and-functions-in-javascript/
function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}

function isCollision(rect1, rect2){
    // this allows the bottom corner of rectangle surrounding ball to be struck for vlaid rebound as well as side of ball
    return (
        rect1.left <= rect2.right && 
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
        )
}