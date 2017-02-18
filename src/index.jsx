import React from 'react';
import ReactDOM from 'react-dom';

function Square(props){
  return (
    <button className="square" onClick={() => props.onClick()}>
      {
        props.value
      }
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    // Pass squares and handleClick from Game to Square.
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  // Upper class of Board, Store history.
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    };
  }

  handleClick(i) {
    // history have to be set by handleclick(), so this method is in Game class
    const history = this.state.history;
    const current = history[history.length - 1]; // End element of history
    const squares = current.squares.slice(); // Copy newest status
    if (calculateWinner(squares) || squares[i]) {
      return; // if the winner has been already determined, or the square filled, return nothing.
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ // update Game.state
      history: history.concat([{
        // Add a new element to history array
        squares: squares // the element contains new status:Array(9)
      }]),
      xIsNext: !this.state.xIsNext, // reverse true or false
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares)

    let status; // indicate who's turn or who won
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          {/* Pass squares and handleClick() to the Board Component */}
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
