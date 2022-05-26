import React, { useCallback, useEffect, useState } from "react";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";

let wordList = require("./data/wordlist.json");

let alphabet = [
  { value: "a", userChecked: false, inWord: false, inPlace: false },
  { value: "b", userChecked: false, inWord: false, inPlace: false },
  { value: "c", userChecked: false, inWord: false, inPlace: false },
  { value: "d", userChecked: false, inWord: false, inPlace: false },
  { value: "e", userChecked: false, inWord: false, inPlace: false },
  { value: "f", userChecked: false, inWord: false, inPlace: false },
  { value: "g", userChecked: false, inWord: false, inPlace: false },
  { value: "h", userChecked: false, inWord: false, inPlace: false },
  { value: "i", userChecked: false, inWord: false, inPlace: false },
  { value: "j", userChecked: false, inWord: false, inPlace: false },
  { value: "k", userChecked: false, inWord: false, inPlace: false },
  { value: "l", userChecked: false, inWord: false, inPlace: false },
  { value: "m", userChecked: false, inWord: false, inPlace: false },
  { value: "n", userChecked: false, inWord: false, inPlace: false },
  { value: "o", userChecked: false, inWord: false, inPlace: false },
  { value: "p", userChecked: false, inWord: false, inPlace: false },
  { value: "q", userChecked: false, inWord: false, inPlace: false },
  { value: "r", userChecked: false, inWord: false, inPlace: false },
  { value: "s", userChecked: false, inWord: false, inPlace: false },
  { value: "t", userChecked: false, inWord: false, inPlace: false },
  { value: "u", userChecked: false, inWord: false, inPlace: false },
  { value: "v", userChecked: false, inWord: false, inPlace: false },
  { value: "w", userChecked: false, inWord: false, inPlace: false },
  { value: "x", userChecked: false, inWord: false, inPlace: false },
  { value: "y", userChecked: false, inWord: false, inPlace: false },
  { value: "z", userChecked: false, inWord: false, inPlace: false },
];

export default function Input() {
  const [output, setOutput] = useState([]);
  const [results, setResults] = useState([...Array(6)]);
  const [solution, setSolution] = useState({});
  const [turn, setTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState({
    isOver: false,
    playerWon: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [alphaStatus, setAlphaStatus] = useState(alphabet);

  /*
    result = {
      id: some number,
      letters: [
        {
          value: "letter",
          inWord: false,
          inPlace: false
        }
      ]
    }
  */
  // function handleResults(entry) {
  //   const newResults = [...results, {}];
  // }

  function inWordBank(guess) {
    let inList = wordList.filter((word) => {
      const regex = new RegExp(`${guess}`, "gi");
      return word.match(regex);
    });
    return inList.length > 0;
  }

  function updateColor({ inWord, inPlace }) {
    if (inPlace) return "inPlace";
    if (inWord) return "inWord";
    return "noMatch";
  }

  const handleInput = useCallback(
    (value) => {
      const checkIsLetter = /^[a-zA-Z\s]{1}$/;
      let outputTemp = [...output];
      let outputWord = output.join("");
      let alphaCopy = [...alphaStatus];
      if (gameStatus.isOver) {
        return;
      }
      if (value.match("Backspace") && output) {
        setOutput((prevOutput) => {
          return prevOutput.slice(0, prevOutput.length - 1);
        });
      }
      if (value.match("Enter") && output.length === 5) {
        // console.log("checking on turn " + turn);
        //filter for wordlist
        if (inWordBank(outputWord)) {
          let checkWord = outputTemp.map((letter, index) => ({
            value: letter,
            inWord: solution.letters.includes(letter),
            inPlace: letter === solution.letters[index],
          }));
          // console.log(checkWord);
          checkWord.forEach((letter) => {
            let alphaIndex = alphaCopy.findIndex(
              (alphaLetter) => alphaLetter.value === letter.value
            );
            // console.log(alphaCopy[alphaIndex]);
            alphaCopy[alphaIndex].userChecked = true;
            if (!alphaCopy[alphaIndex].inWord) {
              alphaCopy[alphaIndex].inWord = letter.inWord;
            }
            if (!alphaCopy[alphaIndex].inPlace) {
              alphaCopy[alphaIndex].inPlace = letter.inPlace;
            }
            // console.log(alphaCopy[alphaIndex]);
          });
          // console.log(alphaCopy);
          setAlphaStatus(alphaCopy);
          setResults((prevResults) => {
            let newResults = [...prevResults];
            newResults[turn] = checkWord;
            return newResults;
          });
          // console.log(results);
          setOutput([]);

          if (outputWord === solution.value) {
            console.log("They match");
            setTimeout(() => {
              setShowModal(true);
              setGameStatus({ isOver: true, playerWon: true });
            }, 2000);
          }
          if (turn < 5) {
            setTurn((currentTurn) => currentTurn + 1);
          } else {
            setTimeout(() => {
              setShowModal(true);
              setGameStatus({ isOver: true, playerWon: false });
            }, 2000);

            console.log("Game Over");
          }
        } else {
          alert("Not in Word List");
        }
        //check if correct
      }
      if (value.match(checkIsLetter) && output.length < 5) {
        setOutput((prevOutput) => {
          return [...prevOutput, value];
        });
      }
    },
    [output, solution, turn, gameStatus, alphaStatus]
  );

  function handleOnClick(value) {
    handleInput(value);
  }

  const handleKeyboard = useCallback(
    (e) => {
      handleInput(e.key);
    },
    [handleInput]
  );

  function buildBoard() {
    let gameBoard = results.map((word, index) => {
      if (word) {
        let wordOut = word.map((letter, i) => {
          return (
            <div
              className={`letter ${updateColor(letter)}`}
              key={i}
              style={{
                "--text-color": "black",
                "--border-size": "0px",
                animationDelay: i * 0.25 + "s",
              }}
            >
              {letter.value}
            </div>
          );
        });
        return (
          <div className="grid-row" key={index}>
            {wordOut}
          </div>
        );
      }
      if (index === turn) {
        let currentInput = [
          output.map((letter, i) => {
            return (
              <div className="letter filled" key={i}>
                {letter}
              </div>
            );
          }),
          [...Array(5 - output.length)].map((value, i) => {
            return <div className="blank" key={i}></div>;
          }),
        ];
        return (
          <div className="grid-row" key={index}>
            {currentInput}
          </div>
        );
      }
      return (
        <div className="grid-row" key={index}>
          <div className="blank"></div>
          <div className="blank"></div>
          <div className="blank"></div>
          <div className="blank"></div>
          <div className="blank"></div>
        </div>
      );
    });

    return <div className="grid">{gameBoard}</div>;
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  useEffect(() => {
    let word = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    setSolution({
      value: word,
      letters: Array.from(word),
    });
  }, []);

  return (
    <div className="content-container">
      <div className="answer_board">{buildBoard()}</div>
      <Keyboard alphabet={alphaStatus} handleOnClick={handleOnClick} />
      {showModal && (
        <Modal
          playerWon={gameStatus.playerWon}
          turn={turn}
          solution={solution.value}
        />
      )}
    </div>
  );
}
