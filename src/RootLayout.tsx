import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ErrorPage } from "./pages/error-page/ErrorPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
export const RootLayout = () => {
  return (
    <ErrorBoundary fallbackRender={(props) => <ErrorPage {...props} />}>
      <ThemeProvider>
      <ToastContainer theme="colored" />
        <Provider store={store}>
          <Outlet />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
