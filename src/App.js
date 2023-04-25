import React from 'react';
import Die from './components/Die';
import "./style.css"
import {nanoid} from "nanoid"

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue){
      setTenzies(true)
    }

  }, [dice])

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice (){
     const newDice = []
     for (let i=0; i<10; i++){
      newDice.push(generateNewDie())
     }
     return newDice
  }

  function rollDice(){
    if (!tenzies){
      setDice(oldDie => oldDie.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }

  }

  function holdDie(id){
    setDice(oldDie => oldDie.map(die => {
      return die.id === id ?
      {...die, isHeld : !die.isHeld} :
      die
    }))
  }

  
  const diceElements = dice.map(die => <Die
     value={die.value}
     isHeld={die.isHeld} 
     holdDie={()=>holdDie(die.id)}/>)

 
  return (
    <main>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click a die to freeze</p>
      <div className="die-container">
          {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  ); 
}



