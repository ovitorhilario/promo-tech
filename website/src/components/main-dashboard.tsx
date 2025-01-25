import { Outlet } from "react-router";
import { Navbar } from "~/components/navbar";

export function MainDashboard() {
  return (
    <div className="w-full flex min-h-screen flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}