const mainEl = document.getElementById("root");
let color = generateRandomColor();
let correctCount = 0;
let highestScore = 0;
init();

function init() {
    const appFragment = document.createDocumentFragment();

    // Bar for Score and Reset Game
    const gameNavFragment = document.createDocumentFragment();
    const gameNav = document.createElement('div');
    gameNav.setAttribute('id', 'game-nav')
    const scoreSpan = document.createElement('span');
    scoreSpan.innerText = `Score: ${correctCount}\t\tHighest Score: ${highestScore}`;
    gameNav.appendChild(scoreSpan);
    const resetBtn = document.createElement('button');
    resetBtn.innerText = "Reset Game"
    resetBtn.addEventListener('click', resetGameHandler);
    gameNav.appendChild(resetBtn);

    gameNavFragment.appendChild(gameNav);
    appFragment.appendChild(gameNavFragment);

    // Color Box
    const colorEl = document.createElement('div');
    colorEl.setAttribute('id', 'color-box');
    colorEl.style.backgroundColor = color;
    appFragment.appendChild(colorEl);

    // Option Buttons
    const buttonBox = document.createElement('div');
    buttonBox.setAttribute('id', 'btn-box');
    buttonBox.appendChild(createOptionBtns());
    buttonBox.addEventListener('click', handleOptionClick)

    appFragment.appendChild(buttonBox);
    appFragment.appendChild(createModal());
    mainEl.appendChild(appFragment);
}

function createOptionBtns() {
    const randomArray = randomListGenerator();
    const optionBoxFragment = document.createDocumentFragment();
    for (const optNumber of randomArray) {
        const optionBtn = document.createElement('button');
        // Correct answers is always associated with number 1 of the random array;
        if (optNumber === 1) {
            optionBtn.setAttribute('id', 'correct-option');
            optionBtn.innerText = color;
        } else {
            optionBtn.innerText = generateRandomColor();
        }
        optionBoxFragment.appendChild(optionBtn);
    }
    return optionBoxFragment;
}

function createModal() {
    const modalFragment = document.createDocumentFragment();
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');
    overlay.className = 'overlay';

    const modalBox = document.createElement('div');
    modalBox.className = 'modalBox';

    const modalText = document.createElement('div');
    modalText.setAttribute('id', 'model-text');
    modalText.className = 'modal-text';
    const modalBtnBox = document.createElement('div');
    modalBtnBox.className = "modal-btns";
    const modalBtnClose = document.createElement('button');
    modalBtnClose.innerText = "Close";
    modalBtnClose.addEventListener("click", closeModalHandler);
    const modalBtnPlayAgain = document.createElement('button');
    modalBtnPlayAgain.addEventListener("click", playAgainHandler);

    modalBtnPlayAgain.innerText = "Play Again";

    modalBtnBox.appendChild(modalBtnClose);
    modalBtnBox.appendChild(modalBtnPlayAgain);

    modalBox.appendChild(modalText);
    modalBox.appendChild(modalBtnBox)

    overlay.appendChild(modalBox);
    modalFragment.appendChild(overlay)
    return modalFragment;
}

function closeModalHandler() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function playAgainHandler() {

}

function generateRandomColor() {
    return `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
}

function randomListGenerator(max) {
    const randomArray = [];
    for (let i = 1; i < 5; i++)
        randomArray.push(i);
    randomArray.sort(() => Math.random() - 0.5)
    return randomArray;
}

function resetGameHandler(event) {
    color = generateRandomColor();
    const colorEl = document.getElementById('color-box');
    colorEl.classList.add("resettingColorBox");
    colorEl.style.backgroundColor = color;
    const btnBoxEl = document.getElementById('btn-box');

    let child = btnBoxEl.lastChild;
    while (child) {
        btnBoxEl.removeChild(child);
        child = btnBoxEl.lastChild;
    }

    btnBoxEl.appendChild(createOptionBtns());
    setTimeout(() => colorEl.classList.remove("resettingColorBox"), 300);
}

function handleOptionClick(event) {
    if (event.target.tagName === "BUTTON") {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        const modalText = document.getElementById('model-text');
        console.log(event.target)
        console.log(event.target.id)
        if (event.target.id === "correct-option") {
            correctCount += 1;
            if (correctCount > highestScore) highestScore = correctCount;
            modalText.innerText = `Correct!\nYour Score: ${correctCount}\nHighest Score: ${highestScore}`;
        } else {
            modalText.innerText = `Wrong!\nYour Score: ${correctCount}\nHighest Score: ${highestScore}`;
            correctCount = 0;
        }
    }
}
