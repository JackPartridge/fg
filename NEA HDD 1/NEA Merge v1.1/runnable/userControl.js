//let node = undefined;
let startTime = 0;
let playerMoves = 0;
let playerFinishedLevel;
let gameTimer = 0;
let subtraction = 0;
let additionX = 0;
let additionY = 0;
let moveCounter = 0;
let keyCounter = 0;
let colliding = false;

class UserNode {

    constructor() {
        playerFinishedLevel = false;
        this.x = 0;
        this.y = 0;
        this.i = Math.round(this.x / (s) + s);
        this.j = Math.round(this.y / (s) + s);
        this.dir = null;
        startTime = performance.now();
        subtraction = performance.now();
        gameTimer = performance.now() - subtraction;

    }

    collisions() {
        switch (this.dir) {
            case "right":
                if (this.i > rows - 1) {
                    this.dir = null;
                    colliding = true;
                } else {
                    colliding = false;
                }
                break;
            case "up":
                if (this.j < 0) {
                    this.dir = null;
                    colliding = true;
                } else {
                    colliding = false;
                }
                break;
            case "down":
                if (this.j > cols - 1) {
                    this.dir = null;
                    colliding = true;
                } else {
                    colliding = false;
                }
                break;
            case "left":
                if (this.i < 0) {
                    this.dir = null;
                    colliding = true;
                } else {
                    colliding = false;
                }
                break;
        }
    }

    update() {
        switch (this.dir) {
            case "right":
                gameTimer = performance.now() - subtraction;
                this.collisions();
                if (!grid[this.i][this.j].walls[1] && !grid[this.i + 1][this.j].walls[3]) {
                    this.x += (5);
                } else {
                    colliding = true;
                    //additionX = +(s / 2);
                    //additionY = 0;
                    //this.x += (s / 2)
                }
                break;
            case "up":
                gameTimer = performance.now() - subtraction;
                this.collisions();
                if (!grid[this.i][this.j].walls[0] && !grid[this.i][this.j - 1].walls[2]) {
                    this.y -= (5);
                } else {
                    colliding = true;
                    //additionX = 0;
                    //additionY = -(s / 2);
                    //this.y -= (s / 2)
                }
                break;
            case "down":
                gameTimer = performance.now() - subtraction;
                this.collisions();
                if (!grid[this.i][this.j].walls[2] && !grid[this.i][this.j + 1].walls[0]) {
                    this.y += (5);
                } else {
                    colliding = true;
                    //additionX = 0;
                    //additionY = +(s / 2);
                    //this.y += (s / 2)
                }
                break;
            case "left":
                gameTimer = performance.now() - subtraction;
                this.collisions();
                if (!grid[this.i][this.j].walls[3] && !grid[this.i - 1][this.j].walls[1]) {
                    this.x -= (5);
                } else {
                    colliding = true;
                    //additionX = -(s / 2);
                    //additionY = 0;
                    //this.x -= (s / 2)
                }
                break;


        }

        if (colliding) {
            this.centralise();
        }
        /*if (keyCounter % 2 === 0 && keyCounter !== 2) {
            additionX = 0;
            additionY = 0;
        }*/

        playerMoves++;
        this.i = Math.round(this.x / s);
        this.j = Math.round(this.y / s);
        console.log(gameTimer)
        let highestSearch = Math.max(aTimeTaken, timeTaken, djTimeTaken)
        //LEVEL FAILURE
        let criticalTime = Math.floor(highestSearch * 700 * sizeOfGrid / 2);
        if (criticalTime < 60000) {
            criticalTime = 60000;
        } else if (criticalTime > 60000) {
            criticalTime = 60000;
        }
        if (gameTimer > criticalTime) {
            swal.fire({
                title: "Level failed",
                text: "Restarting...",
                timer: 1000
            });
            sleep(1000);
            resetLevel();
        }

        if (this.i === rows - 1 && this.j === cols - 1) {
            let endTime = performance.now();
            playerFinishedLevel = true;
            let totalTime = endTime - startTime;

            swal.fire({
                title: "You were " + ((((highestSearch - totalTime) / totalTime) / -1) * 100).toPrecision(6) + "% slower than the slowest algorithm",
                text: "TIME TAKEN: " + totalTime.toPrecision(8) + " ms" + " || MOVES NEEDED: " + playerMoves,
                allowOutsideClick: false,
                timer: 6000
            });

            if (playerFinishedLevel === true) {
                current.djHighlight(color(180, 220, 20, 127));
                current.highlight(color(20, 180, 220, 127));
                current.aHighlight(color(220, 20, 180, 127));
            }

            //player implementation
            if (sizeOfGrid + 10 > 50) {
                noLoop()
                gameFinished();
                return false;
            }

            noLoop();
            //player implementation
            setTimeout(() => {
                resetLevel();
            }, 5000);
        }
    }

