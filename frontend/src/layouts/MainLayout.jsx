import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100 p-6">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;