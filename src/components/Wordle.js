import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle({ solution }) {
    const {currentGuess, handleKeyup} = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup])

    return (
        <div>
            <h1>Wordle</h1>
            <p>solution = { solution }</p>
            <p>current guess = {currentGuess}</p>
        </div>

    )
}
