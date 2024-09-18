import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login/Login";
import AppLayout from "./pages/AppLayout";
import Protected from "./utils/Protected";
import { lazy, Suspense } from "react";
import Register from "./pages/auth/register/Register";

const Profile = lazy(() => import("./pages/main/Profile/Profile"));
const Feed = lazy(() => import("./pages/main/Feed/Feed"));

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
      {
        path: "/profile/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
