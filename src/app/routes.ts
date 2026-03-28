import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Permutation } from "./pages/Permutation";
import { Combination } from "./pages/Combination";
import { PascalTriangle } from "./pages/PascalTriangle";
import { BinomialTheorem } from "./pages/BinomialTheorem";
import { ProbabilityBasics } from "./pages/ProbabilityBasics";
import { ConceptualFlow } from "./pages/ConceptualFlow";
import { Root } from "./pages/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "permutation", Component: Permutation },
      { path: "combination", Component: Combination },
      { path: "binomial", Component: BinomialTheorem },
      { path: "pascal", Component: PascalTriangle },
      { path: "probability", Component: ProbabilityBasics },
      { path: "flow", Component: ConceptualFlow },
    ],
  },
]);