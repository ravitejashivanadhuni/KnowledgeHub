import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/articles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Knowledge Articles
      </h1>

      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow p-5"
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
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Articles;