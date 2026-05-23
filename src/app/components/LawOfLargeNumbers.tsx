import { useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface SimPoint { n: number; ratio: number }

function simulateCoin(n: number, p: number): SimPoint[] {
  const points: SimPoint[] = [];
  let heads = 0;
  for (let i = 1; i <= n; i++) {
    if (Math.random() < p) heads++;
    if (i <= 20 || i % Math.max(1, Math.floor(n / 200)) === 0 || i === n) {
      points.push({ n: i, ratio: heads / i });
    }
  }
  return points;
}

export function LawOfLargeNumbers() {
  const [p, setP] = useState(0.5);
  const [n, setN] = useState(500);
  const [trials, setTrials] = useState<SimPoint[][]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const run = useCallback(() => {
    setIsRunning(true);
    const newTrials: SimPoint[][] = [];
    for (let t = 0; t < 3; t++) {
      newTrials.push(simulateCoin(n, p));
    }
    setTrials(newTrials);
    setIsRunning(false);
  }, [n, p]);

  const colors = ['#6366f1', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-5">
      {/* 파라미터 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            수학적 확률 p: <span className="font-bold text-indigo-600">{p.toFixed(2)}</span>
          </label>
          <input
            type="range" min="0.1" max="0.9" step="0.05"
            value={p}
            onChange={(e) => { setP(Number(e.target.value)); setTrials([]); }}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            예) 동전 앞면 p=0.5, 주사위 1의 눈 p=0.167
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            시행 횟수 n: <span className="font-bold text-indigo-600">{n}</span>
          </label>
          <input
            type="range" min="50" max="2000" step="50"
            value={n}
            onChange={(e) => { setN(Number(e.target.value)); setTrials([]); }}
            className="w-full"
          />
        </div>
      </div>

      <button
        onClick={run}
        disabled={isRunning}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {isRunning ? '시뮬레이션 중...' : '시뮬레이션 실행 (3회 반복)'}
      </button>

      {trials.length > 0 && (
        <>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-500 mb-3">
              세로축: 통계적 확률 X/n &nbsp;|&nbsp; 노란 점선: 수학적 확률 p = {p.toFixed(2)}
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="n"
                  type="number"
                  domain={[1, n]}
                  label={{ value: '시행 횟수 n', position: 'insideBottom', offset: -10 }}
                />
                <YAxis
                  domain={[0, 1]}
                  tickFormatter={(v) => v.toFixed(2)}
                  label={{ value: 'X/n', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  formatter={(v: number) => v.toFixed(4)}
                  labelFormatter={(l) => `n = ${l}`}
                />
                <ReferenceLine y={p} stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
                {trials.map((data, i) => (
                  <Line
                    key={i}
                    data={data}
                    type="monotone"
                    dataKey="ratio"
                    stroke={colors[i]}
                    dot={false}
                    strokeWidth={1.5}
                    name={`시행 ${i + 1}`}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900 font-semibold mb-1">관찰 포인트</p>
            <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
              <li>초반에는 3개의 선이 크게 흔들리다가</li>
              <li>n이 커질수록 모두 p = {p.toFixed(2)} 근방으로 수렴합니다</li>
              <li>이것이 바로 <strong>큰수의 법칙</strong>입니다</li>
            </ul>
          </div>
        </>
      )}

      {trials.length === 0 && (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
          버튼을 눌러 시뮬레이션을 시작하세요
        </div>
      )}
    </div>
  );
}
