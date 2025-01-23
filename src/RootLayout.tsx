import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { ThemeProvider } from "./contexts/ThemeProvider";
import "./index.css";
import { ErrorPage } from "./pages/error-page/ErrorPage";
import { store } from "./store/store";

export const RootLayout = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary fallbackRender={(props) => <ErrorPage {...props} />}>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ToastContainer theme="colored" />
            <Provider store={store}>
              <Outlet />
            </Provider>
          </ThemeProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </ErrorBoundary>
  );
};
