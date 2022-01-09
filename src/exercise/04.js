// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from './02'

function Board({squares, onClick}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [step, setStep] = useLocalStorageState('tictactoe-step', 0)
  const [history, setHistory] = useLocalStorageState('tictactoe-history', [
    Array(9).fill(null),
  ])

  const currentBoard = history[step]
  const nextValue = calculateNextValue(currentBoard)
  const winner = calculateWinner(currentBoard)
  const status = calculateStatus(winner, currentBoard, nextValue)

  function restart() {
    setHistory([Array(9).fill(null)])
    setStep(0)
  }

  function selectSquare(square) {
    if (winner || currentBoard[square]) {
      return
    }
    const squaresCopy = [...currentBoard]
    const historyCopy = [...history].slice(0, step + 1)
    squaresCopy[square] = nextValue
    historyCopy.push(squaresCopy)

    setStep(historyCopy.length - 1)
    setHistory(historyCopy)
  }

  const moves = history.map((_, i) => {
    const isCurrentStep = i === step
    const desc = i === 0 ? 'Go to game start' : `Go to move #${i}`
    return (
      <li key={i}>
        <button disabled={isCurrentStep} onClick={() => setStep(i)}>
          {desc} {isCurrentStep && '(current)'}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentBoard} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
