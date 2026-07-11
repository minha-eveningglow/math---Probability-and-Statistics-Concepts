import { useState, useCallback, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line, ComposedChart } from 'recharts';

type PopShape = 'uniform' | 'exponential' | 'bimodal';

const SHAPES: { key: PopShape; label: string; desc: string }[] = [
  { key: 'uniform', label: '균등분포', desc: '[0, 1] 위에서 평평한 모양' },
  { key: 'exponential', label: '지수분포', desc: '한쪽으로 크게 치우친(왼쪽에 몰린) 모양' },
  { key: 'bimodal', label: '쌍봉분포', desc: '두 개의 봉우리를 가진 정규분포와 전혀 다른 모양' },
];

// 모집단에서 하나의 값을 뽑는다 (형태별로 다른 분포)
function drawFromPopulation(shape: PopShape): number {
  switch (shape) {
    case 'uniform':
      return Math.random();
    case 'exponential':
      return -Math.log(1 - Math.random()) / 2; // λ=2 지수분포
    case 'bimodal':
      return Math.random() < 0.5 ? 0.2 + 0.08 * gaussianLike() : 0.8 + 0.08 * gaussianLike();
  }
}

// Irwin-Hall 근사로 대략적인 표준정규 형태 노이즈 생성 (모집단 자체가 아니라 쌍봉 흩어짐용)
function gaussianLike(): number {
  let s = 0;
  for (let i = 0; i < 6; i++) s += Math.random();
  return s - 3;
}

function popMoments(shape: PopShape): { mean: number; sd: number } {
  // 대략적인 이론값 (교육용 근사치)
  switch (shape) {
    case 'uniform':
      return { mean: 0.5, sd: Math.sqrt(1 / 12) };
    case 'exponential':
      return { mean: 0.5, sd: 0.5 };
    case 'bimodal':
      return { mean: 0.5, sd: 0.32 };
  }
}

function makeHistogram(values: number[], binCount: number, lo: number, hi: number) {
  const width = (hi - lo) / binCount;
  const bins = Array.from({ length: binCount }, (_, i) => ({
    x: lo + (i + 0.5) * width,
    count: 0,
  }));
  for (const v of values) {
    const idx = Math.min(binCount - 1, Math.max(0, Math.floor((v - lo) / width)));
    bins[idx].count++;
  }
  return bins;
}

function normalPDF(x: number, mu: number, sigma: number): number {
  if (sigma <= 0) return 0;
  const z = (x - mu) / sigma;
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
}

export function CentralLimitTheoremViz() {
  const [shape, setShape] = useState<PopShape>('exponential');
  const [n, setN] = useState(1);
  const [trials, setTrials] = useState(2000);
  const [runKey, setRunKey] = useState(0);
  const [data, setData] = useState<{ x: number; count: number; normalRef: number }[] | null>(null);

  const { mean: popMean, sd: popSd } = popMoments(shape);
  const sigmaXbar = popSd / Math.sqrt(n);

  const run = useCallback(() => {
    const xbars: number[] = [];
    for (let t = 0; t < trials; t++) {
      let sum = 0;
      for (let i = 0; i < n; i++) sum += drawFromPopulation(shape);
      xbars.push(sum / n);
    }

    const lo = Math.max(0, popMean - 4 * sigmaXbar);
    const hi = popMean + 4 * sigmaXbar;
    const binCount = 30;
    const hist = makeHistogram(xbars, binCount, lo, hi);
    const binWidth = (hi - lo) / binCount;

    const withRef = hist.map((b) => ({
      x: b.x,
      count: b.count,
      // 이론적 정규분포 곡선을 같은 스케일(도수)로 겹쳐 그리기 위한 기준선
      normalRef: normalPDF(b.x, popMean, sigmaXbar) * trials * binWidth,
    }));

    setData(withRef);
    setRunKey((k) => k + 1);
  }, [shape, n, trials, popMean, sigmaXbar]);

  const currentShapeInfo = SHAPES.find((s) => s.key === shape)!;

  return (
    <div className="space-y-5">
      {/* 파라미터 */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">모집단의 분포 모양</label>
          <div className="flex gap-2">
            {SHAPES.map((s) => (
              <button
                key={s.key}
                onClick={() => { setShape(s.key); setData(null); }}
                className={`flex-1 rounded-lg py-1.5 text-xs font-semibold border transition-colors ${
                  shape === s.key
                    ? 'bg-fuchsia-600 text-white border-fuchsia-600'
                    : 'bg-white text-fuchsia-700 border-fuchsia-200 hover:bg-fuchsia-50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">{currentShapeInfo.desc}</p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">표본의 크기 n = {n}</label>
          <input type="range" min={1} max={50} step={1} value={n}
            onChange={(e) => { setN(+e.target.value); setData(null); }}
            className="w-full accent-fuchsia-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            표본추출 반복 횟수 = {trials.toLocaleString()}회
          </label>
          <input type="range" min={200} max={5000} step={200} value={trials}
            onChange={(e) => { setTrials(+e.target.value); setData(null); }}
            className="w-full accent-fuchsia-600"
          />
        </div>
      </div>

      <button
        onClick={run}
        className="px-6 py-2 bg-fuchsia-600 text-white rounded-lg font-semibold hover:bg-fuchsia-700 transition-colors"
      >
        표본추출 {trials.toLocaleString()}번 반복해서 X̄ 히스토그램 그리기 ▶
      </button>

      {data ? (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-xs text-gray-500 mb-2">
            회색 막대: {trials.toLocaleString()}개의 표본평균 X̄를 계산해 만든 히스토그램 &nbsp;|&nbsp;
            빨간 곡선: 이론값 N({popMean.toFixed(2)}, {(sigmaXbar * sigmaXbar).toFixed(4)})
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart key={runKey} data={data} margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={(v) => v.toFixed(2)}
                label={{ value: '표본평균 x̄', position: 'insideBottom', offset: -10 }}
              />
              <YAxis label={{ value: '도수', angle: -90, position: 'insideLeft' }} />
              <Bar dataKey="count" fill="#a1a1aa" isAnimationActive={false} />
              <Line
                dataKey="normalRef"
                stroke="#dc2626"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
          버튼을 눌러 시뮬레이션을 시작하세요
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">
          <strong>n = 1일 때</strong>는 히스토그램이 모집단({currentShapeInfo.label}) 모양 그대로입니다 —
          정규분포와 전혀 다르게 생겼을 수 있습니다. 그런데 <strong>n을 5, 10, 30, 50으로 키우면서
          다시 그려보면</strong>, 모집단이 어떤 모양이었든 상관없이 히스토그램이 빨간 정규분포
          곡선에 점점 가까워지는 것을 볼 수 있습니다. 이것이{' '}
          <strong>중심극한정리(Central Limit Theorem)</strong>입니다 — 모집단의 분포 모양과
          무관하게, 표본의 크기 n이 충분히 크면 표본평균 X̄는 근사적으로 정규분포
          N(m, σ²/n)을 따릅니다.
        </p>
      </div>
    </div>
  );
}
