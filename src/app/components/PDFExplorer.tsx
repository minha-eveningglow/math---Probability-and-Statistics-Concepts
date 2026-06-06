import { useState, useMemo } from 'react';

type FuncType = 'linear' | 'quadratic' | 'uniform';

interface Config {
  type: FuncType;
  label: string;
  formula: string;
  a: number;
  b: number;
  fn: (x: number, a: number, b: number) => number;
  range: [number, number];
}

const CONFIGS: Config[] = [
  {
    type: 'uniform',
    label: '균등분포 f(x) = 1/(b−a)',
    formula: 'f(x) = 1 / (b−a)',
    a: 0,
    b: 4,
    fn: (_x, a, b) => 1 / (b - a),
    range: [0, 4],
  },
  {
    type: 'linear',
    label: '선형 f(x) = (2/b²)x',
    formula: 'f(x) = (2/b²)x',
    a: 0,
    b: 3,
    fn: (x, _a, b) => (2 / (b * b)) * x,
    range: [0, 3],
  },
  {
    type: 'quadratic',
    label: '이차 f(x) = (3/8)x²',
    formula: 'f(x) = (3/8)x²',
    a: 0,
    b: 2,
    fn: (x) => (3 / 8) * x * x,
    range: [0, 2],
  },
];

function integrate(fn: (x: number) => number, lo: number, hi: number, steps = 1000): number {
  const dx = (hi - lo) / steps;
  let s = 0;
  for (let i = 0; i < steps; i++) {
    s += fn(lo + (i + 0.5) * dx) * dx;
  }
  return s;
}

