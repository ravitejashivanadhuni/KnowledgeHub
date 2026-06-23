import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        KnowledgeHub
      </h1>

      <nav className="space-y-3">
        <Link to="/">
          <div className="p-3 rounded-lg bg-slate-800 cursor-pointer">
            Dashboard
          </div>
        </Link>

        <Link to="/articles">
          <div className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
            Articles
          </div>
        </Link>

        <Link to="/questions">
          <div className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
            Questions
          </div>
        </Link>

        <Link to="/experts">
          <div className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
            Experts
          </div>
        </Link>

        <Link to="/leaderboard">
          <div className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
            Leaderboard
          </div>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;