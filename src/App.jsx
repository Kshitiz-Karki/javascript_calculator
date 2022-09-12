import React from 'react'
import './App.css'

const NUMS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
const OPS = ['/', '*', '+', '-']
const IDS = {
  7: 'seven',
  8: 'eight',
  9: 'nine',
  4: 'four',
  5: 'five',
  6: 'six',
  1: 'one',
  2: 'two',
  3: 'three',
  0: 'zero',
  '/': 'divide',
  '*': 'multiply',
  '-': 'subtract',
  '+': 'add'
}

function App() {
 
  const [ state, setState] = React.useState({
    
    previousNumber : '0',
    operator : undefined,
    lastPressed : undefined
  })

  function handleClick(e){
    const { innerText } = e.target
    
    switch(innerText){
      case 'ac' : {
        setState(prevState => ({
          ...prevState,
          
          previousNumber : '0'
        }))
        break
      }
      case '=' : {
        const sum = eval(state.previousNumber)
        setState(prevState => ({
          ...prevState,
          
          previousNumber : sum
        }))
        break
      }
      case '.' : {
        const splitPreviousNumber = state.previousNumber.split(/[\+\-\*\/]/)
        const lastOfPreviousNumber = splitPreviousNumber.slice(-1)[0]

        if (!lastOfPreviousNumber.includes('.')){
          setState(prevState => ({
            previousNumber : state.previousNumber+'.'
          }))
        }
        break
      }
      default : {
        let newNumber = undefined
        if (OPS.includes(innerText)){
          if (OPS.includes(state.lastPressed) && innerText != '-'){
            const lastNumberIndex = state.previousNumber.split('').reverse()
                  .findIndex(char => char !== ' ' && NUMS.includes(+char))
            newNumber = state.previousNumber.slice(0, state.previousNumber.length - lastNumberIndex) + ` ${innerText} `
          }
          else {
            newNumber = `${state.previousNumber} ${innerText} `
          }    
        }
        else {
          newNumber = (state.previousNumber === '0') ? innerText : (state.previousNumber + innerText)
        }
        
        setState(prevState => ({
          ...prevState,
          previousNumber : newNumber
        }))
      }
    }
    setState(prevState => ({
      ...prevState,
      lastPressed : innerText
    }))
  }

  return (
    <div className="calculator">
      <p style={{position : 'absolute', top : 0}}>{JSON.stringify(state, null, 2)}</p>
      <div id='display' className='display'>
        {state.previousNumber}
      </div>
      <div className='nums-container'>
        <button className='light-grey ac big-h' onClick={handleClick} id='clear'>ac</button>
        {NUMS.map(num => (
            <button className={`dark-grey ${num === 0 && 'big-h'}`} key={num} onClick={handleClick} id={IDS[num]}>{num}</button>
          ))}
          <button className='l ight-grey' onClick={handleClick} id='decimal'>.</button>
      </div>
      <div className='ops-container'>
        {OPS.map(op => (
          <button className='orange' key={op} onClick={handleClick} id={IDS[op]}>{op}</button>
        ))}
        <button className='orange' onClick={handleClick} id='equals'>=</button>
      </div> 
      
    </div>
  )
}

export default App
