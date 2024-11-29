import { useLocalStorage } from "@mantine/hooks";
import {
  BarChart as BarChartIcon,
  LogOut,
  MenuIcon,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "../components/button";

const menuItems = [
  { id: "overview", label: "Overview", icon: BarChartIcon },
  { id: "users", label: "User Management", icon: Users },
  { id: "orders", label: "Orders", icon: Users },
];

const SideBar = ({
  isOpen,
  setIsOpen,
}: {
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
}) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const isSmallScreen = window.innerWidth < 768;
  return (
    <>
      {isSmallScreen && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className=" fixed inset-0 z-30 bg-white/10 backdrop-blur"
        />
      )}
      <aside
        className={cn(
          "w-64 max-md:absolute z-40 max-md:duration-500 max-md:left-0 h-screen  transition-transform border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900",
          {
            "translate-x-0 ": isOpen,
            "-translate-x-full ": !isOpen,
          }
        )}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {menuItems.find((page) => location.pathname.includes(page.id))
                ?.label ?? ""}
            </h1>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.id}
                className={({ isActive }) =>
                  cn(
                    "mb-1 w-full flex rounded px-4 py-2 items-center justify-start",
                    {
                      "bg-primary text-white hover:bg-primary hover:text-white dark:shadow-[0_0_10px_rgba(176,38,255,0.3)]":
                        isActive,
                      "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white":
                        !isActive,
                    }
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={cn("mr-2 h-4 w-4", {
                        "text-white": isActive,
                        "text-gray-500 dark:text-gray-400": !isActive,
                      })}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export const Dashboard = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean | undefined>({
    key: "theme",
  });
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      document.documentElement.classList.toggle("dark", !prev);
      return !prev;
    });
  };
  useLayoutEffect(() => {
    const isDark = JSON.parse(localStorage.getItem("theme") ?? "null") as
      | boolean
      | null;
    const isPreferDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (isDark == null) {
      document.documentElement.classList.toggle("dark", isPreferDarkTheme);
      setIsDarkMode(isPreferDarkTheme);
    } else if (isDark) {
      document.documentElement.classList.toggle("dark", isDark);
      setIsDarkMode(isDark);
    }
  }, [setIsDarkMode]);
  const [menuIsOpen, setMenuIsOpen] = useState(window.innerWidth > 768);
  const isSmallScreen = window.innerWidth < 768;
  return (
    <>
      <div className={`flex h-screen`}>
        <SideBar setIsOpen={setMenuIsOpen} isOpen={menuIsOpen} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
          <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {menuItems.find((item) =>
                  location.pathname.startsWith("/dashboard/" + item.id)
                )?.label || "Dashboard"}
              </h1>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={toggleTheme}
                  className="bg-white dark:bg-gray-800"
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
                {isSmallScreen && (
                  <Button
                    variant="ghost"
                    onClick={() => setMenuIsOpen((prev) => !prev)}
                    className="bg-white dark:bg-gray-800"
                  >
                    <MenuIcon />
                  </Button>
                )}
              </div>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};
