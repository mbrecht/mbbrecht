// Trivia game

import { useEffect, useState } from "react";
import Typography from "../components/Typography";
import styles from "../styles/trivia.module.css";

export default function Trivia() {
  const [categories, setCategories] = useState(undefined); // category data
  const [category, setCategory] = useState(undefined); // selected category
  const [difficulty, setDifficulty] = useState("easy");
  const [answers, setAnswers] = useState(undefined);
  const [answer, setAnswer] = useState(undefined); // current answer
  const [mode, setMode] = useState("initializing"); // game mode
  const [questions, setQuestions] = useState(undefined); // question data
  const [questionID, setQuestionID] = useState(0); // current question index
  const [scores, setScores] = useState(undefined);
  const [showAnswers, setShowAnswers] = useState(false);

  const loadQuestions = async () => {
    const catQuery = category ? `&category=${category}` : "";
    const diffQuery = difficulty ? `&difficulty=${difficulty}` : "";
    const url = `https://opentdb.com/api.php?amount=10${catQuery}${diffQuery}`;
    return fetch(url)
      .then((res) => res.json())
      .then(({ results }) => {
        setQuestions(results);
        setScores(new Array(results.length).fill(0));
        setQuestionID(0);
      });
  };

  const decodeHTML = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const renderCategory = ({ name = "" }, i) => {
    return (
      <option key={i} value={name}>
        {name}
      </option>
    );
  };

  const renderCategories = (categories) => (
    <>
      <label htmlFor="categories">Categories: </label>
      <select
        name="categories"
        id="categories"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
    category,
    type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
  }) => {
    if (!answers) shuffleAnswers([correct_answer, ...incorrect_answers]);
    return (
      <div className={styles.question}>
        <div className={styles.questionInfo}>
          <Typography>
            {category} - {difficulty}
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
                let newScores = [...scores];
                newScores[questionID] = answer === correct_answer;
                if (questionID === questions.length - 1) {
                  setMode("ending");
                  return;
                }
                setScores(newScores);
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
          <>
            <div className={styles.header}>
              {renderCategories(categories)}
              <select
                name="difficulty"
                id="difficulty"
                value={difficulty}
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
                  loadQuestions().then(() => setMode("playing"));
                }}
              >
                Play
              </button>
            </div>
            <div className={styles.body}></div>
          </>
        )
      );
    },
    playing: () => {
      return <>{renderQuestion(questions[questionID])}</>;
    },
    ending: () => {
      return (
        <>Total Score: {scores.reduce((total, score) => (total += score), 0)}</>
      );
    },
  };

  // initialize categories
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then(({ trivia_categories }) => setCategories(trivia_categories));
  }, []);

  return <section className={styles.container}>{renderModes[mode]()}</section>;
}
