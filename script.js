const feilds = document.querySelectorAll(".feild");
const board = document.querySelector(".board");
const startBtn = document.querySelector(".startBtn");
const start =  document.querySelector(".start");
const gameOver = document.querySelector(".gameOver");
let numArr = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let childrenValueArr = [];
let stepCount = 0;



function renderRandomNum(feilds, maxNum){
    const randomNumPlaceArr = [];
    for(let i = 0; i < maxNum; i++){
        const num = Math.floor(Math.random() * maxNum);
        if(!randomNumPlaceArr.includes(num)) {
            randomNumPlaceArr.push(num);
        }else{
            i--;
        }
    }
    for (let i = 0; i < numArr.length; i++) {
        feilds[randomNumPlaceArr[i]].children[0].innerHTML = numArr[i];
    }
}

function startAgain() {
    start.classList.toggle("start");
    startBtn.classList.remove("showContent");
    
}

function startGame() {
    numArr = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    renderRandomNum(feilds, 16);
    board.classList.toggle("showContent");
    start.classList.toggle("start");
    startBtn.classList.add("showContent");
    for (let i = 0; i < numArr.length; i++) {
        feilds[i].children[0].classList.add("showContent");
    }
}

function gameOverFunk() {
    board.classList.toggle("showContent");
    gameOver.classList.toggle("showContent");
    for (let i = 0; i < feilds.length; i++) {
        feilds[i].children[0].innerHTML = "";
        feilds[i].classList.remove("backG");
    }
    setTimeout(()=> {
        gameOver.classList.toggle("showContent");
        startAgain();
    }, 3000);
}

function makeAObj(childID, childContent) {
    return {
        "childID" : childID,
        "childContent":  childContent
    }
}


function showContent(e) {
    if(e.target.className != "board"){
    const feild = e.target;
    const childID = feild.children[0].id;
    const childElem = document.getElementById(childID);
    childElem.classList.toggle("showContent");
    childrenValueArr.push(makeAObj(childID, childElem.innerHTML));
    ++stepCount;
    if (stepCount == 2) toEquatedivContents(childrenValueArr[0].childContent, childrenValueArr[1].childContent);
    }

}

function toEquatedivContents(cont1, cont2) {
    if(cont1 == cont2){
        const elem1 = document.getElementById(childrenValueArr[0].childID);
        const elem2 = document.getElementById(childrenValueArr[1].childID);
        elem1.parentElement.classList.add("backG");
        elem2.parentElement.classList.add("backG");
        numArr.pop();
        numArr.pop();
        childrenValueArr = [];
        stepCount = 0;
    }else{
        hideContent(childrenValueArr[0]);
        hideContent(childrenValueArr[1]);
        childrenValueArr = [];
        stepCount = 0;
    }
    if (numArr.length == 0) {
        setTimeout(()=>{gameOverFunk();},1000);
    }
}

function hideContent({childID}) {
    const childElem = document.getElementById(childID);
    setTimeout(()=> {
        childElem.classList.add("showContent");
    }, 500, childElem)
}


board.addEventListener("click", showContent);
startBtn.addEventListener("click", startGame);