import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ScrollIndicator } from '../components/ScrollIndicator';

export function ConceptualFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setShowScrollIndicator(v < 0.1);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Section progress (0-1 for each of 5 sections)
  const section1Progress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const section2Progress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const section3Progress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const section4Progress = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const section5Progress = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator show={showScrollIndicator} />

      {/* Section 1: Combinatorics */}
      <Section1Combinatorics progress={section1Progress} />

      {/* Section 2: Binomial Theorem */}
      <Section2BinomialTheorem progress={section2Progress} />

      {/* Section 3: Pascal Triangle */}
      <Section3PascalTriangle progress={section3Progress} />

      {/* Section 4: Binomial Distribution */}
      <Section4BinomialDistribution progress={section4Progress} />

      {/* Section 5: Normal Distribution */}
      <Section5NormalDistribution progress={section5Progress} />

      {/* Final Message */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center px-8"
        >
          <h2 className="text-5xl font-bold mb-6">
            이것이 수학의 아름다움입니다
          </h2>
          <p className="text-2xl text-indigo-200">
            세기(Counting) → 대수(Algebra) → 기하(Geometry) → 확률(Probability) → 통계(Statistics)
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Section 1: Combinatorics (Counting)
function Section1Combinatorics({ progress }: { progress: any }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on('change', (v: number) => {
      setCount(Math.floor(v * 120));
    });
    return unsubscribe;
  }, [progress]);

  const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div className="h-[150vh] relative">
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50"
        style={{ opacity }}
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            조합론 (Combinatorics)
          </h1>
          <p className="text-2xl text-gray-700 mb-12">
            모든 것은 <span className="font-bold text-blue-600">세기</span>에서 시작됩니다
          </p>

          {/* Counting Animation */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-8xl font-bold text-blue-600">
              {count}
            </div>
          </div>

          {/* Visual counting */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {Array.from({ length: Math.min(count, 100) }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-blue-500 rounded"
              />
            ))}
          </div>

          <p className="text-lg text-gray-600 mt-8">
            순열: ₙPᵣ = n!/(n-r)! &nbsp;&nbsp;|&nbsp;&nbsp; 조합: ₙCᵣ = n!/[r!(n-r)!]
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Section 2: Binomial Theorem (Algebra)
function Section2BinomialTheorem({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div className="h-[150vh] relative">
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50"
        style={{ opacity }}
      >
        <div className="text-center max-w-4xl px-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            이항정리 (Binomial Theorem)
          </h1>
          <p className="text-2xl text-gray-700 mb-12">
            <span className="font-bold text-purple-600">세기가 대수가 되는 순간</span>
          </p>

          {/* Binomial expansion */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="text-3xl font-mono mb-6">
              (a + b)<sup>n</sup> = ?
            </div>

            <div className="text-2xl font-mono mb-8 text-purple-700">
              = Σ <span className="text-indigo-600">C(n,r)</span> · a<sup>n-r</sup> · b<sup>r</sup>
            </div>

            <div className="text-left space-y-4">
              <div className="text-lg">
                n=3: <span className="font-mono text-purple-600">1</span>a³ + <span className="font-mono text-purple-600">3</span>a²b + <span className="font-mono text-purple-600">3</span>ab² + <span className="font-mono text-purple-600">1</span>b³
              </div>
              <div className="text-lg">
                n=4: <span className="font-mono text-purple-600">1</span>a⁴ + <span className="font-mono text-purple-600">4</span>a³b + <span className="font-mono text-purple-600">6</span>a²b² + <span className="font-mono text-purple-600">4</span>ab³ + <span className="font-mono text-purple-600">1</span>b⁴
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-600">
            계수 <span className="font-bold text-purple-600">C(n,r)</span>은 조합의 수입니다
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Section 3: Pascal Triangle
function Section3PascalTriangle({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Generate Pascal's Triangle
  const n = 10;
  const triangle: number[][] = [];
  for (let i = 0; i < n; i++) {
    triangle[i] = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        triangle[i][j] = 1;
      } else {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
    }
  }

  return (
    <div className="h-[150vh] relative">
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50"
        style={{ opacity }}
      >
        <div className="text-center max-w-6xl px-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            파스칼의 삼각형
          </h1>
          <p className="text-2xl text-gray-700 mb-12">
            <span className="font-bold text-pink-600">기하학적 패턴</span>으로 나타난 계수들
          </p>

          {/* Pascal Triangle */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 inline-block">
            {triangle.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-2 mb-2">
                {row.map((value, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg font-bold text-gray-800"
                  >
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="text-lg text-gray-600 mt-8">
            각 행의 합: 2<sup>n</sup> &nbsp;|&nbsp; C(n,r) = C(n-1,r-1) + C(n-1,r)
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Section 4: Transform to Histogram (Binomial Distribution)
function Section4BinomialDistribution({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const n = 20;
  const p = 0.5;

  // Calculate binomial coefficients for row n
  const binomialCoeff = (n: number, k: number): number => {
    if (k > n || k < 0) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 1; i <= k; i++) {
      result = result * (n - i + 1) / i;
    }
    return Math.round(result);
  };

  // Calculate probabilities
  const probs = Array.from({ length: n + 1 }, (_, k) => {
    const coeff = binomialCoeff(n, k);
    const prob = coeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
    return { k, prob, coeff };
  });

  const maxProb = Math.max(...probs.map(p => p.prob));

  return (
    <div className="h-[150vh] relative">
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50"
        style={{ opacity }}
      >
        <div className="text-center max-w-6xl px-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            이항분포 (Binomial Distribution)
          </h1>
          <p className="text-2xl text-gray-700 mb-12">
            계수가 <span className="font-bold text-indigo-600">확률</span>이 됩니다
          </p>

          {/* Histogram */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-end justify-center gap-1 h-64">
              {probs.map((item, i) => (
                <div
                  key={i}
                  className="relative flex-1 max-w-8"
                >
                  <div
                    className="bg-gradient-to-t from-indigo-500 to-blue-400 rounded-t transition-all duration-300"
                    style={{ height: `${(item.prob / maxProb) * 100}%` }}
                  />
                  <div className="absolute -bottom-6 left-0 right-0 text-xs text-gray-600">
                    {i}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-left space-y-2">
              <p className="text-lg">
                <span className="font-bold">시행 횟수 n:</span> {n}
              </p>
              <p className="text-lg">
                <span className="font-bold">성공 확률 p:</span> {p}
              </p>
              <p className="text-sm text-gray-600 mt-4">
                P(X = k) = C(n,k) · p<sup>k</sup> · (1-p)<sup>n-k</sup>
              </p>
            </div>
          </div>

          <motion.p
            className="text-lg text-gray-600 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            종 모양(Bell Curve)이 나타나기 시작합니다
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

// Section 5: Transform to Normal Distribution
function Section5NormalDistribution({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);

  // Generate normal distribution curve
  const points = 100;
  const mean = 0;
  const stdDev = 1;

  const normalDist = (x: number): number => {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
           Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
  };

  const xValues = Array.from({ length: points }, (_, i) => {
    return -4 + (i * 8) / points;
  });

  const yValues = xValues.map(x => normalDist(x));
  const maxY = Math.max(...yValues);

  // Create SVG path
  const svgWidth = 800;
  const svgHeight = 400;
  const padding = 50;

  const scaleX = (x: number) => ((x + 4) / 8) * (svgWidth - 2 * padding) + padding;
  const scaleY = (y: number) => svgHeight - padding - (y / maxY) * (svgHeight - 2 * padding);

  const pathData = xValues.map((x, i) => {
    const px = scaleX(x);
    const py = scaleY(yValues[i]);
    return i === 0 ? `M ${px} ${py}` : `L ${px} ${py}`;
  }).join(' ');

  return (
    <div className="h-[150vh] relative">
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 text-white"
        style={{ opacity }}
      >
        <div className="text-center max-w-6xl px-8">
          <motion.h1 
            className="text-6xl font-bold mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
          >
            정규분포 (Normal Distribution)
          </motion.h1>
          <motion.p 
            className="text-2xl mb-12 text-indigo-200"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            n → ∞ 일 때, <span className="font-bold text-yellow-300">통계의 심장</span>이 됩니다
          </motion.p>

          {/* Normal Curve */}
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <svg width={svgWidth} height={svgHeight} className="mx-auto">
              {/* Axes */}
              <line
                x1={padding}
                y1={svgHeight - padding}
                x2={svgWidth - padding}
                y2={svgHeight - padding}
                stroke="#9ca3af"
                strokeWidth="2"
              />
              <line
                x1={svgWidth / 2}
                y1={padding}
                x2={svgWidth / 2}
                y2={svgHeight - padding}
                stroke="#9ca3af"
                strokeWidth="1"
                strokeDasharray="5,5"
              />

              {/* Fill under curve */}
              <motion.path
                d={`${pathData} L ${scaleX(4)} ${svgHeight - padding} L ${scaleX(-4)} ${svgHeight - padding} Z`}
                fill="url(#gradient)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2, delay: 0.5 }}
              />

              {/* Curve */}
              <motion.path
                d={pathData}
                stroke="#6366f1"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Labels */}
              <text x={svgWidth / 2} y={svgHeight - 20} textAnchor="middle" fill="#4b5563" fontSize="14">
                μ
              </text>
            </svg>

            <div className="mt-8 space-y-3 text-gray-700">
              <p className="text-xl font-bold">
                중심극한정리 (Central Limit Theorem)
              </p>
              <p className="text-sm">
                표본의 크기가 충분히 크면, 표본평균의 분포는 정규분포에 가까워집니다
              </p>
              <p className="text-sm font-mono mt-4">
                f(x) = (1/√(2πσ²)) · e<sup>-(x-μ)²/(2σ²)</sup>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-3 gap-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-4xl font-bold text-yellow-300 mb-2">68%</div>
              <div className="text-sm text-indigo-200">μ ± σ</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-4xl font-bold text-yellow-300 mb-2">95%</div>
              <div className="text-sm text-indigo-200">μ ± 2σ</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-4xl font-bold text-yellow-300 mb-2">99.7%</div>
              <div className="text-sm text-indigo-200">μ ± 3σ</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}