export function PDFExplorer() {
  const [cfgIdx, setCfgIdx] = useState(0);
  const cfg = CONFIGS[cfgIdx];
  const [lo, setLo] = useState(cfg.range[0]);
  const [hi, setHi] = useState(cfg.range[1]);

  const W = 480;
  const H = 200;
  const PAD = { l: 40, r: 20, t: 20, b: 30 };
  const pw = W - PAD.l - PAD.r;
  const ph = H - PAD.t - PAD.b;

  const { xMin, xMax, yMax, points } = useMemo(() => {
    const [xMin, xMax] = cfg.range;
    const pts: { x: number; y: number }[] = [];
    const N = 200;
    let yMax = 0;
    for (let i = 0; i <= N; i++) {
      const x = xMin + (i / N) * (xMax - xMin);
      const y = cfg.fn(x, cfg.a, cfg.b);
      if (y > yMax) yMax = y;
      pts.push({ x, y });
    }
    return { xMin, xMax, yMax: yMax * 1.2 || 1, points: pts };
  }, [cfg]);

  const toSvg = (x: number, y: number) => ({
    sx: PAD.l + ((x - xMin) / (xMax - xMin)) * pw,
    sy: PAD.t + (1 - y / yMax) * ph,
  });

  const polyline = points.map((p) => {
    const { sx, sy } = toSvg(p.x, p.y);
    return `${sx},${sy}`;
  }).join(' ');

  const shadeLo = Math.max(lo, xMin);
  const shadeHi = Math.min(hi, xMax);
  const shadePoints = (() => {
    if (shadeLo >= shadeHi) return '';
    const N = 100;
    const pts: string[] = [];
    const { sx: slx, sy: bsy } = toSvg(shadeLo, 0);
    pts.push(`${slx},${bsy}`);
    for (let i = 0; i <= N; i++) {
      const x = shadeLo + (i / N) * (shadeHi - shadeLo);
      const y = cfg.fn(x, cfg.a, cfg.b);
      const { sx, sy } = toSvg(x, y);
      pts.push(`${sx},${sy}`);
    }
    const { sx: shx, sy: bsy2 } = toSvg(shadeHi, 0);
    pts.push(`${shx},${bsy2}`);
    return pts.join(' ');
  })();

  const prob = useMemo(() => {
    const l = Math.max(lo, xMin);
    const h = Math.min(hi, xMax);
    if (l >= h) return 0;
    return integrate((x) => cfg.fn(x, cfg.a, cfg.b), l, h);
  }, [lo, hi, cfg]);

  const handleCfgChange = (idx: number) => {
    setCfgIdx(idx);
    setLo(CONFIGS[idx].range[0]);
    setHi(CONFIGS[idx].range[1]);
  };

  const { sy: baseSy } = toSvg(xMin, 0);
  const xTicks = [xMin, (xMin + xMax) / 2, xMax];

  return (
    <div className="space-y-5">
      {/* 함수 선택 */}
      <div className="flex flex-wrap gap-2">
        {CONFIGS.map((c, i) => (
          <button
            key={c.type}
            onClick={() => handleCfgChange(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              cfgIdx === i
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 구간 슬라이더 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            하한 a = {lo.toFixed(2)}
          </label>
          <input
            type="range"
            min={cfg.range[0]}
            max={cfg.range[1]}
            step={0.05}
            value={lo}
            onChange={(e) => setLo(Math.min(+e.target.value, hi - 0.05))}
            className="w-full accent-teal-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            상한 b = {hi.toFixed(2)}
          </label>
          <input
            type="range"
            min={cfg.range[0]}
            max={cfg.range[1]}
            step={0.05}
            value={hi}
            onChange={(e) => setHi(Math.max(+e.target.value, lo + 0.05))}
            className="w-full accent-teal-600"
          />
        </div>
      </div>

      {/* SVG 그래프 */}
      <div className="bg-gray-50 rounded-xl p-3 overflow-x-auto">
        <svg width={W} height={H} className="mx-auto">
          {/* 축 */}
          <line x1={PAD.l} y1={baseSy} x2={PAD.l + pw} y2={baseSy} stroke="#9ca3af" strokeWidth={1} />
          <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={baseSy} stroke="#9ca3af" strokeWidth={1} />

          {/* x 눈금 */}
          {xTicks.map((t) => {
            const { sx } = toSvg(t, 0);
            return (
              <g key={t}>
                <line x1={sx} y1={baseSy} x2={sx} y2={baseSy + 4} stroke="#9ca3af" strokeWidth={1} />
                <text x={sx} y={baseSy + 14} textAnchor="middle" fontSize={10} fill="#6b7280">
                  {t}
                </text>
              </g>
            );
          })}

          {/* 음영 */}
          {shadePoints && (
            <polygon points={shadePoints} fill="#14b8a6" fillOpacity={0.3} />
          )}

          {/* 곡선 */}
          <polyline points={polyline} fill="none" stroke="#0d9488" strokeWidth={2.5} strokeLinejoin="round" />

          {/* 구간 경계선 */}
          {[lo, hi].map((v) => {
            const { sx, sy } = toSvg(v, cfg.fn(v, cfg.a, cfg.b));
            return (
              <line key={v} x1={sx} y1={sy} x2={sx} y2={baseSy} stroke="#0d9488" strokeWidth={1.5} strokeDasharray="4 3" />
            );
          })}
        </svg>
      </div>

      {/* 결과 카드 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
          <p className="text-xs text-teal-600 font-semibold mb-1">P({lo.toFixed(2)} ≤ X ≤ {hi.toFixed(2)})</p>
          <p className="text-3xl font-bold text-teal-900">{prob.toFixed(4)}</p>
          <p className="text-xs text-gray-500 mt-1">= 음영 넓이</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 font-semibold mb-1">현재 확률밀도함수</p>
          <p className="font-mono font-bold text-gray-900">{cfg.formula}</p>
          <p className="text-xs text-gray-400 mt-1">정의역: [{cfg.range[0]}, {cfg.range[1]}]</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
        <strong>핵심:</strong> 슬라이더로 구간을 바꾸면 음영 넓이(= 확률)가 바뀝니다.
        한 점의 확률 P(X = c) = 0 임을 확인하려면 상한 = 하한으로 맞춰보세요.
      </div>
    </div>
  );
}
