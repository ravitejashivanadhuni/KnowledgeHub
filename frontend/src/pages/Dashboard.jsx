import StatCard from "../components/Statcard";
import experts from "../data/experts";
import articles from "../data/articles";
import Sidebar from "../components/Sidebar";

function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex">
                <Sidebar />
                <div className="ml-64">
                    <h1 className="text-3xl font-bold mb-6">
                KnowledgeHub Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Articles" value="25" />
                <StatCard title="Total Questions" value="12" />
                <StatCard title="Experts" value="8" />
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Top Experts
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {experts.map((expert) => (
                        <div
                            key={expert.id}
                            className="bg-white rounded-xl shadow p-4"
                        >
                            <h3 className="font-semibold text-lg">
                                {expert.name}
                            </h3>

                            <p className="text-gray-600">
                                {expert.expertise}
                            </p>

                            <p className="mt-2 font-medium">
                                ⭐ {expert.points} Points
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8">
  <h2 className="text-2xl font-semibold mb-4">
    Recent Knowledge Articles
  </h2>

  <div className="space-y-4">
    {articles.map((article) => (
      <div
        key={article.id}
        className="bg-white rounded-xl shadow p-4"
      >
        <h3 className="font-semibold text-lg">
          {article.title}
        </h3>

        <p className="text-gray-600 mt-1">
          Author: {article.author}
        </p>

        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {article.category}
        </span>
      </div>
    ))}
  </div>
</div>
        </div>
            </div>
        </div>
    );
}

export default Dashboard;