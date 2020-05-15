window.addEventListener("DOMContentLoaded", (e) => {

    const board = document.getElementById("tic-tac-toe-board");
    const gameStatus = document.getElementById("game-status");
    const bigX = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
    const bigO = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";
    const newGame = document.getElementById("newGameButton");
    const giveUp = document.getElementById("giveUpButton");
    const aiButton = document.getElementById("aiButton");

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

        takeTurn: function(e) {
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
    }

    const autoBrains = {

        findRemain: function(ai, op) {
            const sqrs = ["0",1,2,3,4,5,6,7,8]
            let left = sqrs.filter(function(el) {
                if (![...ai, ...op].includes(Number(el))) {
                    return el;
                }
            });
            if (left[0] === "0") {
                left[0] = 0;
            }
            return left;
        },

        aiLook: function(arr) {
            return victoryArr.filter(function(el) {
                if (arr.includes(el[0]) && arr.includes(el[1])) {
                    return el;
                } else if (arr.includes(el[0]) && arr.includes(el[2])) {
                    return el;
                } else if (arr.includes(el[1]) && arr.includes(el[2])) {
                    return el;
                }
            })
        },

        aiObvious: function(remain, arr) {
            let posClicks = remain.filter(el=>arr.includes(el));
            if (posClicks.length > 0) {
                return document.getElementById(`square-${posClicks[0]}`).click();
            }
        },

        aiCreative: function(sqrRemain, aiArr, opArr) {
            // first turn - going first
            if (aiArr.length===0&&opArr.length===0) {
                // top corner
                return document.getElementById('square-0').click();
            }
            // first turn - going second
            if (aiArr.length===0) {
                if (opArr[0]===4) {
                    // if opp took center - go top corner
                    return document.getElementById('square-0').click();
                } else if ([0,2,6,8].includes(opArr[0])) {
                    // if opp took a corner - go center
                    return document.getElementById('square-4').click();
                }
            }
            // second turn - going first
            if (aiArr.length===1&&opArr.length===1) {
                if (opArr[0]===4) {
                    // if opp took center - go opposite corner
                    return document.getElementById('square-8').click();
                // else play best corner
                } else if ([1,2,5,8].includes(opArr[0])) {
                    return document.getElementById('square-6').click();
                } else {
                    return document.getElementById('square-2').click();
                }
            }
            return document.getElementById(`square-${sqrRemain[0]}`).click()

        },

        aiTurn: function(p) {
            let aiArr, opArr;
            if (p) {
                aiArr = pOneArr;
                opArr = pTwoArr;
            } else {
                aiArr = pTwoArr;
                opArr = pOneArr;
            }
            let sqrRemain = autoBrains.findRemain(aiArr, opArr);
            let considerSelf = autoBrains.aiLook(aiArr);
            let considerOpp = autoBrains.aiLook(opArr);
            if (considerSelf.length > 0) {
                autoBrains.aiObvious(sqrRemain, ...considerSelf);
            }
            if (considerOpp.length > 0) {
                autoBrains.aiObvious(sqrRemain, ...considerOpp);
            }
            autoBrains.aiCreative(sqrRemain, aiArr, opArr);
        }
    }

    const handlers = {

        setEventListeners: function() {

            board.addEventListener("click", function gameBoard(e) {
                (outcome ? "" : gameFunctions.takeTurn(e))
            })

            newGame.addEventListener("click", (e) => {
                location.reload();
            })

            giveUp.addEventListener("click", (e) => {
                giveUp.style.display = "none";
                newGame.style.display = "block";
                playerOne = !playerOne;
                gameFunctions.result('win');
            })

            aiButton.addEventListener("click", (e) => {
                autoBrains.aiTurn(playerOne);
            })

        }



    }

    // -- Initialization Call List
    handlers.setEventListeners();

})
