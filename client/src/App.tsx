import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login/Login";
import AppLayout from "./pages/AppLayout";
import Protected from "./utils/Protected";
import { lazy, Suspense } from "react";
const Feed = lazy(() => import("./pages/main/Feed"));

const router = createBrowserRouter([
  {
    element: (
      <Protected>
        <AppLayout />
      </Protected>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Feed />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
