p5.disableFriendlyErrors = true
/*let rows, cols, grid;*/
let rows = 50;
let cols = 50;
let grid = new Array(rows);
//let sizeOfGrid = 0;
let s;
let current;
const cvsFrame = 850;
const partitioner = 8;

let openStack = [];
let closedStack = [];
let start, end;
let pathFinding = false
let searchToHappen = true;
let cvs;
let alertUser = [];
let djTimeTaken = 0;
let aTimeTaken = 0;
let timeTaken = 0;
let djMoves = 0;
let aMoves = 0;
let dsMoves = 0;

let r;


function setup() {
    frameRate(-1)
    cvs = createCanvas(cvsFrame + partitioner, cvsFrame + partitioner);
    let x = (windowWidth - cvsFrame) / 2;
    let y = (windowHeight - cvsFrame) / 2;
    cvs.position(x, y);
    /*while(sizeOfGrid === 0 || sizeOfGrid === null || isNaN(sizeOfGrid))
    try{
        sizeOfGrid = prompt("Size of grid (10 - 200)", "25")
        while(sizeOfGrid > 500 || sizeOfGrid < 3){
            sizeOfGrid = prompt("Size of grid (10 - 200)", "25")
        }
    } catch{
        alert("Invalid input!")
    }

    rows = sizeOfGrid;
    cols = sizeOfGrid;
    grid = new Array(rows)*/

    s = cvsFrame / cols;
    //2D array
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i, j)
        }
    }

    start = grid[0][0];
    end = grid[rows - 1][cols - 1];

    background(220)
    mazeGeneration();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].visited = false;
        }
    }

}

function draw() {
    //let table = document.getElementById('GeneratedTable');
    noLoop();
    if(searchToHappen) {
        aStar();
        resetValues()
        dijkstras();
        depthFirstSearch();
        searchToHappen = false;
    }

    Swal.queue(alertUser)

    //Path
    current.djHighlight(color(180, 220, 20, 127));
    current.highlight(color(20, 180, 220, 127));
    current.aHighlight(color(220, 20, 180, 127));

    //shows the walls of the maze
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].showWalls();
        }
    }
    //table.style.opacity = 100

    /*stroke(255);
    line(start.i * s, start.j * s + s - 3, start.i, start.j)
    line(end.i * s + s, end.j * s - 3, end.i * s + s, end.j * s + s);*/

    strokeWeight(8);
    rect(0, 0, width + partitioner / 2, height + partitioner / 2);
    stroke(255)
    line(0, 0, 0, cols)
    stroke(0);

}

function wallRemover(m, n) {
    const x = m.i - n.i;
    const y = m.j - n.j;
    let rndNum = Math.floor(Math.random() * 100);
    if (x === 1) {
        if (rndNum >= 50 && current.i !== rows - 1) {
            m.walls[1] = false;
        } else if (rndNum <= 50) {
            n.walls[3] = false;
        }
        m.walls[3] = false;
        n.walls[1] = false;
    } else if (x === -1) {
        if (rndNum >= 50 && current.i !== 0) {
            m.walls[3] = false;
        } else if (rndNum <= 50) {
            n.walls[1] = false;
        }
        m.walls[1] = false;
        n.walls[3] = false;
    }
    if (y === 1) {
        if (rndNum >= 50 && current.j !== cols - 1) {
            m.walls[2] = false;
        } else if (rndNum <= 50) {
            n.walls[0] = false;
        }
        m.walls[0] = false;
        n.walls[2] = false;
    } else if (y === -1) {
        if (rndNum >= 50 && current.j !== 0) {
            m.walls[0] = false;
        } else if (rndNum <= 50) {
            n.walls[2] = false;
        }
        m.walls[2] = false;
        n.walls[0] = false;
    }
    /*if (current.i === rows - 1) {
        current.walls[1] = true;
    }
    if (current.i === 0) {
        current.walls[3] = true;
    }
    if (current.j === cols - 1) {
        current.walls[2] = true;
    }
    if (current.j === 0) {
        current.walls[0] = true;
    }*/
}

function resetValues(){
    openStack = [];
    closedStack = [];
    current = start;
    openStack.push(current);
}


