import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react'
import './App.css'
import Dice from './dice'


function App1() {
    const diceArray = [];

    function setDiceArray() {
        for (let index = 0; index < 10; index++) {
            let randomNumber = Math.floor(Math.random() * 6) + 1;
            diceArray.push({ val: randomNumber, isHeld: false, id: nanoid() });
        }
    }
    setDiceArray();
    const [buttonText, setButtonText] = useState("Roll")
    const [tenzi, setTenzi] = useState(false);
    function holdDie(id) {//hold and leave a die for the die id taken as a parameter

        setAllDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !(die.isHeld) } :
                die

        }))
    }
    const [allDice, setAllDice] = useState([...diceArray]);
    const dieFaces = allDice.map((die) => <Dice value={die.val} key={die.id} isHeld={die.isHeld} holdDie={() => { holdDie(die.id) }} />)
    useEffect(() => {
        let heldCount = 0;
        let heldNum = 0;
        let tenzii = true;
        for (let i = 0; i < 10; i++) {
            let die = allDice[i];
            if (die.isHeld) {
                heldCount++;
                if (heldNum === 0) {
                    heldNum = die.val;
                } else if (heldNum !== die.val) {
                    tenzii = false;
                }
            }
        }
        if (heldCount === 10 && tenzii) {
            setTenzi(true);
        }

    }, [allDice])

    useEffect(() => {
        if (tenzi) {
            setButtonText("Reset");
        }
    }, [tenzi])

    function rollAll() {

        if (tenzi) {
            setAllDice(prev => {
                let newArr = prev.map(i => {

                    return (

                        { ...i, val: Math.floor(Math.random() * 6) + 1, isHeld: false }
                    )

                })
                return newArr;
            })
            setTenzi(false);
            setButtonText("Roll")
        }else {

                setAllDice(prev => {
                    let newArr = prev.map(i => {

                        return (
                            i.isHeld ? i :
                                { ...i, val: Math.floor(Math.random() * 6) + 1 }
                        )

                    })
                    return newArr;
                })
            }
        }

        return (
            <div>
                <img className='logo' src="./assets/tenzi--logo.png" alt="tenzi--logo" height="300px" />
                <h1>Tenzi</h1>
                <p>
                    <div>
                        Keep rolling until all ten of your dice show the same number.
                    </div>

                    <div>Put all your dice with that number aside, collect the remaining dice and quickly roll again</div>
                </p>
                <div className='dieFaces'>
                    {dieFaces}
                </div>
                <div>
                    <button className='roll' onClick={rollAll} >
                        {buttonText}
                    </button>
                </div>
                {tenzi && <h2>
                    Hurray!! you won that.
                </h2>}
            </div>
        )
    }

    export default App1
