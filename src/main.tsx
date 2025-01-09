import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { RootLayout } from "./RootLayout";
import { Dashboard } from "./dashboard/layouts/Dashboard";
import { OrderPreviewPage } from "./dashboard/pages/OrderPreviewPage";
import { LoginDashboardPage } from "./dashboard/pages/login/LoginDashboardPage";
import { OrdersPage } from "./dashboard/pages/orders/OrdersPage";
import { OverviewPage } from "./dashboard/pages/overview/OverviewPage";
import AddProductsPage from "./dashboard/pages/products/AddProductsPage";
import EditProductsPage from "./dashboard/pages/products/EditProductsPage";
import ProductsPage from "./dashboard/pages/products/ProductsPage";
import ShowProductDetails from "./dashboard/pages/products/ShowProductDetails";
import ShowProductsPage from "./dashboard/pages/products/ShowProductsPage";
import { UserManagementPage } from "./dashboard/pages/user-management/UserManagementPage";
import "./index.css";
import { NotFoundPage } from "./pages/not-found/NotFoundPage";
import SubscribePlansDetails from "./dashboard/pages/subscribe-plans/SubscribePlansDetails";
import AddEditSubscribePlan from "./dashboard/pages/subscribe-plans/AddEditSubscribePlan";
import SubscribePlans from "./dashboard/pages/subscribe-plans/SubscribePlans";
import { Accessories } from "./dashboard/pages/Accessories/Accessories";
import { UserPage } from "./dashboard/pages/user/userPage";
import { ContactsPage } from "./dashboard/pages/contact/ContactsPage";
import ShowRemindersPage from "./dashboard/pages/Reminder/ShowRemindersPage";
import { ReviewPage } from "./dashboard/pages/review/ReviewPage";

const routers = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
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
            path: "accessories",
            element: <Accessories />,
          },
          {
            path: "contact",
            element: <ContactsPage />,
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
                path: "edit/:id",
                element: <EditProductsPage />,
              },
              {
                path: "product/:id",
                element: <ShowProductDetails />,
              },
            ],
          },
          {
            path: "orders",
            children: [
              {
                index: true,
                element: <OrdersPage />,
              },
              {
                path: ":id",
                element: <OrderPreviewPage />,
              },
            ],
          },
          {
            path: "subscribe-plans",
            children: [
              {
                index: true,
                element: <SubscribePlans />,
              },
              {
                path: ":id",
                element: <SubscribePlansDetails />,
              },
              {
                path: "add",
                element: <AddEditSubscribePlan />,
              },
              {
                path: "edit/:id",
                element: <AddEditSubscribePlan />,
              },
            ],
          },
          // {
          //   path: "carts",
          //   element: <CartsPage />,
          // },
          {
            path: "reviews",
            element: <ReviewPage />,
          },

          // {
          //   path: "category",
          //   element: <CategoryPage />,
          // },
          // {
          //   path: "/dashboard",
          //   element: <Navigate to={"/dashboard/overview"} replace />,
          // },
          {
            path: "reminder",
            element: <ShowRemindersPage />,
          },
        ],
      },
      {
        path: "/dashboard/login_dashboard",
        element: <LoginDashboardPage />,
      },
      {
        path: "/accessories",
        element: <Accessories />,
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
