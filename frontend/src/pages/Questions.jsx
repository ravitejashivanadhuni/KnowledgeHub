import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Questions() {
    const [showForm, setShowForm] = useState(false);
    const [questions, setQuestions] = useState([]);
useEffect(() => {
  api
    .get("/questions")
    .then((response) => {
      setQuestions(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

const [newQuestion, setNewQuestion] = useState({
  title: "",
  description: "",
});

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Questions & Answers
      </h1>
<div className="mb-6">
  <button
    onClick={() => setShowForm(!showForm)}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    Ask Question
  </button>
</div>
{showForm && (
  <div className="bg-white rounded-xl shadow p-5 mb-6">
    <h2 className="text-xl font-semibold mb-4">
      Ask a Question
    </h2>

<input
  type="text"
  placeholder="Question Title"
  value={newQuestion.title}
  onChange={(e) =>
    setNewQuestion({
      ...newQuestion,
      title: e.target.value,
    })
  }
  className="w-full border rounded-lg p-3 mb-3"
/>

<textarea
  placeholder="Describe your question..."
  rows="4"
  value={newQuestion.description}
  onChange={(e) =>
    setNewQuestion({
      ...newQuestion,
      description: e.target.value,
    })
  }
  className="w-full border rounded-lg p-3 mb-3"
/>

<button
  onClick={async () => {
  if (!newQuestion.title || !newQuestion.description) return;

  try {
    await api.post("/questions", {
      title: newQuestion.title,
      description: newQuestion.description,
    });

    const response = await api.get("/questions");

    setQuestions(response.data);

    setNewQuestion({
      title: "",
      description: "",
    });

    setShowForm(false);
    alert("Question created successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to create question");
  }
}}
  className="bg-green-600 text-white px-4 py-2 rounded-lg"
>
  Submit Question
</button>
  </div>
)}
      <div className="space-y-4">
        {questions.map((question) => (
<Link
  key={question.id}
  to={`/questions/${question.id}`}
  className="block bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
>
            <h2 className="text-xl font-semibold">
              {question.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {question.description}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Asked by: {question.author}
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {question.answers} Answers
              </span>
            </div>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
}

export default Questions;