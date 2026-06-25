import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
  users: 0,
  experts: 0,
  articles: 0,
  questions: 0,
  answers: 0,
});
const [articles, setArticles] = useState([]);
const [questions, setQuestions] = useState([]);
const loadArticles = () => {
  api
    .get("/admin/articles")
    .then((response) => {
      setArticles(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
const loadQuestions = () => {
  api
    .get("/admin/questions")
    .then((response) => {
      setQuestions(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
useEffect(() => {
  api
    .get("/admin/stats")
    .then((response) => {
      setStats(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

loadArticles();
loadQuestions();
}, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Admin Command Centre
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard title="Total Users" value={stats.users} />
<StatCard title="Experts" value={stats.experts} />
<StatCard title="Articles" value={stats.articles} />
<StatCard title="Questions" value={stats.questions} />
<StatCard title="Answers" value={stats.answers} />
      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Manage Articles
        </h2>

<div className="space-y-3">
  {articles.map((article) => (
    <div
      key={article.id}
      className="flex justify-between items-center border-b pb-3"
    >
      <div>
        <p className="font-medium">
          {article.title}
        </p>

        <p className="text-sm text-gray-500">
          {article.author} • {article.category}
        </p>
      </div>

<button
  onClick={async () => {
    try {
      await api.delete(
        `/admin/articles/${article.id}`
      );

      loadArticles();
      alert("Article deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  }}
  className="bg-red-600 text-white px-3 py-1 rounded"
>
  Delete
</button>
    </div>
  ))}
</div>
      </div>
      <div className="mt-8 bg-white rounded-xl shadow p-6">
  <h2 className="text-xl font-semibold mb-4">
    Manage Questions
  </h2>

  <div className="space-y-3">
    {questions.map((question) => (
      <div
        key={question.id}
        className="flex justify-between items-center border-b pb-3"
      >
        <div>
          <p className="font-medium">
            {question.title}
          </p>

          <p className="text-sm text-gray-500">
            {question.author}
          </p>
        </div>

        <button
          onClick={async () => {
            try {
              await api.delete(
                `/admin/questions/${question.id}`
              );

              loadQuestions();
              alert("Question deleted successfully!");
            } catch (error) {
              console.error(error);
            }
          }}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
</div>
    </MainLayout>
  );
}

export default AdminDashboard;