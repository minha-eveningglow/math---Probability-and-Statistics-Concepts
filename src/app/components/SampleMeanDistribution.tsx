import { useState, useMemo } from 'react';

function normalPDF(x: number, mu: number, sigma: number): number {
  const z = (x - mu) / sigma;
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
}

export function SampleMeanDistribution() {
  const [m, setM] = useState(50);
  const [sigma, setSigma] = useState(10);
  const [n, setN] = useState(4);

  const sigmaXbar = sigma / Math.sqrt(n);

  const W = 500;
  const H = 220;
  const PAD = { l: 40, r: 20, t: 20, b: 30 };
  const pw = W - PAD.l - PAD.r;
  const ph = H - PAD.t - PAD.b;

  // x축 범위는 모집단 분포(가장 넓은 경우)를 기준으로 고정
  const xMin = m - 4 * sigma;
  const xMax = m + 4 * sigma;
  // y축 높이는 n=64(가장 뾰족한 경우)의 정점을 기준으로 고정해야
  // n을 키울 때 X̄ 곡선이 실제로 솟아오르는 것이 보인다.
  const sigmaXbarMin = sigma / Math.sqrt(64);
  const yMax = normalPDF(m, m, sigmaXbarMin) * 1.05;

  const toSvg = (x: number, y: number) => ({
    sx: PAD.l + ((x - xMin) / (xMax - xMin)) * pw,
    sy: PAD.t + (1 - Math.min(y, yMax) / yMax) * ph,
  });

  const N = 300;
  const popCurve = useMemo(() => {
    return Array.from({ length: N + 1 }, (_, i) => {
      const x = xMin + (i / N) * (xMax - xMin);
      const y = normalPDF(x, m, sigma);
      const { sx, sy } = toSvg(x, y);
      return `${sx},${sy}`;
    }).join(' ');
  }, [m, sigma, xMin, xMax, yMax]);

  const xbarCurve = useMemo(() => {
    return Array.from({ length: N + 1 }, (_, i) => {
      const x = xMin + (i / N) * (xMax - xMin);
      const y = normalPDF(x, m, sigmaXbar);
      const { sx, sy } = toSvg(x, y);
      return `${sx},${sy}`;
    }).join(' ');
  }, [m, sigmaXbar, xMin, xMax, yMax]);

  const { sx: baseSx1 } = toSvg(xMin, 0);
  const { sx: baseSx2 } = toSvg(xMax, 0);
  const { sy: baseSy } = toSvg(xMin, 0);

  return (
    <div className="space-y-5">
      {/* 파라미터 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">모평균 m = {m}</label>
          <input type="range" min={30} max={70} step={1} value={m}
            onChange={(e) => setM(+e.target.value)}
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">모표준편차 σ = {sigma}</label>
          <input type="range" min={4} max={20} step={1} value={sigma}
            onChange={(e) => setSigma(+e.target.value)}
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">표본의 크기 n = {n}</label>
          <input type="range" min={1} max={64} step={1} value={n}
            onChange={(e) => setN(+e.target.value)}
            className="w-full accent-teal-600"
          />
        </div>
      </div>

      {/* 그래프 */}
      <div className="bg-gray-50 rounded-xl p-3 overflow-x-auto">
        <svg width={W} height={H} className="mx-auto">
          <line x1={baseSx1} y1={baseSy} x2={baseSx2} y2={baseSy} stroke="#9ca3af" strokeWidth={1} />
          <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={baseSy} stroke="#9ca3af" strokeWidth={1} />

          {(() => { const { sx } = toSvg(m, 0); return <line key="sym" x1={sx} y1={PAD.t} x2={sx} y2={baseSy} stroke="#6b7280" strokeWidth={1} strokeDasharray="4 3" />; })()}

          {/* 모집단 분포 X ~ N(m, σ²) : 얇고 넓게 */}
          <polyline points={popCurve} fill="none" stroke="#9ca3af" strokeWidth={2} strokeDasharray="6 4" strokeLinejoin="round" />
          {/* 표본평균 분포 X̄ ~ N(m, σ²/n) : n이 커질수록 뾰족해짐 */}
          <polyline points={xbarCurve} fill="none" stroke="#059669" strokeWidth={2.5} strokeLinejoin="round" />

          <text x={baseSx2 - 4} y={PAD.t + 10} textAnchor="end" fontSize={10} fill="#6b7280">X ~ N(m, σ²)</text>
          <text x={baseSx2 - 4} y={PAD.t + 24} textAnchor="end" fontSize={10} fill="#059669" fontWeight="bold">X̄ ~ N(m, σ²/n)</text>
        </svg>
      </div>

      {/* 결과 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-600 font-semibold">모표준편차 σ(X)</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{sigma.toFixed(2)}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
          <p className="text-xs text-emerald-600 font-semibold">표본평균 표준편차 σ(X̄) = σ/√n</p>
          <p className="text-xl font-bold text-emerald-900 mt-1">{sigmaXbar.toFixed(3)}</p>
        </div>
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-center">
          <p className="text-xs text-teal-600 font-semibold">표본평균의 분포</p>
          <p className="font-mono text-sm font-bold text-teal-900 mt-1">
            N({m}, {(sigma * sigma / n).toFixed(2)})
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">
          <strong>n이 커질수록</strong> 회색 점선(모집단 X의 분포)은 그대로지만,
          초록 실선(표본평균 X̄의 분포)은 <strong>같은 평균 m 주위로 점점 뾰족하게 좁아집니다</strong>.
          표본을 많이 뽑아 평균을 낼수록 그 평균값이 모평균 m에 더 가깝게 몰린다는 뜻입니다.
        </p>
      </div>
    </div>
  );
}