    show() {
        //player implementation
        fill(40, 40, 180);
        if (playerFinishedLevel) {
            noStroke();
            noFill();
        }
        //console.log("RAW: " + this.x / s + ", " + this.y / s)
        //console.log("I AND J: " + this.i + ", " + this.j);
        rect(((this.x + (s / 2.67))) + 8 + additionX, ((this.y + (s / 2.67))) + 8 + additionY, (s) / 4, (s) / 4);
    }

    centralise() {
        this.x = this.i * (s);
        this.y = this.j * (s);
        fill(40, 40, 180);
        rect(((this.x + (s / 2.67))) + 8, ((this.y + (s / 2.67))) + 8, (s) / 4, (s) / 4);
    }
}

function nodeMethods() {
    userNode.update();
    userNode.show();
}

function keyPressed() {
    switch (keyCode) {
        case RIGHT_ARROW:
            userNode.dir = 'right';
            keyCounter++;
            break;
        case DOWN_ARROW:
            userNode.dir = 'down';
            keyCounter++;
            break;
        case UP_ARROW:
            userNode.dir = 'up';
            keyCounter++;
            break;
        case LEFT_ARROW:
            userNode.dir = 'left';
            keyCounter++;
            break;
        default:
            userNode.dir = null;
    }
    this.centralise();
}

/*let directionOfUser = undefined;

function UserNode() {
    this.x = 0;
    this.j = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;

    this.update = function () {
        this.x = this.x + this.xSpeed;
        this.y = this.y + this.ySpeed;
    }

    this.highlightNode = function () {
        fill(40, 40, 180);
        stroke(20, 180, 255, 127)
        rect(this.x, this.y,s / 4, s / 4 )
    }

    this.changeDirection = function (x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }
}

function nodeMethods(){
    userNode.update();
    userNode.highlightNode();
}

function keyPressed() {
    switch (keyCode) {
        case RIGHT_ARROW:
            userNode.changeDirection(s, 0);
            directionOfUser = "right"
            break;
        case DOWN_ARROW:
            userNode.changeDirection(0, s);
            directionOfUser = "down"
            break;
        case UP_ARROW:
            userNode.changeDirection(0, -s);
            directionOfUser = "up"
            break;
        case LEFT_ARROW:
            userNode.changeDirection(-s, 0);
            directionOfUser = "left"
            break;
        default:
            userNode.changeDirection(0, 0);
            directionOfUser = "up"

    }
}*/


/*
class UserNode {

    constructor() {
        this.body = [];
        this.body[0] = createVector(Math.Math.floor(s / 2), Math.Math.floor(s / 2));
        this.xDirection = 0;
        this.yDirection = 0;
        this.len = 0;
    }

    changeDirectionOfUserNode(x, y) {
        this.xDirection = x;
        this.yDirection = y;
    }

    update() {
        node = this.body[this.body.length - 1].copy();
        this.body.shift();
        node.x += this.xDirection;
        node.y += this.yDirection;
        console.log("THING: " + node.x + ", " + node.y) // = 40 in a 10x10
        console.log(s) // = 80 in a 10x10
        console.log(sizeOfGrid) // = 10 in a 10x10
        console.log("XDIR: " + this.xDirection)
        console.log("YDIR: " + this.yDirection)
        this.body.splice(this.body[this.body.length], this.body.length);
        this.body.push(node);
    }

    show() {
        fill(40, 40, 180);
        stroke(20, 180, 255, 127)
        rect(this.body[0].x - s / 8, this.body[0].y - s / 8, s / 4, s / 4);
    }
}

function userCommands() {
    userNode.update();
    userNode.show();
}*/
