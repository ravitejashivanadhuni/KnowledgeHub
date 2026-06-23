import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";

function AdminDashboard() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Admin Command Centre
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard title="Total Users" value="150" />
        <StatCard title="Experts" value="8" />
        <StatCard title="Articles" value="25" />
        <StatCard title="Questions" value="12" />
        <StatCard title="Pending Reviews" value="5" />
      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Pending Content Review
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center border-b pb-3">
            <span>Best Practices for Talent Acquisition</span>
            <button className="bg-green-600 text-white px-3 py-1 rounded">
              Approve
            </button>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <span>Handling Large Hiring Campaigns</span>
            <button className="bg-green-600 text-white px-3 py-1 rounded">
              Approve
            </button>
          </div>

          <div className="flex justify-between items-center">
            <span>Client Communication Guidelines</span>
            <button className="bg-green-600 text-white px-3 py-1 rounded">
              Approve
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminDashboard;