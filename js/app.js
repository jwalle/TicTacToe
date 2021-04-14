const game = () => {
    const initialBoard = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    // dynamique values
    let startingPlayer = 'X';
    let player = 'X';
    let timer = 180;
    let gameBoard = [...initialBoard];
    let playerXScore = 0;
    let playerOScore = 0;
    let winner = null;
    let draw = null;

    // create selectors
    const gameContainer = document.getElementById("game-container");
    const gameTimer = document.getElementById("game-timer");
    const gameTurn = document.getElementById("game-turn");
    const arrowOne = document.getElementById("arrow-one");
    const arrowTwo = document.getElementById("arrow-two");
    const scoreOne = document.getElementById("score-one");
    const scoreTwo = document.getElementById("score-two");

    // Functions
    const drawBoard = () => {
        let cells = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let newCell = document.createElement("div");
            newCell.innerHTML = gameBoard[i][j];
            newCell.className = "cell";
            newCell.dataset.row = i;
            newCell.dataset.col = j;
            newCell.addEventListener("click", tickCell);
            cells.push(newCell);
          }
        }
        
        //wipe current board
        gameContainer.innerHTML = null;
        // push the new board
        gameContainer.append(...cells);
      };

      const drawInfos = () => {
        if (player === 'X') {
            arrowOne.innerHTML = '&#129044;';
            arrowTwo.innerHTML = '';
        } else {
            arrowOne.innerHTML = '';
            arrowTwo.innerHTML = '&#129044;';
        }

        // draw timer
        let minutes = Math.floor(timer / 60);
        let seconds = Math.floor(timer % 60);
        if (seconds < 10) {seconds = "0"+seconds;}
        gameTimer.innerHTML = `${minutes}:${seconds}`;

        //draw scores
        scoreOne.innerHTML = playerXScore;
        scoreTwo.innerHTML = playerOScore;

        // draw game info
        if (winner) {
            gameTurn.innerHTML = `Player ${winner === 'X' ? '1' : '2'} won !` 
        } else if (draw) {
            gameTurn.innerHTML = `It's a draw !`;
        } else {
            gameTurn.innerHTML = null;
        }
      }

      const resetBoard = () => {
        gameBoard = [
            ['','',''],
            ['','',''],
            ['','','']
        ];
        startingPlayer = startingPlayer === "X" ? "O" : "X";
        player = startingPlayer;
        winner = null;
        draw = null;
    
        gameLoop();
      }

      const checkDraw = () => {
        let filledCell = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                filledCell += +(gameBoard[i][j] !== '') 
            }
        }
        return filledCell === 9;
      }



      const tickCell = (e) => {
        e.preventDefault();
        if (e.target.innerHTML !== "" || winner) return;

        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        gameBoard[row][col] = player;
        drawBoard();

        // Check for a winner
        winner = checkVictory();
        if (winner) {
            winner === 'X' ? playerXScore++ : playerOScore++;
            drawInfos();
            setTimeout(() => resetBoard(), 1500);
            
        }
        // check for a draw
        draw = checkDraw();
        if (checkDraw()) {
            drawInfos();
            setTimeout(() => {
                resetBoard();
            }, 1500);
        }
        player = player === "X" ? "O" : "X";
        drawInfos();
      };


      const checkVictory = () => {
        const threeEquals = (a, b, c) => {
          if (a !== "X" && a !== "O") return false;
    
          return (a === b && b === c);
        };
        
        //check rows
        for (let i = 0; i < 3; i++) {
          if(threeEquals(gameBoard[i][0], gameBoard[i][1], gameBoard[i][2]))
            return gameBoard[i][0];
        }
        //check rows
        for (let i = 0; i < 3; i++) {
          if(threeEquals(gameBoard[0][i], gameBoard[1][i], gameBoard[2][i]))
            return gameBoard[0][i];
        }
        // checks diags
        if (threeEquals(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]) ||
            threeEquals(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]))
            return gameBoard[1][1];
        return null;
      };

      const gameLoop = () => {
          drawBoard();
          drawInfos();
      }

      gameLoop();
    

    
    setInterval(() => {
        if (timer >= 0) {
            timer = timer - 1;
        }
        drawInfos()
        
        if (timer === 0) {
            if (playerOScore === playerXScore) {
                alert(`It's a draw !`)
            } else if (playerXScore > playerOScore) {
                alert('the winner is player 1 !')
            } else {
                alert('the winner is player 2 !')
            }
            // reset everything to initial value
            resetBoard();
            startingPlayer = 'X';
            playerXScore = 0;
            playerOScore = 0;
            timer = 180;
        }
    }, (1000));
        

}

game();