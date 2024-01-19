import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/layouts/root-layout";
import { Suspense, lazy } from "react";

const LandingPage = lazy(
  () => import("./components/pages/landing/landing-page")
);
const AboutPage = lazy(() => import("./components/pages/about/about-page"));

interface RouteType {
  path: string;
  Layout?: ({ children }: { children: React.ReactNode }) => JSX.Element;
  Component: React.LazyExoticComponent<() => JSX.Element>;
  noRootLayout?: boolean;
}

const routes: RouteType[] = [
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
];

const App = () => {
  return (
    <Routes>
      {routes.map(({ path, Layout, Component, noRootLayout }) => {
        const CompWithLayout = Layout ? (
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          </Layout>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <Component />
          </Suspense>
        );
        return (
          <Route
            key={path}
            path={path}
            element={
              !noRootLayout ? (
                <RootLayout>{CompWithLayout}</RootLayout>
              ) : (
                CompWithLayout
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default App;
