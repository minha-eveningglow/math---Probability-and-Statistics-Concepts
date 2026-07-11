import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Permutation } from "./pages/Permutation";
import { Combination } from "./pages/Combination";
import { PascalTriangle } from "./pages/PascalTriangle";
import { BinomialTheorem } from "./pages/BinomialTheorem";
import { ProbabilityBasics } from "./pages/ProbabilityBasics";
import { ConditionalProbability } from "./pages/ConditionalProbability";
import { Independence } from "./pages/Independence";
import { ConceptualFlow } from "./pages/ConceptualFlow";
import { DiscreteRV } from "./pages/DiscreteRV";
import { ContinuousRV } from "./pages/ContinuousRV";
import { NormalDistribution } from "./pages/NormalDistribution";
import { BinomialNormalApprox } from "./pages/BinomialNormalApprox";
import { SampleMean } from "./pages/SampleMean";
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
      { path: "conditional", Component: ConditionalProbability },
      { path: "independence", Component: Independence },
      { path: "discrete-rv", Component: DiscreteRV },
      { path: "continuous-rv", Component: ContinuousRV },
      { path: "normal-distribution", Component: NormalDistribution },
      { path: "binomial-normal", Component: BinomialNormalApprox },
      { path: "sample-mean", Component: SampleMean },
      { path: "flow", Component: ConceptualFlow },
    ],
  },
]);