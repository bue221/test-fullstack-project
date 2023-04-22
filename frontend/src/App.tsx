import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunction,
  ActionFunction,
} from "react-router-dom";
import WrapAuthValidation from "./components/WrapAuthValidation";
//
import { store } from "./redux/store";
import { Provider } from "react-redux";

interface IRoute {
  path: string;
  Element: any;
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: JSX.Element;
}

const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });

const routes: IRoute[] = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    // @ts-ignore
    Element: pages[path].default,
    // @ts-ignore
    loader: pages[path]?.loader as unknown as LoaderFunction | undefined,
    // @ts-ignore
    action: pages[path]?.action as unknown as ActionFunction | undefined,
    // @ts-ignore
    ErrorBoundary: pages[path]?.ErrorBoundary as unknown as JSX.Element,
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    // @ts-ignore
    element: (
      <WrapAuthValidation>
        <Element />
      </WrapAuthValidation>
    ),
    // @ts-ignore
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Toaster />
        <div className="relative">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </>
  );
};

export default App;
