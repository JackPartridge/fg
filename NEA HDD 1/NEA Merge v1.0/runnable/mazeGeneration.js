let counter = 0;

function mazeGeneration() {

    resetValues();
    console.time("Maze");
    while (counter !== (rows * cols) - 1) {

        current.visited = true;
        //defines next cell to go to with adjacentNodes() function
        const next = current.adjacentNodes();

        //if next is found then mark it as visited and push it to the array of past moves
        if (next) {
            next.visited = true;

            if (current.adjacentNodes() !== undefined) { //optimisation
                openStack.push(current)
            }

            wallRemover(current, next);
            counter++;
            current = next;

        } else if (openStack.length > 0) {
            current = openStack.pop();
        }
    }
    console.timeEnd("Maze");
    stroke(0);
    strokeWeight(2);
    noFill();
    rect(0, 0, cvsFrame, cvsFrame);
}