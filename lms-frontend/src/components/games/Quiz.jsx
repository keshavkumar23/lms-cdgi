import React, { useState, useEffect } from 'react';

const QuizGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [numQuestions, setNumQuestions] = useState(5);
  const [showInput, setShowInput] = useState(true); // State to control showing input

  useEffect(() => {
    if (!showInput) {
      fetchQuestions();
    }
  }, [showInput]);

  const handleInputChange = (e) => {
    setNumQuestions(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowInput(false);
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&type=multiple`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleOptionClick = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setUserAnswers([...userAnswers, { question: currentQuestion.question, selectedAnswer, isCorrect }]);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizOver(true);
    }
  };

  const restartQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setQuizOver(false);
    setIsLoading(true);
    setShowInput(true); // Show input again to allow user to choose number of questions
  };

  if (showInput) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-white">
        <div className="text-4xl font-bold mb-6">Quiz Game</div>
        <form onSubmit={handleSubmit} className="max-w-lg p-4 rounded-lg shadow-lg text-center">
          <label className="block mb-4">
            Number of Questions:
            <input
              type="number"
              value={numQuestions}
              onChange={handleInputChange}
              className="ml-2 px-4 py-2 bg-gray-300 rounded text-black"
              min="1"
              max="20"
              required
            />
          </label>
          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Quiz
          </button>
        </form>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (quizOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-white">
        <div className="text-4xl font-bold mb-6">Quiz Over!</div>
        <div className="text-2xl mb-4">Your Score: {score} / {numQuestions}</div>
        <button
          onClick={restartQuiz}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Restart Quiz
        </button>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Answers:</h2>
          {userAnswers.map((answer, index) => (
            <div key={index} className="mt-2">
              <p><strong>Question:</strong> {answer.question}</p>
              <p><strong>Your Answer:</strong> {answer.selectedAnswer}</p>
              <p><strong>Correct Answer:</strong> {answer.isCorrect ? 'Correct' : 'Incorrect'}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-white">
      <div className="text-4xl font-bold mb-6">Quiz Game</div>
      <div className="max-w-lg p-4 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
        <div className="grid grid-cols-2 gap-4">
          {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
            .sort(() => Math.random() - 0.5)
            .map((answer, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(answer)}
                className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            ))}
        </div>
      </div>
      <div className="mt-4 text-lg">
        Question {currentQuestionIndex + 1} of {numQuestions}
      </div>
    </div>
  );
};

export default QuizGame;
