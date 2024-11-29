import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./dashboard/layouts/Dashboard";
import { OverviewPage } from "./dashboard/pages/overview/OverviewPage";
import "./index.css";
import { NotFoundPage } from "./pages/not-found/NotFoundPage";
import { RootLayout } from "./RootLayout";
import { UserManagementPage } from "./dashboard/pages/user-management/UserManagementPage";
import ProductsPage from "./dashboard/pages/products/ProductsPage";
import AddProductsPage from "./dashboard/pages/products/AddProductsPage";
import ShowProductsPage from "./dashboard/pages/products/ShowProductsPage";
import EditProductsPage from "./dashboard/pages/products/EditProductsPage";
import ShowProductDetails from "./dashboard/pages/products/ShowProductDetails";

const routers = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            path: "overview",
            element: <OverviewPage />,
          },
          {
            path: "users",
            element: <UserManagementPage />,
          },
          {
            path: "products",
            element: <ProductsPage />,
            children: [
              {
                index: true,
                path: "",
                element: <ShowProductsPage />,
              },
              {
                path: "add",
                element: <AddProductsPage />,
              },
              {
                path: "edit",
                element: <EditProductsPage />,
              },
              {
                path: "product/:id",
                element: <ShowProductDetails />,
              },
            ],
          },
          // {
          //   path: "login",
          //   element: <LoginPage />,
          // },
        ],
      },

      {
        path: "/*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Suspense
      fallback={
        <section className="fixed inset-0 grid h-screen w-full bg-white dark:bg-black">
          <div className="relative m-auto size-20">
            <div className="absolute top-1/2 h-2 w-full animate-[spin_3s_infinite_ease-in-out] rounded-full bg-sky-500/80 bg-blend-hue" />
            <div className="absolute top-1/2 h-2 w-full animate-[spin_3s_infinite_ease-in-out_-2.25s] rounded-full bg-rose-500/80 bg-blend-hue" />
            <div className="absolute top-1/2 h-2 w-full animate-[spin_3s_infinite_ease-in-out_-1.5s] rounded-full bg-amber-500/80 bg-blend-hue" />
            <div className="absolute top-1/2 h-2 w-full animate-[spin_3s_infinite_ease-in-out_-0.75s] rounded-full bg-lime-500/80 bg-blend-hue" />
          </div>
        </section>
      }
    >
      <RouterProvider router={routers} />
    </Suspense>
  </StrictMode>
);
