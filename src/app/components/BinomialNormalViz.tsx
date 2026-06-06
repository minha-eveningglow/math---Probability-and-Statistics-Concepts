import { useState, useMemo } from 'react';

function normalPDF(x: number, mu: number, sigma: number): number {
  const z = (x - mu) / sigma;
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
}

function binomPMF(n: number, p: number, k: number): number {
  if (k < 0 || k > n) return 0;
  // log-space computation to avoid overflow
  let logC = 0;
  for (let i = 0; i < k; i++) logC += Math.log(n - i) - Math.log(i + 1);
  return Math.exp(logC + k * Math.log(p) + (n - k) * Math.log(1 - p));
}

export function BinomialNormalViz() {
  const [n, setN] = useState(30);
  const [p, setP] = useState(0.5);

  const q = 1 - p;
  const mu = n * p;
  const variance = n * p * q;
  const sigma = Math.sqrt(variance);

  const isValid = n * p >= 5 && n * q >= 5;

  const bars = useMemo(() => {
    return Array.from({ length: n + 1 }, (_, k) => ({
      k,
      prob: binomPMF(n, p, k),
    }));
  }, [n, p]);

  const visibleBars = bars.filter((b) => b.prob > 1e-6);
  const kMin = visibleBars[0]?.k ?? 0;
  const kMax = visibleBars[visibleBars.length - 1]?.k ?? n;
  const maxProb = Math.max(...bars.map((b) => b.prob));

  const W = 500;
  const H = 220;
  const PAD = { l: 40, r: 20, t: 20, b: 35 };
  const pw = W - PAD.l - PAD.r;
  const ph = H - PAD.t - PAD.b;

  const xRange = kMax - kMin + 2;
  const yMax = maxProb * 1.2;

  const toSvgX = (k: number) => PAD.l + ((k - kMin + 0.5) / xRange) * pw;
  const toSvgY = (prob: number) => PAD.t + (1 - prob / yMax) * ph;
  const barW = (pw / xRange) * 0.85;
  const baseSy = toSvgY(0);

  // Normal curve (continuous approximation)
  const curvePts = useMemo(() => {
    const pts: string[] = [];
    const steps = 300;
    for (let i = 0; i <= steps; i++) {
      const x = kMin - 1 + (i / steps) * (kRange() + 2);
      const y = normalPDF(x, mu, sigma);
      const sx = PAD.l + ((x - kMin + 0.5) / xRange) * pw;
      const sy = toSvgY(y);
      pts.push(`${sx},${sy}`);
    }
    return pts.join(' ');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mu, sigma, kMin, kMax, xRange]);

  function kRange() { return kMax - kMin + 1; }

  const xTicks = [kMin, Math.round(mu), kMax].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="space-y-5">
      {/* 파라미터 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            시행 횟수 n = {n}
          </label>
          <input type="range" min={10} max={100} step={5} value={n}
            onChange={(e) => setN(+e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            성공 확률 p = {p.toFixed(2)}
          </label>
          <input type="range" min={0.1} max={0.9} step={0.05} value={p}
            onChange={(e) => setP(+e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>
      </div>

      {/* 근사 조건 배지 */}
      <div className={`rounded-lg p-3 border text-sm font-medium ${
        isValid
          ? 'bg-green-50 border-green-300 text-green-800'
          : 'bg-red-50 border-red-300 text-red-800'
      }`}>
        {isValid
          ? `✓ 근사 조건 충족: np = ${(n * p).toFixed(1)} ≥ 5, nq = ${(n * q).toFixed(1)} ≥ 5`
          : `✗ 근사 조건 미충족: np = ${(n * p).toFixed(1)}, nq = ${(n * q).toFixed(1)} (둘 다 5 이상이어야 함)`}
      </div>

      {/* 그래프 */}
      <div className="bg-gray-50 rounded-xl p-3 overflow-x-auto">
        <svg width={W} height={H} className="mx-auto">
          <line x1={PAD.l} y1={baseSy} x2={PAD.l + pw} y2={baseSy} stroke="#9ca3af" strokeWidth={1} />
          <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={baseSy} stroke="#9ca3af" strokeWidth={1} />

          {xTicks.map((t) => {
            const sx = toSvgX(t);
            return (
              <g key={t}>
                <line x1={sx} y1={baseSy} x2={sx} y2={baseSy + 4} stroke="#9ca3af" strokeWidth={1} />
                <text x={sx} y={baseSy + 14} textAnchor="middle" fontSize={9} fill="#6b7280">{t}</text>
              </g>
            );
          })}

          {/* 이항분포 막대 */}
          {visibleBars.map(({ k, prob }) => {
            const sx = toSvgX(k);
            const sy = toSvgY(prob);
            return (
              <rect
                key={k}
                x={sx - barW / 2}
                y={sy}
                width={barW}
                height={baseSy - sy}
                fill="#3b82f6"
                fillOpacity={0.6}
                stroke="#2563eb"
                strokeWidth={0.5}
              />
            );
          })}

          {/* 정규분포 곡선 */}
          {isValid && (
            <polyline points={curvePts} fill="none" stroke="#dc2626" strokeWidth={2.5} strokeLinejoin="round" />
          )}
        </svg>
      </div>

      {/* 범례 */}
      <div className="flex gap-4 text-xs text-gray-600 justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 bg-blue-400 rounded-sm opacity-70" />
          이항분포 B(n, p)
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5 bg-red-600" />
          정규근사 N(np, npq)
        </div>
      </div>

      {/* 통계량 */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'μ = np', val: mu.toFixed(2), color: 'blue' },
          { label: 'σ² = npq', val: variance.toFixed(2), color: 'purple' },
          { label: 'σ = √(npq)', val: sigma.toFixed(3), color: 'indigo' },
        ].map(({ label, val, color }) => (
          <div key={label} className={`bg-${color}-50 border border-${color}-200 rounded-xl p-3 text-center`}>
            <p className={`text-xs text-${color}-600 font-semibold`}>{label}</p>
            <p className={`text-xl font-bold text-${color}-900 mt-0.5`}>{val}</p>
          </div>
        ))}
      </div>

      {/* 핵심 공식 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-900">
        <p className="font-bold mb-2">근사 공식</p>
        <p className="font-mono">B({n}, {p.toFixed(2)}) ≈ N({mu.toFixed(1)}, {sigma.toFixed(2)}²)</p>
        <p className="text-xs text-yellow-700 mt-1">n이 클수록 막대 분포가 종 모양 곡선에 더 잘 맞습니다.</p>
      </div>
    </div>
  );
}
