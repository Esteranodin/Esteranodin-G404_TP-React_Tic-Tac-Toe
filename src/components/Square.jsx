import React from 'react'

function Square({ value, onSquareClick, isWinning }) {
    const squareClass = isWinning ? "square winning-square" : "square";
    
    return (
        <button className={squareClass} onClick={onSquareClick}>{value}</button>
    )
}

export default Square