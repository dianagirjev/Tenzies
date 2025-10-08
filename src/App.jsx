import Die from "./components/Die";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function App() {

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => (
        {
          id: nanoid(),
          value: Math.ceil(Math.random() * 6),
          isHeld: false
        }
      ));
  }

  const [dice, setDice] = useState(() => generateAllNewDice());

  function handleClick() {

    if (gameWon) {
      setDice(generateAllNewDice());
    } else {
        setDice(prevDice => prevDice.map(
        obj => obj.isHeld ? obj : {...obj, value: Math.ceil(Math.random() * 6)}
        ));
    }
  }

  function hold(id) {
    setDice(prevDice => prevDice.map(
      obj => obj.id === id ? {...obj, isHeld: !obj.isHeld} : obj
    ));
  }

  const diceElements = dice.map(el => (
            <Die key={el.id} value={el.value} isHeld={el.isHeld} hold={() => hold(el.id)}/>
          )
  )

  let gameWon = dice.every(die => die.isHeld) && dice.every(die => dice[0].value === die.value);  
  
  const { width, height } = useWindowSize();

  const focusButton = useRef(null);

  useEffect(
    () => {
      if (gameWon) {
        focusButton.current.focus();
      }
    }, [gameWon]
  );

  return (
    <main>
      <div className="textContainer">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="die-container">
        {diceElements}
      </div>
      <button className="rollDice" onClick={handleClick} ref={focusButton}>{gameWon ? "New Game" : "Roll"}</button>
      {gameWon && <Confetti width={width} height={height}/>}
    </main>
  )
}