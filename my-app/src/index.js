import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.css';
class FlavorForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {value: 'basketball'};
      this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
      this.setState({value: event.target.value});
  }
  render() {
      return (
              <div>
                  <label>field：
                      <select value={this.state.value} onChange={this.handleChange}>
                          <option value="IT">IT</option>
                          <option value="Art">Art</option>
                          <option value="Business">Business</option>
                      </select>
                  </label>
                  
                  <label>operator：
                      <select value={this.state.value} onChange={this.handleChange}>
                          <option value="Contains">Contains</option>
                          <option value="beginswith">begins with</option>
                          <option value="endswith">ends with</option>
                          <option value="isqualto">is qual to</option>
                          <option value="islessthan">is less than</option>
                      </select>
                  </label>
                  
                  <label>Value：
                      <input type="text"/>
                  </label>
                  {/* <div>chosen: {this.state.value}</div> */}
              </div>
      )
  }
}

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
 
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}


class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
        };
    }
    render() {
      return (
        <button 
          className="square" 
          onClick={()=> this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
}
  
class Board extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'x' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    renderSquare(i) {
      return (
        <Square 
            value={this.state.squares[i]} 
            onClick={()=> this.handleClick(i)}
        />
      );
    }
  
    render() {
      const status = 'Hello, Welcome to SERLER';
      const winner = calculateWinner(this.state.squares);
      let nextPlayer;
      let Description = 'Description';
      if(winner){
        nextPlayer = 'winner is ' + winner;
      } else {
        nextPlayer = 'Next player is' + (this.state.xIsNext ? ' x ' : ' O ');
      }
  
      return (
        <div>
        <div className="status">{status}</div>
          <div className="Description">{Description}</div>
          <div className="test">
          {/* <SearchBar filterText={this.state.filterText}  inStockOnly={this.state.inStockOnly} onUserInput={this.handleUserInput}/> */}
          </div>
          <div className="SearchBar">
                    <input type="text" ref="filterTextInput"  placeholder="Search..." value={this.props.filterText} onChange={this.handleChange}/>
                    <p><input type="checkbox" ref="inStockOnly" checked={this.props.inStockOnly} onChange={this.handleChange}></input>
                    Match condition</p>
          </div>

          {/* <div className="board-row">
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
          </div> */}
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
            <Example />
            <Example />
            <FlavorForm />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
}
  
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function square(props) {
    return (
        <button 
            className="square" onClick={props.onClick}
        >
        {props.value}
        </button>
    );
}

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