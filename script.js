// Create the gameboard
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
