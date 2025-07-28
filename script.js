// Create the gameboard IIFE
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return {
    getBoard: () => board,
    setMark: (index, mark) => {
      board[index] = mark;
      console.log(mark + " has been added to the board at index: " + index);
    },
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
