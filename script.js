// Create the gameboard IIFE
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  // Create funciton to reset the board
  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  return {
    getBoard: () => board,
    setMark: (index, mark) => {
      board[index] = mark;
      console.log(mark + " has been added to the board at index: " + index);
    },
    resetBoard,
  };
})();
console.log(Gameboard.getBoard());

// Create a Player factory
function createPlayer(name, mark) {
  console.log(name + " has been added as a player, with the mark: " + mark);

  return {
    name,
    mark,
    // Getters for future use
    getName: () => name,
    getMark: () => mark,
  };
}

// Create Game Controller
const gameController = (() => {
  // Create relevant variables
  let players = []; // Array to store the players
  let currentPlayerIndex = 0; // Binary variable for tracking current player
  let gameOver = false; // Bool variable for checking if game is over
  let winner = null; // Variable for winning player (can be null)

  // Function to get current player
  function getCurrentPlayer() {
    return players[currentPlayerIndex];
  }

  // Create function to start a new game
  function startGame(name1, name2) {
    // Clear players array to start
    players = [];

    // Create player objects
    const player1 = createPlayer(name1, "X");
    players.push(player1);
    const player2 = createPlayer(name2, "O");
    players.push(player2);

    // Reset the game board
    Gameboard.resetBoard();

    // Reset other variables
    gameOver = false;
    currentPlayerIndex = 0;
    console.log("Game started. Good luck!");
  }

  // Function to change turns
  function switchPlayer() {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  // Function to check winner
  function checkWinner() {
    const board = Gameboard.getBoard();

    // Create an array of all winning possibilities
    const winnCombos = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left
      [2, 4, 6], // Diagonal from top-right
    ];

    // Check if any winCombos met
    for (let combo of winnCombos) {
      const [a, b, c] = combo; // Create single value for checking
      if (
        board[a] !== "" && // If mark is not null (empty space)
        board[a] === board[b] && // First and second match
        board[a] === board[c] // First and third match
      ) {
        winner = getCurrentPlayer(); //Player that placed mark last will be the winner
        gameOver = true;
        console.log(winner.name + " is the winner!");
        return;
      }
    }

    // Check the game for a tie
    if (board.every((cell) => cell !== "")) {
      // If every cell is not null or empty
      gameOver = true;
      console.log("It is a tie! Well Played!");
    }
  }

  // Function to handle the player's move
  function handleMove(index) {
    if (gameOver != true) {
      // Assign the current values
      const currentPlayer = getCurrentPlayer();
      const currentMark = currentPlayer.mark;

      // Assign the current board
      const currentBoard = Gameboard.getBoard();
      if (currentBoard[index] === "") {
        Gameboard.setMark(index, currentMark);
        checkWinner();
        switchPlayer();
      } else {
        // Inform the user the square is filled
        console.log("This square is already occupied. Try a different one!");
      }
    } else {
      // update the user the game is over
      console.log(
        "The Game is over, please start a new game if you wish to continue."
      );
    }
  }

  return { startGame, handleMove }; // Return public functions that will be required to call
})();
