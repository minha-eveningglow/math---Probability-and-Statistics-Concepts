import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'motion/react';
import { combination, binomialProbability } from '../utils/math';

type Preset = 'coin' | 'dice' | 'custom';

export function IndependentTrialsViz() {
  const [n, setN] = useState(6);
  const [p, setP] = useState(0.5);
  const [r, setR] = useState(2);
  const [preset, setPreset] = useState<Preset>('coin');

  const applyPreset = (type: Preset) => {
    setPreset(type);
    if (type === 'coin') { setN(6); setP(0.5); setR(2); }
    if (type === 'dice') { setN(3); setP(1/6); setR(2); }
  };

  const adjustR = (newN: number) => {
    setN(newN);
    if (r > newN) setR(newN);
  };

  const nCr = combination(n, r);
  const pR = Math.pow(p, r);
  const qNR = Math.pow(1 - p, n - r);
  const result = binomialProbability(n, r, p);

  const chartData = Array.from({ length: n + 1 }, (_, k) => ({
    k,
    name: k.toString(),
    probability: binomialProbability(n, k, p) * 100,
  }));

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => applyPreset('coin')}
          className={`p-3 rounded-lg text-sm font-medium transition-all ${
            preset === 'coin' ? 'bg-amber-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          동전 6회, 뒷면 2번
        </button>
        <button
          onClick={() => applyPreset('dice')}
          className={`p-3 rounded-lg text-sm font-medium transition-all ${
            preset === 'dice' ? 'bg-amber-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          주사위 3회, 1의 눈 2번
        </button>
        <button
          onClick={() => { setPreset('custom'); }}
          className={`p-3 rounded-lg text-sm font-medium transition-all ${
            preset === 'custom' ? 'bg-amber-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          직접 설정
        </button>
      </div>

      {/* Sliders */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            시행 횟수 (n): <span className="text-amber-700 font-bold">{n}</span>
          </label>
          <input
            type="range" min="1" max="20" value={n}
            onChange={(e) => { adjustR(Number(e.target.value)); setPreset('custom'); }}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            성공 확률 (p): <span className="text-amber-700 font-bold">{p.toFixed(4)}</span>
          </label>
          <input
            type="range" min="0.01" max="0.99" step="0.01" value={p}
            onChange={(e) => { setP(Number(e.target.value)); setPreset('custom'); }}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            성공 횟수 (r): <span className="text-amber-700 font-bold">{r}</span>
          </label>
          <input
            type="range" min="0" max={n} value={r}
            onChange={(e) => { setR(Number(e.target.value)); setPreset('custom'); }}
            className="w-full"
          />
        </div>
      </div>

      {/* Trial Visualization */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-3 text-center">
          {n}번 시행 중 {r}번 성공하는 한 가지 배열 (총 <span className="font-mono font-bold">{nCr}가지</span> 배열 가능)
        </p>
        <div className="flex justify-center flex-wrap gap-2">
          {Array.from({ length: n }, (_, i) => {
            const isSuccess = i < r;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                  isSuccess
                    ? 'bg-amber-100 border-amber-400 text-amber-800'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                }`}
              >
                {isSuccess ? 'O' : 'X'}
              </motion.div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          O = 성공 (확률 p), X = 실패 (확률 1-p)
        </p>
      </div>

      {/* Step-by-step Calculation */}
      <motion.div
        key={`${n}-${p}-${r}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-amber-50 border border-amber-200 rounded-lg p-5"
      >
        <h4 className="font-semibold text-amber-900 mb-3">계산 과정</h4>
        <div className="font-mono text-sm space-y-2">
          <p>P(X = {r}) = <sub>{n}</sub>C<sub>{r}</sub> × p<sup>{r}</sup> × (1-p)<sup>{n - r}</sup></p>
          <div className="bg-white border border-amber-200 rounded p-3 space-y-1">
            <p>
              <sub>{n}</sub>C<sub>{r}</sub> = {nCr}
              <span className="text-gray-500 ml-2">({n}개 중 {r}개를 선택하는 경우의 수)</span>
            </p>
            <p>
              p<sup>{r}</sup> = {p.toFixed(4)}<sup>{r}</sup> = {pR.toFixed(6)}
              <span className="text-gray-500 ml-2">(성공 확률의 {r}제곱)</span>
            </p>
            <p>
              (1-p)<sup>{n - r}</sup> = {(1 - p).toFixed(4)}<sup>{n - r}</sup> = {qNR.toFixed(6)}
              <span className="text-gray-500 ml-2">(실패 확률의 {n - r}제곱)</span>
            </p>
          </div>
          <div className="bg-amber-100 border border-amber-300 rounded p-3 text-center">
            <p className="text-amber-900 font-bold text-base">
              P(X = {r}) = {nCr} × {pR.toFixed(6)} × {qNR.toFixed(6)}
            </p>
            <p className="text-amber-900 font-bold text-lg mt-1">
              = {result.toFixed(6)} ({(result * 100).toFixed(2)}%)
            </p>
            {preset === 'coin' && (
              <p className="text-amber-800 text-sm mt-1">= 15/64</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Distribution Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">확률 분포 (r = {r} 강조)</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{ value: '성공 횟수 (k)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              label={{ value: '확률 (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number) => `${value.toFixed(2)}%`}
              labelFormatter={(label) => `k = ${label}`}
            />
            <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.k === r ? '#d97706' : '#fcd34d'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
