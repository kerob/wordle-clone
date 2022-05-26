import React from "react";

export default function Modal({ playerWon, turn, solution }) {
  return (
    <div className="modal">
      {playerWon ? (
        <div className="modal-message">
          <h1 className="modal-title"> Congratulations! </h1>
          <div>You won in {turn} turns! </div>
        </div>
      ) : (
        <div className="modal-message">
          <h1 className="modal-title"> Sorry! Try Again! </h1>
          <div>The word was {solution} </div>
        </div>
      )}
    </div>
  );
}
