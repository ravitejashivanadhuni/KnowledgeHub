import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import api from "../services/api";

function Leaderboard() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    api
      .get("/experts")
      .then((response) => {
        setExperts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const sortedExperts = [...experts].sort(
    (a, b) => b.points - a.points
  );

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Leaderboard
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Rank</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Expertise</th>
              <th className="p-4 text-left">Points</th>
            </tr>
          </thead>

          <tbody>
            {sortedExperts.map((expert, index) => (
              <tr key={expert.id} className="border-t">
                <td className="p-4">#{index + 1}</td>
                <td className="p-4">{expert.name}</td>
                <td className="p-4">{expert.expertise}</td>
                <td className="p-4 font-semibold">
                  ⭐ {expert.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default Leaderboard;