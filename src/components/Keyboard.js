import React from "react";

let row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
let row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
let row3 = ["z", "x", "c", "v", "b", "n", "m"];

export default function Keyboard({ alphabet, handleOnClick }) {
  function updateColor({ userChecked, inWord, inPlace }) {
    if (userChecked) {
      if (inPlace) return "inPlace-key";
      if (inWord) return "inWord-key";
      return "noMatch-key";
    }
    return;
  }

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {row1.map((key, index) => (
          <div
            className={`key ${updateColor(
              alphabet[
                alphabet.findIndex((alphaLetter) => alphaLetter.value === key)
              ]
            )}`}
            value={key}
            key={index}
            onClick={() => handleOnClick(key)}
          >
            {key}
          </div>
        ))}
      </div>
      <div className="keyboard-row">
        {row2.map((key, index) => (
          <div
            className={`key ${updateColor(
              alphabet[
                alphabet.findIndex((alphaLetter) => alphaLetter.value === key)
              ]
            )}`}
            value={key}
            key={index}
            onClick={() => handleOnClick(key)}
          >
            {key}
          </div>
        ))}
      </div>
      <div className="keyboard-row">
        <div
          className="key key-large"
          value={"enter"}
          onClick={() => handleOnClick("Enter")}
        >
          enter
        </div>
        {row3.map((key, index) => (
          <div
            className={`key ${updateColor(
              alphabet[
                alphabet.findIndex((alphaLetter) => alphaLetter.value === key)
              ]
            )}`}
            value={key}
            key={index}
            onClick={() => handleOnClick(key)}
          >
            {key}
          </div>
        ))}
        <div
          className="key key-large"
          value={"del"}
          onClick={() => handleOnClick("Backspace")}
        >
          del
        </div>
      </div>
    </div>
  );
}
