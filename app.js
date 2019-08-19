function createGrid (squaresInRow) {
    let gridContainer = document.getElementById("container");
    gridContainer.innerHTML = "";
    gridContainer.style.gridTemplateRows = `repeat(${squaresInRow}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${squaresInRow}, 1fr)`;
    for (let squareIndex = 1; squareIndex <= squaresInRow**2; squareIndex++) {
        let gridSquare = document.createElement("div");
        gridSquare.className = "square";
        gridContainer.appendChild(gridSquare);
    }
}



createGrid(16);