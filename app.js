function testColorGen() {
    let dict = {};
    let notSeen = 0;
    let seen = 0;
    for (let i = 1; i <= 50000; i++) {
        let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        if (color in dict) {
            dict[color] += 1;
            seen += 1;
        } else {
            dict[color] = 0;
            notSeen += 1;
        }
    }
    console.log("Not Seen: " + notSeen);
    console.log("Seen: " + seen);
}

function createGrid(squaresInRow) {
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

function changeColor(e) {
    if (e.target !== e.currentTarget) {
        e.target.style.backgroundColor = globalVars.selectedColor; 
    }
    e.stopPropagation();
}

function changeColor(e) {
    if (e.target !== e.currentTarget) {
        let color;
        if (globalVars.randomColorSelector) {
            color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        } else {
            color = globalVars.selectedColor;
        }
        e.target.style.backgroundColor = color; 
    }
    e.stopPropagation();
}

function newButton() {
    let numOfRows = Math.sqrt(gridContainer.childElementCount);
    document.getElementById("newGridBox").style.display = "block";
    document.getElementById("numOfRows").placeholder = numOfRows;
}

function okButton() {
    let numOfRows = document.getElementById("numOfRows").value;
    if (numOfRows >= 1 && numOfRows <= 200) {
        createGrid(numOfRows);
        document.getElementById("numOfRows").placeholder = numOfRows;
        document.getElementById("numOfRows").value = "";
        document.getElementById("inputAlert").style.fontWeight = "normal";
        document.getElementById("newGridBox").style.display = "none";
    } else {
        document.getElementById("inputAlert").style.fontWeight = "bold";
    }
}

function cancelButton() {
    document.getElementById("numOfRows").value = "";
    document.getElementById("inputAlert").style.fontWeight = "normal";
    document.getElementById("newGridBox").style.display = "none";
}

function colorButton() {
    document.getElementById("colorSelectorContainer").style.display = "grid";
}

function okButton2() {
    if (globalVars.customColor) {
        globalVars.selectedColor = document.getElementById("customSelector").value;
    } else {
        globalVars.selectedColor = document.querySelector('input[name="color"]:checked').value;
    }
    globalVars.randomColorSelector = false;
    document.getElementById("colorSelectorContainer").style.display = "none";
}

function cancelButton2() {
    document.getElementsByName("color").forEach((button) => {
        if (button.value === globalVars.selectedColor) {
            button.checked = true;
        }
    });
    document.getElementById("colorSelectorContainer").style.display = "none";
}

function presetColorsButtons(e) {
    if (e.target !== e.currentTarget) {
        console.log(e.target);
        globalVars.customColor = false;
    }
    e.stopPropagation();
}

function customColorsButton() {
    document.getElementsByName("color").forEach((button) => {
        button.checked = false;
    });
    globalVars.customColor = true;
}

function randomColorsButton() {
    globalVars.randomColorSelector = true;
}

function eraserButton() {
    globalVars.randomColorSelector = false;
    globalVars.selectedColor = "#eae0c2";
}

let globalVars = {
    randomColorSelector: true,
    customColor: false,
    selectedColor: "#000000"
};

let gridContainer = document.getElementById("container");
gridContainer.addEventListener("mouseover", changeColor);

let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => createGrid(Math.sqrt(gridContainer.childElementCount)));

let newBtn = document.getElementById("new");
newBtn.addEventListener("click", newButton);

let colorBtn = document.getElementById("color");
colorBtn.addEventListener("click", colorButton);

let okBtn = document.getElementById("ok");
okBtn.addEventListener("click", okButton); 

let cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener("click", cancelButton);

let okBtn2 = document.getElementById("ok2");
okBtn2.addEventListener("click", okButton2); 

let cancelBtn2 = document.getElementById("cancel2");
cancelBtn2.addEventListener("click", cancelButton2);

let presetColorsBtns = document.getElementById("presets");
presetColorsBtns.addEventListener("click", presetColorsButtons);

let customColorsBtn = document.getElementById("customSelector");
customColorsBtn.addEventListener("click", customColorsButton);

let randomColorsBtn = document.getElementById("random");
randomColorsBtn.addEventListener("click", randomColorsButton);

let eraserBtn = document.getElementById("eraser");
eraserBtn.addEventListener("click", eraserButton);


window.onload = createGrid(16);

window.onclick = function(e) {
    if (e.target == newGridBox) {
        document.getElementById("newGridBox").style.display = "none";
    } else if (e.target == colorSelectorContainer) {
        document.getElementsByName("color").forEach((button) => {
            if (button.value === globalVars.selectedColor) {
                button.checked = true;
            }
        });
        document.getElementById("colorSelectorContainer").style.display = "none";
    }
}