window.addEventListener("DOMContentLoaded", (e) => {

    const board = document.getElementById("tic-tac-toe-board");
    const gameStatus = document.getElementById("game-status");
    const bigX = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
    const bigO = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";
    const newGame = document.getElementById("newGameButton");
    const giveUp = document.getElementById("giveUpButton");
    const AIButton = document.getElementById("aiButton");

    newGame.style.display = "none"


    // -- Variable Library
    let playerOne = true, outcome = false;
    const pOneArr = [], pTwoArr = [];
    const victoryArr = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    const gameFunctions = {

        start: function(e) {
            if (playerOne) {
                gameFunctions.playerTurn(e, bigX, pOneArr)
            } else {
                gameFunctions.playerTurn(e, bigO, pTwoArr)
            }
        },

        playerTurn: function(e, turn, arr) {
            let img = document.createElement("img");
            let divId = document.getElementById(e.target.id);

            if (e.target.nodeName!=="IMG") {
                img.setAttribute("src", turn);
                arr.push(parseInt(e.target.id.slice(7)));
                gameFunctions.gamePlay(arr);
                divId.appendChild(img);
                playerOne = !playerOne;
            }
        },

        gamePlay: function(arr) {
            if (arr.length <3) {
                return;
            } else {
                if (arr.length <5) {
                    gameFunctions.winCheck(arr);
                    if (outcome) {
                        return gameFunctions.result('win');
                    } else {
                        return;
                    }
                } else if (arr.length === 5) {
                    gameFunctions.winCheck(arr);
                    if (outcome) {
                        return gameFunctions.result('win');
                    } else {
                        return gameFunctions.result('draw');
                    }
                }
            }
        },

        result: function(str) {
            let winEle = document.createElement("h3");
            let winner = (playerOne ? 'X' :'O');
            if (str === 'win') {
                winEle.innerHTML = `Player ${winner} Wins!`;
                giveUp.style.display = "none";
                newGame.style.display = "block";
            } else if (str === 'draw') {
                winEle.innerHTML = "It's a DRAW!";
                giveUp.style.display = "none";
                newGame.style.display = "block";
            }
            gameStatus.appendChild(winEle);
        },

        winCheck: function(arr) {
            victoryArr.forEach(function(el) {
                if (arr.includes(el[0]) &&
                    arr.includes(el[1]) &&
                    arr.includes(el[2])) {

                    newGame.style.display = "block"
                    outcome = true;
                }
            });
        },


        aiTurn: function() {


        }



    }

    const handlers = {
        setEventListeners: function() {
            board.addEventListener("click", function gameBoard(e) {
                (gameOver ? "" : gameFunctions.start(e))
            })
        }


    }

     // -- Play Controller
    board.addEventListener("click", e => {

        let img = document.createElement("img");
        let divId = document.getElementById(e.target.id);

        if (playerOne) {
            img.setAttribute("src", bigX);
            pOneArr.push(parseInt(e.target.id.slice(7)));
            let xClean = pOneArr.filter(el=>el>-1);
            gameFunctions.gamePlay(xClean);
        } else {
            img.setAttribute("src", bigO);
            pTwoArr.push(parseInt(e.target.id.slice(7)));
            let yClean = pTwoArr.filter(el=>el>-1);
            gameFunctions.gamePlay(yClean);
        }

        if (e.target.nodeName!=="IMG") {
          divId.appendChild(img);
          playerOne = !playerOne
        }
    })

    // -- AI Player Turn
    AIButton.addEventListener("click", (e) => {

    })


    // -- New Game
    newGame.addEventListener('click', (e) => {
        location.reload()
    })

    // -- Give Up Game
    giveUp.addEventListener("click", (e) => {
        giveUp.style.display = "none";
        newGame.style.display = "block";
        playerOne = !playerOne;
        gameFunctions.result('win');
    })
})
