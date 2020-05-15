window.addEventListener("DOMContentLoaded", (event) => {

    const board = document.getElementById("tic-tac-toe-board");
    const gameStatus = document.getElementById("game-status");
    const bigX = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
    const bigO = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";
    // const AIButton = document.getElementById("AI");
    const newGame = document.querySelector('.actions').firstElementChild
    const giveUp = newGame.nextElementSibling.nextElementSibling
    newGame.setAttribute('id', 'newGameButton')
    newGame.style.display = "none"


    // -- Variable Library
    let playerOne = true;
    let outcome = false;
    const pOneArr = [];
    const pTwoArr = [];
    const victoryArr = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    // -- Function Library
    let result = function(str) {
        let winEle = document.createElement("h3");
        let winner = (playerOne ? 'X' :'O');
        if (str === 'win') {
            winEle.innerHTML = `Player ${winner} Wins!`;
        } else if (str === 'draw') {
            winEle.innerHTML = "It's a DRAW!";
        }
        gameStatus.appendChild(winEle);
        // board.removeEventListener("click", e)
    }

    let winCheck = function(arr) {
        victoryArr.forEach(function(el) {
            if (arr.includes(el[0]) &&
                arr.includes(el[1]) &&
                arr.includes(el[2])) {

                newGame.style.display = "block"
                // finalTurn = true;
                outcome = true;
            }
        })
    }


    // -- Result Check after each turn
    let gamePlay = function(arr) {
        if (arr.length <3) {
            return;
        } else {
            if (arr.length <5) {
                winCheck(arr);
                if (outcome) {
                    return result('win');
                } else {
                    return;
                }
            } else if (arr.length === 5) {
                winCheck(arr);
                if (outcome) {
                    return result('win');
                } else {
                    return result('draw');
                }
            }
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
            gamePlay(xClean);
        } else {
            img.setAttribute("src", bigO);
            pTwoArr.push(parseInt(e.target.id.slice(7)));
            let yClean = pTwoArr.filter(el=>el>-1);
            gamePlay(yClean);
        }

        if (e.target.nodeName!=="IMG") {
          divId.appendChild(img);
          playerOne = !playerOne
        }
    })

    // -- AI Player Turn
    // AIButton.addEventListener("click", (e) => {

    // })


    // -- New Game
    newGame.addEventListener('click', (e) => {
        location.reload()
    })

    // -- Give Up Game
    giveUp.addEventListener("click", (e) => {
        giveUp.style.display = "none";
        newGame.style.display = "block";
        playerOne = !playerOne;
        result();
    })
})

//Notes to Improve
// new Game button should appear at draw
