import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// class Square extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null
//     };
//   }
//   render() {
//     return (
//       <button
//         className='square'
//         onClick={() => this.props.onClick({ value: 'X' })}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true
    };
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if(calculateWinners(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.isXNext ? "X" : "0";
    this.setState({ squares, isXNext: !this.state.isXNext });
  }

  render() {
    const winner = calculateWinners(this.state.squares);
    let status;
    if (winner) {
      status = "Winner is: " + winner;
    } else {
      status = "Next Player: " + (this.state.isXNext ? "X" : "0");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-status" />
      </div>
    );
  }
}

function calculateWinners(squareMatrix) {
  const lines = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  for (let i=0; i<lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squareMatrix[a] &&
      squareMatrix[a] === squareMatrix[b] &&
      squareMatrix[a] === squareMatrix[c]
    ) {
      return squareMatrix[a];
    }
  }
  return null;
}

ReactDOM.render(<Game />, document.getElementById("root"));
