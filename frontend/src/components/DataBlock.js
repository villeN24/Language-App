import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

/**
 * A user component to display the game.
 *
 * A custom component to display the word to
 * be translated and functionality to translate
 * it with answer checking.
 */
const DataBlock = (props) => {
  /** Displays the result of users's answer. */
  const [answer, setAnswer] = useState("");
  /** Is set to the correct answer of the question. */
  const [correctAnswer, setCorrectAnswer] = useState("");
  /** Stores the user's typed answer. */
  const [visual, setVisual] = useState("");
  /** Controls the color of the result box. */
  const [block, setBlockColor] = useState(null);
  /** The displayed word that the user translates. */
  const [dispLang, setDispLang] = useState(null);
  /** Boolean to control if the correct answer is shown. */
  const [dispCorrect, setDispCorrect] = useState(false);

  /** Sets the direction where list flexes. */
  document.documentElement.style.setProperty("--flex-direction", "column");

  /**
   * Sets the correct and visible word.
   *
   * Sets the correct answer and displayed word
   * to their correct value. Will also check if
   * the answer is correct when props.trigger
   * is changed.
   */
  useEffect(() => {
    if (props.visibleLang === "english") {
      setDispLang(props.english);
    } else if (props.visibleLang === "finnish") {
      setDispLang(props.finnish);
    } else {
      setDispLang(props.swedish);
    }
    if (props.blankLang === "finnish") {
      setCorrectAnswer(props.finnish);
    } else if (props.blankLang === "english") {
      setCorrectAnswer(props.english);
    } else {
      setCorrectAnswer(props.swedish);
    }
    // Triggers answer checking, only works once.
    if (props.trigger === 1) {
      checkAnswer(visual);
    }
  }, [props.trigger, props.checkFor]);

  /**
   * Sets the written text in <Input> component
   * to a variable.
   *
   * @param {object} event - Includes the string that is
   * typed in the <Input> variable.
   */
  const handleChange = (event) => {
    event.preventDefault();
    setVisual(event.target.value);
  };

  /**
   * Checks the answer.
   *
   * Checks if the user's answer is correct. If it
   * is, displays "Correct", a green box and adds a
   * point if it is not, displays "Wrong", a red box
   * and the correct answer.
   *
   * @param {String} input - The user's answer that
   * is stored in the variable visual.
   */
  const checkAnswer = (input) => {
    if (input === correctAnswer) {
      setAnswer("Correct");
      // Sets the color of the box green to visualise success.
      setBlockColor("#24BF00");
      // Adds a point to user´s score.
      props.addPoint();
    } else {
      setAnswer("Wrong");
      // Sets the color of the box red to visualise failure.
      setBlockColor("#EE1212");
      // Displays the correct answer.
      setDispCorrect(true);
    }
  };
  return (
    <div>
      <Input
        placeholder="Write your answer"
        type="text"
        onChange={(event) => handleChange(event)}
        variant="filled"
      />
      <p>{dispLang}</p>
      <p>{answer}</p>
      <Box
        style={{ display: "inline-block" }}
        sx={{
          width: 20,
          height: 20,
          backgroundColor: `${block}`,
        }}
      />
      {dispCorrect ? <p>The correct answer is: {correctAnswer}</p> : null}
    </div>
  );
};

export default DataBlock;
