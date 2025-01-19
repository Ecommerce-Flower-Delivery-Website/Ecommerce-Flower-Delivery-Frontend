import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useThemeToggle } from "../contexts/hooks/useThemeToggle";
import { Button } from "../dashboard/components/button";
import { Sidebar } from "./components/SideBar";

export const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useThemeToggle();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   const token = localStorage.getItem("token");
  //   if (!user || !token) {
  //     navigate("/dashboard/login_dashboard");
  //   }
  // }, [navigate]);
  return (
    <div className="flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex relative flex-col flex-1 ">
        <header className="flex items-center h-16 justify-between px-6 py-4 bg-muted ">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => toggleTheme()}>
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </header>
        <main className="flex-1  overflow-y-auto bg-background  p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
