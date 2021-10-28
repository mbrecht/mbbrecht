// Trivia game

import { useEffect, useState } from "react";
import Typography from "../components/Typography";
import styles from "../styles/trivia.module.css";
import Head from "next/head";

export default function Trivia() {
  const [categories, setCategories] = useState(undefined); // category data
  const [category, setCategory] = useState(undefined); // selected category
  const [difficulty, setDifficulty] = useState("easy");
  const [answers, setAnswers] = useState(undefined);
  const [answer, setAnswer] = useState(undefined); // current answer
  const [mode, setMode] = useState("initializing"); // game mode
  const [questions, setQuestions] = useState(undefined); // question data
  const [questionID, setQuestionID] = useState(0); // current question index
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [noQuestions, setNoQuestions] = useState(undefined); // true if no questions loaded

  const loadQuestions = async () => {
    const catQuery = category ? `&category=${category}` : "";
    const diffQuery = difficulty ? `&difficulty=${difficulty}` : "";
    const url = `https://opentdb.com/api.php?amount=10${catQuery}${diffQuery}`;
    console.log(url);
    return fetch(url)
      .then((res) => res.json())
      .then(({ results }) => {
        setQuestions(results);
        setScore(0);
        setQuestionID(0);
        setNoQuestions(!results.length);
        return !!results.length;
      });
  };

  const decodeHTML = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const renderCategory = ({ id, name = "" }, i) => {
    return (
      <option key={i} value={id}>
        {name}
      </option>
    );
  };

  const renderCategories = (categories) => (
    <>
      <select
        name="categories"
        id="categories"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={styles.select}
      >
        {categories.map(renderCategory)}
      </select>
    </>
  );

  const shuffleAnswers = (answers) => {
    setAnswers(
      answers.sort(
        () => 0.5 - Math.random() // shuffles answers
      )
    );
  };

  const renderQuestion = ({
    category = "",
    type = "",
    difficulty = "",
    question = "",
    correct_answer = "",
    incorrect_answers = [],
  }) => {
    if (!answers) shuffleAnswers([correct_answer, ...incorrect_answers]);
    return (
      <div className={styles.question}>
        <div className={styles.questionInfo}>
          <Typography>
            {category} - {difficulty}
          </Typography>
          <Typography>
            {score} / {questions.length}
          </Typography>
        </div>
        <Typography>{decodeHTML(question)}</Typography>
        <div
          onChange={(e) => setAnswer(e.target.value)}
          name="answer"
          value={answer}
          className={styles.answerContainer}
        >
          {answers &&
            answers.map((val, i) => (
              <div className={styles.answer}>
                <input
                  type="radio"
                  name="answer"
                  value={val}
                  key={`${question}:${val}`}
                />
                <label
                  htmlFor={val}
                  className={
                    showAnswers &&
                    (val === correct_answer ? styles.correct : styles.wrong)
                  }
                >
                  {decodeHTML(val)}
                </label>
              </div>
            ))}
        </div>
        <button
          className={styles.btn}
          disabled={!!showAnswers}
          onClick={(e) => {
            e.preventDefault();
            if (answer) {
              // Next question in 1.5 seconds
              setShowAnswers(true);
              setTimeout(() => {
                if (questionID === questions.length - 1) {
                  setMode("ending");
                  return;
                }
                const points = answer === correct_answer;
                setScore(score + points);
                setQuestionID(questionID + 1);
                setAnswers(undefined);
                setAnswer(undefined);
                setShowAnswers(false);
              }, 1500);
            }
          }}
        >
          Next
        </button>
      </div>
    );
  };

  const renderModes = {
    initializing: () => {
      return (
        categories && (
          <div className={styles.initializing}>
            <div className={styles.header}>
              {renderCategories(categories)}
              <select
                name="difficulty"
                id="difficulty"
                value={difficulty}
                className={styles.select}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <button
                // transition to next state
                onClick={async (e) => {
                  e.preventDefault();
                  setNoQuestions(undefined);
                  loadQuestions().then(
                    (success) => success && setMode("playing")
                  );
                }}
                className={styles.btn}
              >
                Play
              </button>
            </div>
            {noQuestions && (
              <Typography>
                Failed to load questions. Please select different options
              </Typography>
            )}
          </div>
        )
      );
    },
    playing: () => {
      return <>{renderQuestion(questions[questionID])}</>;
    },
    ending: () => {
      return (
        <div className={styles.ending}>
          <Typography>Total Score: {score}</Typography>
          <button
            onClick={(e) => {
              e.preventDefault();
              setMode("initializing");
              // reset everything. TODO - make a reset function
              setCategory(undefined); // selected category
              setDifficulty("easy");
              setAnswers(undefined);
              setAnswer(undefined); // current answer
              setMode("initializing"); // game mode
              setQuestionID(0); // current question index
              setQuestions(undefined); // current question index
              setScore(0);
              setShowAnswers(false);
              setNoQuestions(undefined); // true if no questions loaded
            }}
            className={styles.btn}
          >
            Play Again
          </button>
        </div>
      );
    },
  };

  // initialize categories
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then(({ trivia_categories }) => setCategories(trivia_categories));
  }, []);

  return (
    <section className={styles.container}>
      <Head>
        <title>Trivia - Michael Brecht | Software Engineer</title>
        <meta
          name="description"
          content="A fun trivia game based off the Open Trivia Database"
        />
      </Head>
      <>{renderModes[mode]()}</>
    </section>
  );
}
