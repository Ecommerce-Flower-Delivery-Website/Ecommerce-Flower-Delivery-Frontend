import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ErrorPage } from "./pages/error-page/ErrorPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";
import { CartProvider } from "./contexts/CartContext";

export const RootLayout = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary fallbackRender={(props) => <ErrorPage {...props} />}>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <CartProvider>
              <ToastContainer theme="colored" />
              <Provider store={store}>
                <Outlet />
              </Provider>
            </CartProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </ErrorBoundary>
  );
};
