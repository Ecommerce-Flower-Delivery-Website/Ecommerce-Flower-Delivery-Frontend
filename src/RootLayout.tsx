import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ErrorPage } from "./pages/error-page/ErrorPage";

export const RootLayout = () => {
  return (
    <ErrorBoundary fallbackRender={(props) => <ErrorPage {...props} />}>
      <Outlet />
    </ErrorBoundary>
  );
};
