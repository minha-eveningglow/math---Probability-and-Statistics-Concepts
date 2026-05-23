import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

type PMFRow = { x: number; p: number };

const PRESETS = {
  coin2: {
    label: '동전 2번 (앞면 횟수)',
    rows: [
      { x: 0, p: 1 / 4 },
      { x: 1, p: 2 / 4 },
      { x: 2, p: 1 / 4 },
    ],
  },
  dice1: {
    label: '주사위 1번 (눈의 수)',
    rows: [1, 2, 3, 4, 5, 6].map((x) => ({ x, p: 1 / 6 })),
  },
  custom: {
    label: '직접 입력',
    rows: [
      { x: 1, p: 0.5 },
      { x: 2, p: 0.25 },
      { x: 3, p: 0.25 },
    ],
  },
};

type PresetKey = keyof typeof PRESETS;

function calcStats(rows: PMFRow[]) {
  const total = rows.reduce((s, r) => s + r.p, 0);
  const mean = rows.reduce((s, r) => s + r.x * r.p, 0);
  const e2 = rows.reduce((s, r) => s + r.x * r.x * r.p, 0);
  const variance = e2 - mean * mean;
  const sd = Math.sqrt(variance);
  return { total, mean, variance, sd };
}

export function PMFChart() {
  const [preset, setPreset] = useState<PresetKey>('coin2');
  const [rows, setRows] = useState<PMFRow[]>(PRESETS.coin2.rows);

  const stats = calcStats(rows);
  const isValid = Math.abs(stats.total - 1) < 0.001;

  function handlePreset(key: PresetKey) {
    setPreset(key);
    setRows([...PRESETS[key].rows]);
  }

  function updateP(i: number, val: string) {
    const updated = rows.map((r, idx) => (idx === i ? { ...r, p: parseFloat(val) || 0 } : r));
    setRows(updated);
  }

  const chartData = rows.map((r) => ({ name: String(r.x), p: r.p }));
  const maxP = Math.max(...rows.map((r) => r.p));

  return (
    <div className="space-y-6">
      {/* 프리셋 선택 */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
          <button
            key={key}
            onClick={() => handlePreset(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              preset === key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {PRESETS[key].label}
          </button>
        ))}
      </div>

      {/* 확률분포표 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-indigo-50">
              <th className="border border-indigo-200 px-4 py-2 text-indigo-800">X</th>
              {rows.map((r) => (
                <th key={r.x} className="border border-indigo-200 px-4 py-2 text-indigo-800">
                  {r.x}
                </th>
              ))}
              <th className="border border-indigo-200 px-4 py-2 text-indigo-800">합계</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2 font-medium text-gray-700 bg-gray-50">
                P(X=x)
              </td>
              {rows.map((r, i) => (
                <td key={r.x} className="border border-gray-200 px-2 py-1 text-center">
                  {preset === 'custom' ? (
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      value={r.p}
                      onChange={(e) => updateP(i, e.target.value)}
                      className="w-16 text-center border border-gray-300 rounded px-1 py-0.5 text-sm"
                    />
                  ) : (
                    <span>{r.p.toFixed(4)}</span>
                  )}
                </td>
              ))}
              <td
                className={`border border-gray-200 px-4 py-2 text-center font-bold ${
                  isValid ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stats.total.toFixed(4)}
              </td>
            </tr>
          </tbody>
        </table>
        {!isValid && (
          <p className="text-red-500 text-xs mt-1">⚠ 확률의 합이 1이 아닙니다.</p>
        )}
      </div>

      {/* 막대그래프 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: 'X의 값', position: 'insideBottom', offset: -10 }} />
            <YAxis
              domain={[0, Math.min(1, maxP * 1.4)]}
              tickFormatter={(v) => v.toFixed(2)}
              label={{ value: 'P(X=x)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip formatter={(v: number) => v.toFixed(4)} labelFormatter={(l) => `X = ${l}`} />
            <ReferenceLine y={stats.mean} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: `E(X)=${stats.mean.toFixed(2)}`, position: 'right', fontSize: 11 }} />
            <Bar dataKey="p" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.p === maxP ? '#6366f1' : '#a5b4fc'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 통계량 */}
      {isValid && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">기댓값 E(X)</div>
            <div className="text-xl font-bold text-blue-700">{stats.mean.toFixed(4)}</div>
            <div className="text-xs text-gray-400 mt-1">Σ xᵢpᵢ</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">분산 V(X)</div>
            <div className="text-xl font-bold text-purple-700">{stats.variance.toFixed(4)}</div>
            <div className="text-xs text-gray-400 mt-1">E(X²) − {'{E(X)}²'}</div>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">표준편차 σ(X)</div>
            <div className="text-xl font-bold text-indigo-700">{stats.sd.toFixed(4)}</div>
            <div className="text-xs text-gray-400 mt-1">√V(X)</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">E(X²)</div>
            <div className="text-xl font-bold text-green-700">
              {(stats.variance + stats.mean * stats.mean).toFixed(4)}
            </div>
            <div className="text-xs text-gray-400 mt-1">Σ xᵢ²pᵢ</div>
          </div>
        </div>
      )}
    </div>
  );
}
