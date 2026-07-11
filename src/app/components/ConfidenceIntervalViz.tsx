import { useState, useMemo } from 'react';

// z값별 신뢰도 상수 (95%: 1.96, 99%: 2.58)
const Z_TABLE = { 95: 1.96, 99: 2.58 } as const;

function normalPDF(x: number, mu: number, sigma: number): number {
  const z = (x - mu) / sigma;
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
}

// 시드 기반 유사난수 (정규분포, Box-Muller)
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ConfidenceIntervalViz() {
  const [m] = useState(100); // 실제 모평균 (숨겨진 진실)
  const [sigma, setSigma] = useState(10);
  const [n, setN] = useState(25);
  const [level, setLevel] = useState<95 | 99>(95);
  const [trial, setTrial] = useState(0);

  const z = Z_TABLE[level];
  const se = sigma / Math.sqrt(n); // σ(X̄)
  const margin = z * se;

  // trial이 바뀔 때마다 20개의 표본평균을 뽑아 신뢰구간을 계산 (데모용 시뮬레이션)
  const samples = useMemo(() => {
    const rand = mulberry32(1000 + trial * 97 + n * 7 + Math.round(sigma * 3));
    const K = 20;
    return Array.from({ length: K }, () => {
      // 표본평균 X̄ ~ N(m, σ²/n) 에서 직접 표본추출 (Box-Muller)
      const u1 = rand() || 1e-6;
      const u2 = rand();
      const zStd = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const xbar = m + zStd * se;
      const lo = xbar - margin;
      const hi = xbar + margin;
      const covers = lo <= m && m <= hi;
      return { xbar, lo, hi, covers };
    });
  }, [trial, n, sigma, se, margin, m]);

  const coverCount = samples.filter((s) => s.covers).length;

  const W = 520;
  const H = 260;
  const PAD = { l: 50, r: 20, t: 10, b: 20 };
  const pw = W - PAD.l - PAD.r;
  const rowH = (H - PAD.t - PAD.b) / samples.length;

  const xMin = m - 4 * se - margin;
  const xMax = m + 4 * se + margin;
  const toX = (v: number) => PAD.l + ((v - xMin) / (xMax - xMin)) * pw;

  return (
    <div className="space-y-5">
      {/* 파라미터 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">모표준편차 σ = {sigma}</label>
          <input type="range" min={4} max={20} step={1} value={sigma}
            onChange={(e) => setSigma(+e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">표본의 크기 n = {n}</label>
          <input type="range" min={4} max={100} step={1} value={n}
            onChange={(e) => setN(+e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">신뢰도</label>
          <div className="flex gap-2">
            {([95, 99] as const).map((lv) => (
              <button
                key={lv}
                onClick={() => setLevel(lv)}
                className={`flex-1 rounded-lg py-1.5 text-sm font-semibold border transition-colors ${
                  level === lv
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
                }`}
              >
                {lv}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 공식 결과 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
          <p className="text-xs text-blue-600 font-semibold">σ(X̄) = σ/√n</p>
          <p className="text-xl font-bold text-blue-900 mt-1">{se.toFixed(3)}</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-center">
          <p className="text-xs text-indigo-600 font-semibold">오차범위 z·σ(X̄)</p>
          <p className="text-xl font-bold text-indigo-900 mt-1">±{margin.toFixed(3)}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
          <p className="text-xs text-purple-600 font-semibold">신뢰구간의 길이</p>
          <p className="text-xl font-bold text-purple-900 mt-1">{(2 * margin).toFixed(3)}</p>
        </div>
      </div>

      {/* 시뮬레이션 */}
      <div className="bg-gray-50 rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-700">
            표본을 20번 뽑아 신뢰구간 20개를 만들어보면?
          </p>
          <button
            onClick={() => setTrial((t) => t + 1)}
            className="px-3 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            다시 뽑기 🔁
          </button>
        </div>
        <svg width={W} height={H} className="mx-auto block">
          {/* 실제 모평균 m 위치의 세로선 */}
          <line x1={toX(m)} y1={0} x2={toX(m)} y2={H} stroke="#111827" strokeWidth={1.5} strokeDasharray="5 3" />
          <text x={toX(m)} y={12} textAnchor="middle" fontSize={11} fontWeight="bold" fill="#111827">m (모평균)</text>

          {samples.map((s, i) => {
            const cy = PAD.t + i * rowH + rowH / 2 + 8;
            const color = s.covers ? '#059669' : '#dc2626';
            return (
              <g key={i}>
                <line x1={toX(s.lo)} y1={cy} x2={toX(s.hi)} y2={cy} stroke={color} strokeWidth={2.5} />
                <circle cx={toX(s.xbar)} cy={cy} r={2.5} fill={color} />
              </g>
            );
          })}
        </svg>
        <p className="text-sm mt-2">
          <span className="text-emerald-700 font-semibold">초록색 = 모평균 m을 포함한 구간</span>
          {' · '}
          <span className="text-red-600 font-semibold">빨간색 = 포함하지 못한 구간</span>
          {' · '}
          이번 시도에서 <strong>{coverCount} / {samples.length}</strong>개가 m을 포함했습니다.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">
          신뢰도 {level}%의 의미는 <strong>"이 구간 하나가 95% 확률로 맞다"</strong>는 뜻이 아니라,
          이런 방식으로 표본을 <strong>여러 번 뽑아 신뢰구간을 반복해서 만들면, 그 중 약 {level}%가
          실제 모평균 m을 포함</strong>한다는 뜻입니다. "다시 뽑기"를 여러 번 눌러 확인해보세요.
        </p>
      </div>
    </div>
  );
}
