import { useState } from 'react';

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    // format a guess into an array of letter objects
    // e.g. [{key: 'a', color: 'yellow}]
    const formatGuess = () => {
        console.log('formatting guess - ' + currentGuess)
    }

    // add a new guess to the guesses state
    //update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = () => {

    }

    // handle keyup event and track current guess
    // if user presses enter, add the new guess
    const handleKeyup = (e) => {
        // console.log(e.key)

        if (/^[A-Za-z]$/.test(e.key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => { return prev + e.key })
                // console.log(currentGuess)
            }
        }

        if (e.key === 'Backspace') {
            setCurrentGuess((prev) => { return prev.slice(0,-1)})
        }

        if (e.key === 'Enter') {
            if (turn > 6) {
                console.log('no more turns')
                return
            }
            if (currentGuess.length !== 5) {
                console.log('guess must have 5 letters')
                return
            }
            formatGuess()
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup}

}

export default useWordle