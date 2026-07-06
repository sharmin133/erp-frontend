import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-950 max-w-[1920px] mx-auto">
     <Navbar /> 
      <main>
        <Outlet />
      </main>
    </div>
  );
}