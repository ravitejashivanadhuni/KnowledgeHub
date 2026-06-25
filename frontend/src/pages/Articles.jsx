import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
const [newArticle, setNewArticle] = useState({
  title: "",
  content: "",
  category: "",
});

const loadArticles = () => {
  api
    .get("/articles")
    .then((response) => {
      setArticles(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

useEffect(() => {
  loadArticles();
}, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Knowledge Articles
      </h1>
{(user?.role === "expert" || user?.role === "admin") && (
  <div className="mb-6">
    <button
      onClick={() => setShowForm(!showForm)}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      Create Article
    </button>
  </div>
)}
{showForm && (
  <div className="bg-white rounded-xl shadow p-5 mb-6">
    <h2 className="text-xl font-semibold mb-4">
      Create Article
    </h2>

    <input
      type="text"
      placeholder="Article Title"
      value={newArticle.title}
      onChange={(e) =>
        setNewArticle({
          ...newArticle,
          title: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3 mb-3"
    />

    <textarea
      rows="4"
      placeholder="Article Content"
      value={newArticle.content}
      onChange={(e) =>
        setNewArticle({
          ...newArticle,
          content: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3 mb-3"
    />

    <input
      type="text"
      placeholder="Category"
      value={newArticle.category}
      onChange={(e) =>
        setNewArticle({
          ...newArticle,
          category: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3 mb-3"
    />

    <button
      onClick={async () => {
        if (
          !newArticle.title ||
          !newArticle.content ||
          !newArticle.category
        ) {
          return;
        }

        try {
          await api.post("/articles", newArticle);

          setNewArticle({
            title: "",
            content: "",
            category: "",
          });

          setShowForm(false);

          loadArticles();
          alert("Article created successfully!");
        } catch (error) {
          console.error(error);
          alert("Failed to create article");
        }
      }}
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Submit Article
    </button>
  </div>
)}
      <div className="space-y-4">
        {articles.map((article) => (
<Link
  key={article.id}
  to={`/articles/${article.id}`}
  className="block bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
>
            <h2 className="text-xl font-semibold">
              {article.title}
            </h2>

            <p className="text-gray-600 mt-2">
              Author: {article.author}
            </p>

            <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {article.category}
            </span>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
}

export default Articles;