import React, { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "expert",
    department: "",
    expertise: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/admin/users",
        formData
      );

      setUsers((prev) => [
        response.data.user,
        ...prev,
      ]);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "expert",
        department: "",
        expertise: "",
      });

      setShowModal(false);

      alert("User created successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create user");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/users/${id}`);

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user.id !== id
        )
      );
      alert("User deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting user:",
        error
      );

      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Loading users...
        </h2>
      </div>
    );
  }

  return (
    <MainLayout>
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            Manage Users
          </h1>

          <div className="flex gap-3 items-center">
            <span className="text-sm text-gray-500">
              Total Users: {users.length}
            </span>

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create User
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">
                  ID
                </th>
                <th className="px-4 py-3 text-left">
                  Name
                </th>
                <th className="px-4 py-3 text-left">
                  Email
                </th>
                <th className="px-4 py-3 text-left">
                  Role
                </th>
                <th className="px-4 py-3 text-left">
                  Department
                </th>
                <th className="px-4 py-3 text-left">
                  Expertise
                </th>
                <th className="px-4 py-3 text-left">
                  Points
                </th>
                <th className="px-4 py-3 text-left">
                  Joined
                </th>
                <th className="px-4 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-6 text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      {user.id}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      {user.name}
                    </td>

                    <td className="px-4 py-3">
                      {user.email}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-700"
                            : user.role ===
                              "expert"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {user.department ||
                        "-"}
                    </td>

                    <td className="px-4 py-3">
                      {user.expertise || "-"}
                    </td>

                    <td className="px-4 py-3">
                      {user.points}
                    </td>

                    <td className="px-4 py-3">
                      {user.created_at
                        ? new Date(
                            user.created_at
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          handleDelete(
                            user.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              Create User
            </h2>

            <form
              onSubmit={handleCreateUser}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password:
                      e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
                required
              />

              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              >
                <option value="expert">
                  Expert
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>

              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department:
                      e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Expertise"
                value={formData.expertise}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    expertise:
                      e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
    </MainLayout>
  );
}

export default AdminUsers;