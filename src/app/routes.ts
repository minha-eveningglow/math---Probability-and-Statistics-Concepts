import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Permutation } from "./pages/Permutation";
import { Combination } from "./pages/Combination";
import { PascalTriangle } from "./pages/PascalTriangle";
import { Root } from "./pages/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "permutation", Component: Permutation },
      { path: "combination", Component: Combination },
      { path: "pascal", Component: PascalTriangle },
    ],
  },
]);
