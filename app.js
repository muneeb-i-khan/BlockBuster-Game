const scoreDisplay = document.querySelector('#score')
const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 25;
const boardWidth = 790;
const border = 680;
const boardHeight = 300;
let speed = 30;

const userStart = [340, 10];
let currentPos = userStart;

const ballStart = [380, 40];
let ballCurrentPos = ballStart;

let timerId;
const ballDia = 20;
let xDirection = 2
let yDirection = 2
let score = 0;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(560, 270),
    new Block(670, 270),

    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(560, 240),
    new Block(670, 240),

    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
    new Block(560, 210),
    new Block(670, 210),

    new Block(10, 180),
    new Block(120, 180),
    new Block(230, 180),
    new Block(340, 180),
    new Block(450, 180),
    new Block(560, 180),
    new Block(670, 180),

    new Block(10, 150),
    new Block(120, 150),
    new Block(230, 150),
    new Block(340, 150),
    new Block(450, 150),
    new Block(560, 150),
    new Block(670, 150),


]

// console.log(blocks[0])


function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block)
    }
}

addBlocks();

const user = document.createElement('div')
user.classList.add('user');
drawUser();
grid.appendChild(user)


function drawUser() {
    user.style.left = currentPos[0] + 'px';
    user.style.bottom = currentPos[1] + 'px'
}

function incSpeed(){
    if(score >= 3 && score < 6){
        speed = 20;
    }
    if(score >= 6 && score < 10){
        speed = 15;
    }
    if(score >= 10 && score < 16){
        speed = 10;
    }

    if(score >= 16){
        speed = 5;
    }
}
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPos[0] > 0) {
                currentPos[0] -= 10;
                // user.style.left = currentPos[0] + 'px';
                drawUser();
            }

            break;
        case 'ArrowRight':
            if (currentPos[0] < border) {
                currentPos[0] += 10;
                drawUser();
            }
            break;
        // case 'ArrowDown':
        //     currentPos[1] -= 10;
        //     drawUser();
        //     break;
        // case 'ArrowUp':
        //     currentPos[1] += 10;
        //     drawUser();
        //     break;        
    }
}

document.addEventListener('keydown', moveUser)

function drawBall() {
    ball.style.left = ballCurrentPos[0] + 'px';
    ball.style.bottom = ballCurrentPos[1] + 'px';
}
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function moveBall() {
    ballCurrentPos[0] += xDirection;
    ballCurrentPos[1] += yDirection;
    drawBall();
    chkCollisions();

}
timerId = setInterval(moveBall,speed)

function chkCollisions() {

    //check for block collision
    for(let i =0; i< blocks.length ; i++){
        if(
            (ballCurrentPos[0] > blocks[i].bottomLeft[0] && ballCurrentPos[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPos[1] + ballDia) > blocks[i].bottomLeft[1] && ballCurrentPos[1] < blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection();
            score++;
            incSpeed();
            // alert(`Your score is ${score}`);
            scoreDisplay.innerHTML = `Your score is ${score}`;
            
        }

    }
    if (ballCurrentPos[0] >= (boardWidth - ballDia) || 
    ballCurrentPos[1] >= (boardHeight - ballDia) ||
    (ballCurrentPos[0] <= 0)
    ){
        changeDirection()
    }
//user collision
if(
    (ballCurrentPos[0] > currentPos[0] && ballCurrentPos[0]< currentPos[0] + blockWidth) &&
    (ballCurrentPos[1] > currentPos[1] && ballCurrentPos[1] < currentPos[1] + blockHeight)
    ){
changeDirection();
}

if(blocks.length === 0){
    scoreDisplay.innerHTML = `You Win and your score was ${score}`
    clearInterval(timerId)
    document.removeEventListener('keydown', moveUser);
}

//game over
    if(ballCurrentPos[1] <= 0){
        clearInterval(timerId);
        scoreDisplay.innerHTML = `You Lose and your score was ${score}`
        // alert('You Lose')
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection() {
    if(xDirection === 2 && yDirection ===2){
        yDirection = -2
        return
    }

    if(xDirection === 2 && yDirection === -2){
        xDirection = -2;
        return;
    }

    if(xDirection === -2 && yDirection === -2){
        yDirection = 2;
        return
    }

    if(xDirection == -2 && yDirection === 2){
        xDirection = 2;
        return;
    }
}