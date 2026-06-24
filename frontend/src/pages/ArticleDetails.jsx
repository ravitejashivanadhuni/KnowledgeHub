import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api
      .get(`/articles/${id}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!article) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-4">
        {article.title}
      </h1>

      <div className="flex gap-4 text-sm text-gray-500 mb-6">
        <span>Author: {article.author}</span>
        <span>Category: {article.category}</span>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="leading-7 whitespace-pre-wrap">
          {article.content}
        </p>
      </div>
    </MainLayout>
  );
}

export default ArticleDetails;