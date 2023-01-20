import { useState } from 'react';

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})

    // format a guess into an array of letter objects
    // e.g. [{key: 'a', color: 'yellow}]
    const formatGuess = () => {
        console.log('formatting guess - ' + currentGuess)
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((letter)=> {
            return {key: letter, color: 'gray'}
        })

        // find green letters
        formattedGuess.forEach((letter, i) => {
            if (solutionArray[i]===letter.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        // find yellow letters
        formattedGuess.forEach((letter, i) => {
            if (solutionArray.includes(letter.key) && letter.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        // console.log(formattedGuess)
        return formattedGuess
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}
            formattedGuess.forEach((letter) => {
                const currentColor = newKeys[letter.key]

                if (letter.color === 'green') {
                    newKeys[letter.key] = 'green'
                    return
                } 
                if (letter.color === 'yellow' && currentColor !== 'green') {
                    newKeys[letter.key] = 'yellow'
                    return
                }
                if (letter.color === 'gray' && currentColor !== 'yellow' && currentColor !== 'green') {
                    newKeys[letter.key] = 'gray'
                    return
                }
            })
            return newKeys
        })
        setCurrentGuess('')
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
            if (turn > 5) {
                console.log('no more turns')
                return
            }
            if (currentGuess.length !== 5) {
                console.log('guess must have 5 letters')
                return
            }
            const formattedGuess = formatGuess()
            addNewGuess(formattedGuess)
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys}

}

export default useWordle