import React from "react";

export default function Guess({ word, output, currentTurn }) {
  if (word) {
    let wordOut = word.map((letter, i) => {
      return (
        <div className="letter" key={i}>
          {letter.value}
        </div>
      );
    });
    return <>{wordOut}</>;
  }
  if (currentTurn) {
    let currentInput = [
      output.map((letter, i) => {
        return (
          <div className="letter" key={i}>
            {letter}
          </div>
        );
      }),
      [...Array(5 - output.length)].map((i) => {
        return <div className="blank" key={i}></div>;
      }),
    ];
    return <>{currentInput}</>;
  }
  return (
    <>
      <div className="blank"></div>
      <div className="blank"></div>
      <div className="blank"></div>
      <div className="blank"></div>
      <div className="blank"></div>
    </>
  );
}
