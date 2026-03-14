import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function BinomialDistribution() {
  const [n, setN] = useState(20);
  const [p, setP] = useState(0.5);

  // Calculate binomial distribution
  const data = [];
  for (let k = 0; k <= n; k++) {
    const probability = binomialProbability(n, k, p);
    data.push({
      k,
      probability: probability * 100,
      name: k.toString(),
    });
  }

  // Find the mode for highlighting
  const maxProb = Math.max(...data.map(d => d.probability));

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            시행 횟수 (n): {n}
          </label>
          <input
            type="range"
            min="5"
            max="50"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            n이 클수록 정규분포에 가까워집니다
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            성공 확률 (p): {p.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            p=0.5일 때 대칭적인 종 모양이 됩니다
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.probability === maxProb ? '#6366f1' : '#93c5fd'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600 mb-1">평균 (기댓값)</div>
          <div className="text-2xl font-bold text-blue-700">
            {(n * p).toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-1">E(X) = np</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600 mb-1">분산</div>
          <div className="text-2xl font-bold text-purple-700">
            {(n * p * (1 - p)).toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Var(X) = np(1-p)</div>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600 mb-1">표준편차</div>
          <div className="text-2xl font-bold text-indigo-700">
            {Math.sqrt(n * p * (1 - p)).toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-1">σ = √(np(1-p))</div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">이항분포 → 정규분포</h4>
        <p className="text-sm text-gray-700 mb-2">
          이항분포 B(n, p)에서 n이 충분히 크고 p가 0이나 1에 가까이 않으면, 
          분포는 정규분포 N(np, np(1-p))에 근사합니다.
        </p>
        <p className="text-xs text-gray-600 italic">
          이것이 바로 <strong>중심극한정리</strong>의 시각적 표현입니다. 
          파스칼의 삼각형 각 행의 값들을 정규화하면 이 그래프와 같은 모양이 됩니다!
        </p>
      </div>
    </div>
  );
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function combination(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  return result;
}

function binomialProbability(n: number, k: number, p: number): number {
  const nCk = combination(n, k);
  return nCk * Math.pow(p, k) * Math.pow(1 - p, n - k);
}
