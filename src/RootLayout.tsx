import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ErrorPage } from "./pages/error-page/ErrorPage";
import { Provider } from "react-redux";
import { store } from "./dashboard/store/store";
import { ThemeProvider } from "./contexts/ThemeProvider";

export const RootLayout = () => {
  return (
    <ErrorBoundary fallbackRender={(props) => <ErrorPage {...props} />}>
      <ThemeProvider>
        <Provider store={store}>
          <Outlet />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
