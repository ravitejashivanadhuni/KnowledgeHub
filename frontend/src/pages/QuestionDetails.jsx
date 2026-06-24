import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");

const loadQuestion = () => {
  axios
    .get(`http://127.0.0.1:8000/api/questions/${id}`)
    .then((response) => {
      setQuestion(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

useEffect(() => {
  loadQuestion();
}, [id]);

  if (!question) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-4">
        {question.title}
      </h1>

      <p className="text-gray-600 mb-4">
        {question.description}
      </p>

      <p className="text-sm text-gray-500 mb-6">
        Asked by: {question.author}
      </p>

<div className="bg-white rounded-xl shadow p-5 mb-6">
  <h2 className="text-xl font-semibold mb-4">
    Add Answer
  </h2>

  <textarea
    rows="4"
    value={newAnswer}
    onChange={(e) => setNewAnswer(e.target.value)}
    placeholder="Write your answer..."
    className="w-full border rounded-lg p-3 mb-3"
  />

  <button
    onClick={async () => {
      if (!newAnswer.trim()) return;

      try {
        await axios.post(
          "http://127.0.0.1:8000/api/answers",
          {
            question_id: question.id,
            answer: newAnswer,
          }
        );

        setNewAnswer("");

        loadQuestion();
      } catch (error) {
        console.error(error);
      }
    }}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    Submit Answer
  </button>
</div>

      <div className="space-y-4">
        {question.answers.map((answer) => (
          <div
            key={answer.id}
            className="bg-white rounded-xl shadow p-4"
          >
            <p>{answer.answer}</p>

            <p className="text-sm text-gray-500 mt-2">
              By: {answer.author}
            </p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default QuestionDetails;