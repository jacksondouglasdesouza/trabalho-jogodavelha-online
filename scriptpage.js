const boardTable = document.querySelector('.game__body__board');
const gameOverDialog = document.querySelector('.game__over__dialog');
const gameOverMessage = gameOverDialog.querySelector('.game__over__dialog__message');
const restartButton = gameOverDialog.querySelector('.game__over__dialog__restartbutton');

boardTable.addEventListener('click', setPlayerMove); //cuida do movimento do jogo
restartButton.addEventListener('click', startGame); //chama o restart do jogo

let currentPlayer,
    winner,
    isGameOver,
    turn;

    const winnerConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ];
// inicia o jogo.
function startGame(){
    currentPlayer = 'X';
    winner = null;
    isGameOver = false;
    turn = 0;
    boardTable.style.setProperty('--current-player', '"X"');
    hideGameOverDialog();
    clearBoard();
}
//limpa as células
function clearBoard(){
    boardTable.querySelectorAll('.game__body__board__row__cell').forEach(game__body__board__row__cell => game__body__board__row__cell.innerText = '');
}
//movimento geral do jogo
function setPlayerMove({target}){
    if(!isGameOver && target.classList.contains('game__body__board__row__cell') && target.innerText === ''){
        target.innerText = currentPlayer;
        turn++;
        if(turn > 4){
            checkGameOver();
        }
        togglePlayer();
    }
}

//qual é o jogador
function togglePlayer(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    boardTable.style.setProperty('--current-player', `"${currentPlayer}"`);
}

function checkGameOver(){
    winner = checkWinner();
        if(winner){
            showGameOverDialog(`Vitória do ${winner}`);
        }
        else if(turn > 8){
            showGameOverDialog(`Puts! Empatou.`);
        }
}
 // Lógica para checagem do Ganhador.
function checkWinner(){
    let cells = boardTable.querySelectorAll('.game__body__board__row__cell');
    cells = Array.from(cells).map(Element => Element.innerText);
    const values = winnerConditions.map(condition => condition.map(position => cells[position]).join(''));
    const isOwinner= values.includes('OOO');
    const isXwinner = values.includes('XXX');
        if( isOwinner || isXwinner){
            isGameOver = true;
            if(isOwinner){
                return 'O'
            }
            return 'X'
        }
        return null;
}
//chama card de gamer over
function showGameOverDialog(message){
    gameOverMessage.innerText = message;
    gameOverDialog.setAttribute('open', 'true');
}
//remove card de game over
function hideGameOverDialog(){
    gameOverDialog.removeAttribute('open');
}


startGame();




