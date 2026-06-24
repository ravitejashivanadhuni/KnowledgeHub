import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        KnowledgeHub
      </h1>

      <nav className="space-y-3">
        <Link to="/dashboard">
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
{user?.role === "admin" && (
  <Link
    to="/admin"
    className="block p-3 rounded-lg hover:bg-slate-800"
  >
    Admin
  </Link>
)}
{user?.role === "admin" && (
  <Link
    to="/admin/users"
    className="block p-3 rounded-lg hover:bg-slate-800"
  >
    Manage Users
  </Link>
)}
<button
  onClick={handleLogout}
  className="w-full text-left p-3 rounded-lg hover:bg-red-600 bg-red-500 mt-4"
>
  Logout
</button>
      </nav>
    </div>
  );
}

export default Sidebar;