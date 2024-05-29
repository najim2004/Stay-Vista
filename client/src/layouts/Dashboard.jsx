import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
