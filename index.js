// import {generateRandomColor, randomListGenerator} from "./helperFunctions";

function generateRandomColor() {
    return `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
}

function randomListGenerator() {
    const randomArray = [];
    for (let i = 1; i < 5; i++) randomArray.push(i);
    randomArray.sort(() => Math.random() - 0.5)
    return randomArray;
}

// *****************************************************************************************
// *****************************************************************************************

const mainEl = document.getElementById("root");

const state = {
    querySelectorAll: 1,
    color: "",
    score: 0,
    highestScore: 0,
    resetColor: 1,
    texts: {
        scoreTexts: {
            score: "Score",
            hScore: "High Score",
        },
        gameResults: {
            won: "Bingo!",
            lost: "Wrong!"
        },
        ui: {
            resetBtn: "Reset Color",
            close: "Close"
        }
    }
}
renderApp();

// Renders the entire page
function renderApp() {
    const appFragment = document.createDocumentFragment();
    appFragment.append(createHeader(), createGame(), createModal());
    mainEl.appendChild(appFragment);
    resetGame();
}

// This Header contains Score, High Score and a Reset Color button
function createHeader() {
    const gameHeader = document.createElement('header');
    gameHeader.setAttribute('id', 'game-header');
    gameHeader.append(createScoreSection(), createResetButton());
    return gameHeader;
}

// This section contains an ul elements for Score and High Score items
function createScoreSection() {
    const scoreContainerEl = document.createElement('ul');
    scoreContainerEl.setAttribute('id', "score-container");

    scoreContainerEl.append(createScoreElements(state.texts.scoreTexts.score), createScoreElements(state.texts.scoreTexts.hScore));
    return scoreContainerEl;
}

// This function generates the li elements for Score and High Score
function createScoreElements(text) {
    const scoreListItem = document.createElement('li');
    const scoreTextEl = document.createElement('span');
    scoreTextEl.className = "score-text";
    scoreTextEl.innerText = text;
    const scoreValueEl = document.createElement('span');
    scoreValueEl.className = "score-value";
    scoreValueEl.innerText = "0";

    scoreListItem.append(scoreTextEl, scoreValueEl);
    return scoreListItem;
}

// This function generates the Reset Button that resets the color.
function createResetButton() {
    const resetButtonEl = document.createElement('button');
    resetButtonEl.innerText = state.texts.ui.resetBtn
    resetButtonEl.addEventListener('click', () => resetGame(state.resetColor));
    return resetButtonEl;
}

// This function generates the color box and the option buttons for the game
function createGame() {
    const appSection = document.createElement('main');
    appSection.append(createColorBox(), createButtonBox());
    return appSection;
}

// This function generates the color box to display the color to guess
function createColorBox() {
    const colorSectionEl = document.createElement('section');
    colorSectionEl.setAttribute('id', 'color-box');
    const colorEl = document.createElement('div');
    colorEl.style.backgroundColor = state.color;
    colorSectionEl.appendChild(colorEl);
    return colorSectionEl;
}

// This function generates the Option Buttons section of the page
function createButtonBox() {
    const optionButtonsSection = document.createElement('section');
    optionButtonsSection.setAttribute('id', 'btn-box');

    optionButtonsSection.append(createOptionButtonRow(), createOptionButtonRow());
    optionButtonsSection.addEventListener('click', handleOptionClick);
    return optionButtonsSection;
}

// This function generates the rows of buttons. Each row has two option buttons
function createOptionButtonRow() {
    const btnRowEl = document.createElement('span');
    btnRowEl.append(createAButton(), createAButton());
    return btnRowEl;
}

// This function generates a button. ANY button.
function createAButton() {
    return document.createElement('button');
}

// This function creates dialog for the correct/wrong options
function createModal() {
    const modalOverlayEl = document.createElement('dialog');
    modalOverlayEl.setAttribute('id', 'overlay');

    const modalBoxEl = document.createElement('div');
    modalBoxEl.className = 'modal-box';
    modalBoxEl.append(createModalTitle(), createModalScoreDisplaySection(), createModalCloseButton());

    modalOverlayEl.appendChild(modalBoxEl);
    return modalOverlayEl;
}

// This function creates Dialog box title
function createModalTitle() {
    const modalTitleEl = document.createElement("title");
    modalTitleEl.setAttribute('id', 'modal-title');
    return modalTitleEl;
}

// This function creates the section that displays scores on the dialog modal
function createModalScoreDisplaySection() {
    const scoreSectionEl = document.createElement('section');
    scoreSectionEl.setAttribute('id', 'score-display');
    scoreSectionEl.append(createModalScoreRow(state.texts.scoreTexts.score), createModalScoreRow(state.texts.scoreTexts.hScore));
    return scoreSectionEl;
}

// This function creates generates a row (for Score and High Score display) on dialog modal
function createModalScoreRow(text) {
    const rowContainerEl = document.createElement('div');
    const scoreTextEl = document.createElement('span');
    scoreTextEl.className = "modal-score-text";
    scoreTextEl.innerText = text;
    const scoreValueEl = document.createElement('span');
    scoreValueEl.className = "modal-score-value";
    rowContainerEl.append(scoreTextEl, scoreValueEl);
    return rowContainerEl;
}

// This function creates close button for the dialog b
function createModalCloseButton() {
    const buttonEl = createAButton();
    buttonEl.innerText = state.texts.ui.close;
    buttonEl.addEventListener('click', closeModalHandler);
    return buttonEl;
}

function closeModalHandler() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    resetGame();
}


function resetGame(event) {
    state.color = generateRandomColor();
    const colorEl = document.getElementById('color-box');
    if (event === state.resetColor) {
        colorEl.classList.add("resettingColorBox");
        setTimeout(() => colorEl.classList.remove("resettingColorBox"), 300);
    }
    colorEl.style.backgroundColor = state.color;
    const buttonEls = document.querySelectorAll('#btn-box button');

    const randomNumArray = randomListGenerator();
    console.log(randomNumArray);
    for (let i = 0; i < 4; i++) {
        if (randomNumArray[i] === 1) {
            buttonEls[i].innerText = state.color;
            buttonEls[i].setAttribute('id', 'correct-option')
        } else {
            buttonEls[i].innerText = generateRandomColor();
            buttonEls[i].removeAttribute('id');
        }
    }
}

function handleOptionClick(event) {
    if (event.target.tagName === "BUTTON") {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        const resultTextEl = document.getElementById('modal-title');
        const scoreValueEls = document.getElementsByClassName("modal-score-value");
        const scoreEl = scoreValueEls[0];
        const highScoreEl = scoreValueEls[1];

        const navScoreEls = document.getElementsByClassName("score-value");
        const navScoreEl = navScoreEls[0];
        const navHighScoreEl = navScoreEls[1];

        if (event.target.id === "correct-option") {
            state.score += 1;
            if (state.score > state.highestScore) state.highestScore = state.score;
            resultTextEl.innerText = state.texts.gameResults.won;
        } else {
            state.score = 0;
            resultTextEl.innerText = state.texts.gameResults.lost;
        }
        scoreEl.innerText = state.score;
        navScoreEl.innerText = state.score;
        highScoreEl.innerText = state.highestScore;
        navHighScoreEl.innerText = state.highestScore;
    }
}
