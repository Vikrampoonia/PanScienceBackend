import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-gray-100">
  {/* Sidebar */}
  <div className="fixed top-0 left-0 h-screen">
    <Sidebar />
  </div>

  {/* Main content */}
  <div className="flex-1 ml-64 flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 p-4 overflow-y-auto">{children}</main>
  </div>
</div>
  );
}
