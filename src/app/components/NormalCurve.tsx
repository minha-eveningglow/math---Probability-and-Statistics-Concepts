import { useState, useMemo } from 'react';

function normalPDF(x: number, mu: number, sigma: number): number {
  const z = (x - mu) / sigma;
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
}

function integrate(fn: (x: number) => number, lo: number, hi: number, steps = 2000): number {
  const dx = (hi - lo) / steps;
  let s = 0;
  for (let i = 0; i < steps; i++) s += fn(lo + (i + 0.5) * dx) * dx;
  return s;
}

export function NormalCurve() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [lo, setLo] = useState(-1);
  const [hi, setHi] = useState(1);

  const xMin = mu - 4 * sigma;
  const xMax = mu + 4 * sigma;

  const W = 500;
  const H = 200;
  const PAD = { l: 40, r: 20, t: 20, b: 30 };
  const pw = W - PAD.l - PAD.r;
  const ph = H - PAD.t - PAD.b;

  const yMax = normalPDF(mu, mu, sigma) * 1.15;

  const toSvg = (x: number, y: number) => ({
    sx: PAD.l + ((x - xMin) / (xMax - xMin)) * pw,
    sy: PAD.t + (1 - y / yMax) * ph,
  });

  const { sx: baseSx1 } = toSvg(xMin, 0);
  const { sx: baseSx2 } = toSvg(xMax, 0);
  const { sy: baseSy } = toSvg(xMin, 0);

  const N = 300;
  const curve = useMemo(() => {
    return Array.from({ length: N + 1 }, (_, i) => {
      const x = xMin + (i / N) * (xMax - xMin);
      const y = normalPDF(x, mu, sigma);
      const { sx, sy } = toSvg(x, y);
      return `${sx},${sy}`;
    }).join(' ');
  }, [mu, sigma, xMin, xMax]);

  const shadeLo = Math.max(lo, xMin + 0.01);
  const shadeHi = Math.min(hi, xMax - 0.01);
  const shadePolygon = useMemo(() => {
    if (shadeLo >= shadeHi) return '';
    const pts: string[] = [];
    const { sx: slx } = toSvg(shadeLo, 0);
    pts.push(`${slx},${baseSy}`);
    for (let i = 0; i <= 200; i++) {
      const x = shadeLo + (i / 200) * (shadeHi - shadeLo);
      const y = normalPDF(x, mu, sigma);
      const { sx, sy } = toSvg(x, y);
      pts.push(`${sx},${sy}`);
    }
    const { sx: shx } = toSvg(shadeHi, 0);
    pts.push(`${shx},${baseSy}`);
    return pts.join(' ');
  }, [shadeLo, shadeHi, mu, sigma, baseSy]);

  const prob = useMemo(() => {
    if (shadeLo >= shadeHi) return 0;
    return integrate((x) => normalPDF(x, mu, sigma), shadeLo, shadeHi);
  }, [shadeLo, shadeHi, mu, sigma]);

  const zLo = ((lo - mu) / sigma).toFixed(2);
  const zHi = ((hi - mu) / sigma).toFixed(2);

  const xTicks = [mu - 2 * sigma, mu - sigma, mu, mu + sigma, mu + 2 * sigma];

  return (
    <div className="space-y-5">
      {/* 파라미터 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            평균 μ = {mu}
          </label>
          <input type="range" min={-5} max={5} step={0.5} value={mu}
            onChange={(e) => {
              const newMu = +e.target.value;
              setMu(newMu);
              setLo(newMu - sigma);
              setHi(newMu + sigma);
            }}
            className="w-full accent-indigo-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            표준편차 σ = {sigma}
          </label>
          <input type="range" min={0.5} max={3} step={0.5} value={sigma}
            onChange={(e) => {
              const s = +e.target.value;
              setSigma(s);
              setLo(mu - s);
              setHi(mu + s);
            }}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      {/* 구간 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            구간 하한 = {lo.toFixed(1)}  (Z = {zLo})
          </label>
          <input type="range" min={mu - 4 * sigma} max={mu + 4 * sigma} step={0.1} value={lo}
            onChange={(e) => setLo(Math.min(+e.target.value, hi - 0.1))}
            className="w-full accent-purple-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            구간 상한 = {hi.toFixed(1)}  (Z = {zHi})
          </label>
          <input type="range" min={mu - 4 * sigma} max={mu + 4 * sigma} step={0.1} value={hi}
            onChange={(e) => setHi(Math.max(+e.target.value, lo + 0.1))}
            className="w-full accent-purple-600"
          />
        </div>
      </div>

      {/* 그래프 */}
      <div className="bg-gray-50 rounded-xl p-3 overflow-x-auto">
        <svg width={W} height={H} className="mx-auto">
          <line x1={baseSx1} y1={baseSy} x2={baseSx2} y2={baseSy} stroke="#9ca3af" strokeWidth={1} />
          <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={baseSy} stroke="#9ca3af" strokeWidth={1} />

          {xTicks.map((t) => {
            const { sx } = toSvg(t, 0);
            const label = t === mu ? 'μ' : t === mu + sigma ? 'μ+σ' : t === mu - sigma ? 'μ−σ'
              : t === mu + 2 * sigma ? 'μ+2σ' : 'μ−2σ';
            return (
              <g key={t}>
                <line x1={sx} y1={baseSy} x2={sx} y2={baseSy + 4} stroke="#9ca3af" strokeWidth={1} />
                <text x={sx} y={baseSy + 14} textAnchor="middle" fontSize={9} fill="#6b7280">{label}</text>
              </g>
            );
          })}

          {/* 대칭축 */}
          {(() => { const { sx } = toSvg(mu, 0); return <line key="sym" x1={sx} y1={PAD.t} x2={sx} y2={baseSy} stroke="#6366f1" strokeWidth={1} strokeDasharray="5 3" />; })()}

          {shadePolygon && <polygon points={shadePolygon} fill="#6366f1" fillOpacity={0.3} />}
          <polyline points={curve} fill="none" stroke="#4f46e5" strokeWidth={2.5} strokeLinejoin="round" />
        </svg>
      </div>

      {/* 결과 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-center">
          <p className="text-xs text-indigo-600 font-semibold">P({lo.toFixed(1)} ≤ X ≤ {hi.toFixed(1)})</p>
          <p className="text-2xl font-bold text-indigo-900 mt-1">{prob.toFixed(4)}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
          <p className="text-xs text-purple-600 font-semibold">표준화 Z</p>
          <p className="font-mono text-sm font-bold text-purple-900 mt-1">[{zLo}, {zHi}]</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-600 font-semibold">분포</p>
          <p className="font-mono text-sm font-bold text-gray-900 mt-1">N({mu}, {sigma}²)</p>
        </div>
      </div>

      {/* 주요 비율 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm font-bold text-amber-900 mb-2">정규분포의 경험 법칙 (68-95-99.7)</p>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          {[
            { range: 'μ±σ', pct: '≈ 68.3%' },
            { range: 'μ±2σ', pct: '≈ 95.4%' },
            { range: 'μ±3σ', pct: '≈ 99.7%' },
          ].map((r) => (
            <div key={r.range} className="bg-white rounded-lg p-2 border border-amber-200">
              <p className="font-mono font-semibold text-amber-800">{r.range}</p>
              <p className="text-amber-700">{r.pct}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
