window.addEventListener("DOMContentLoaded", (event) => {

  const board = document.getElementById("tic-tac-toe-board");
  const gameStatus = document.getElementById("game-status");
  const bigX = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
  const bigO = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";

  // -- Variable Library
  let playerOne = true;
  let finalTurn = false;
  let outcome = "";
  const pOneArr = []
  const pTwoArr = []
  const victoryArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  // -- Function Library
  let result = function() {
      let winEle = document.createElement("h3");
      let winner = (playerOne ? 'X' :'O')
      winEle.innerHTML = `Player ${winner} Wins!`;
      gameStatus.appendChild(winEle);
  }

  // let winCheck = function(arr) {
  //     victoryArr.forEach(function(el) {
  //         if (JSON.stringify(el) == JSON.stringify(arr)) {
  //             finalTurn = true;
  //             return result();
  //         }
  //     })
  // }

  let gamePlay = function(arr) {
      if (arr.length >2 && arr.length <5) {
          let checkCon = arr.slice(0, 3);
          victoryArr.forEach(function(el) {
              if (JSON.stringify(el) == JSON.stringify(checkCon)) {
                  finalTurn = true;
                  outcome = "Win!";
                  // return result();
              }
          })
          if (finalTurn === false) {
              newArr = arr.shift;
              return gamePlay(newArr);
          }
      } else if (arr.length === 5) {
          finalTurn = true;

          victoryArr.forEach(function(el) {
              if (JSON.stringify(el) == JSON.stringify(checkCon)) {
                  finalTurn = true;
                  outcome = "Win!";
                  // return result();
              }
          })

          newArr = arr.shift;
          return gamePlay(newArr);
          result();

      }
  }

  // -- Play Controller
  board.addEventListener("click", e => {

      // console.log(e.target.nodeName);
      // console.log(e.target.id.slice(7))

      let img = document.createElement("img");
      let divId = document.getElementById(e.target.id);


      if (playerOne) {
          img.setAttribute("src", bigX);
          pOneArr.push(parseInt(e.target.id.slice(7)));
          let x = pOneArr.sort((a,b) => a-b);
          gamePlay(x);
      } else {
          img.setAttribute("src", bigO);
          pTwoArr.push(parseInt(e.target.id.slice(7)));
          let y = pTwoArr.sort((a,b) => a-b);
          gamePlay(y);
      }

      if (e.target.nodeName!=="IMG") {
        divId.appendChild(img);
        playerOne = !playerOne
      }
})
})
