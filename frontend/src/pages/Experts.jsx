import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import api from "../services/api";

function Experts() {
    const [search, setSearch] = useState("");
const [experts, setExperts] = useState([]);

useEffect(() => {
  api
    .get("http://127.0.0.1:8000/api/experts")
    .then((response) => {
      setExperts(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);
const filteredExperts = experts.filter((expert) =>
  expert.name.toLowerCase().includes(search.toLowerCase()) ||
  expert.expertise.toLowerCase().includes(search.toLowerCase())
);
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Expert Directory
      </h1>
<input
  type="text"
  placeholder="Search experts..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full mb-6 p-3 border rounded-lg"
/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredExperts.map((expert) => (
          <div
            key={expert.id}
            className="bg-white rounded-xl shadow p-5"
          >
            <h2 className="text-xl font-semibold">
              {expert.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {expert.expertise}
            </p>
            <p className="text-sm text-gray-500 mt-1">
  Department: {expert.department}
</p>

            <p className="mt-3 font-medium">
              ⭐ {expert.points} Points
            </p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Experts;