import { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCw } from 'lucide-react';

export function CircularPermutationViz() {
  const [n, setN] = useState(4);
  const [showRotations, setShowRotations] = useState(false);
  const [selectedArrangement, setSelectedArrangement] = useState(0);

  // Generate all permutations
  const allPermutations = generatePermutations(n);
  
  // Group permutations by circular equivalence
  const uniqueCircular = getUniqueCircularPermutations(allPermutations);
  
  // For selected arrangement, show all rotations
  const rotations = showRotations && selectedArrangement < uniqueCircular.length
    ? getRotations(uniqueCircular[selectedArrangement])
    : [];

  const linearCount = factorial(n);
  const circularCount = factorial(n - 1);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            사람 수 (n): {n}명
          </label>
          <input
            type="range"
            min="3"
            max="5"
            value={n}
            onChange={(e) => {
              setN(Number(e.target.value));
              setSelectedArrangement(0);
            }}
            className="w-full"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={() => setShowRotations(!showRotations)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showRotations
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <RotateCw className="w-5 h-5 inline mr-2" />
            회전 대칭 보기
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600 mb-1">일렬 배열</div>
          <div className="text-3xl font-bold text-blue-700">{linearCount}</div>
          <div className="text-xs text-gray-500 mt-1">{n}! = {linearCount}</div>
        </div>
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600 mb-1">원형 배열 (회전 제거)</div>
          <div className="text-3xl font-bold text-green-700">{circularCount}</div>
          <div className="text-xs text-gray-500 mt-1">({n}-1)! = {circularCount}</div>
        </div>
      </div>

      {/* Unique Circular Permutations */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">
          고유한 원형 배열 ({circularCount}가지)
        </h4>
        <div className="space-y-6">
          {uniqueCircular.map((arrangement, index) => {
            const rotations = getRotations(arrangement);
            return (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="text-sm font-bold text-gray-700">그룹 #{index + 1}</div>
                  <div className="ml-auto text-xs text-gray-500">
                    회전하면 같은 {n}가지
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {rotations.map((rotation, rotIdx) => (
                    <motion.div
                      key={rotIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + rotIdx * 0.05 }}
                      className="flex flex-col items-center bg-white rounded-lg p-2 shadow-sm"
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        {rotIdx === 0 ? '기준' : `${rotIdx}칸`}
                      </div>
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <circle
                          cx="40"
                          cy="40"
                          r="28"
                          fill="none"
                          stroke={rotIdx === 0 ? '#4f46e5' : '#e5e7eb'}
                          strokeWidth={rotIdx === 0 ? '3' : '2'}
                        />
                        {rotation.map((num, idx) => {
                          const angle = (idx * 2 * Math.PI) / n - Math.PI / 2;
                          const x = 40 + 28 * Math.cos(angle);
                          const y = 40 + 28 * Math.sin(angle);
                          return (
                            <g key={idx}>
                              <circle
                                cx={x}
                                cy={y}
                                r="10"
                                fill={idx === 0 ? '#4f46e5' : '#3b82f6'}
                              />
                              <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="white"
                                fontSize="11"
                                fontWeight="bold"
                              >
                                {num}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-3 text-center">
                  <div className="inline-block bg-yellow-50 border border-yellow-200 rounded px-3 py-1 text-xs text-gray-700">
                    이 {n}개는 원형에서 회전하면 동일 → 1가지로 계산
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rotations Display - Remove this section */}
      {showRotations && false && rotations.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <RotateCw className="w-5 h-5 text-purple-600 mr-2" />
            <h4 className="font-semibold text-gray-900">
              회전했을 때 같은 배열 ({n}가지)
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            아래 {n}가지 배열은 모두 회전하면 같은 배열입니다. 따라서 원순열에서는 1가지로 봅니다.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rotations.map((rotation, rotIdx) => (
              <motion.div
                key={rotIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rotIdx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-xs text-gray-500 mb-2">
                  {rotIdx === 0 ? '기준' : `${rotIdx}칸 회전`}
                </div>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="#c4b5fd"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                  {rotation.map((num, idx) => {
                    const angle = (idx * 2 * Math.PI) / n - Math.PI / 2;
                    const x = 50 + 35 * Math.cos(angle);
                    const y = 50 + 35 * Math.sin(angle);
                    return (
                      <g key={idx}>
                        <circle
                          cx={x}
                          cy={y}
                          r="12"
                          fill={idx === 0 ? '#4f46e5' : '#3b82f6'}
                        />
                        <text
                          x={x}
                          y={y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="white"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {num}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 bg-white rounded-lg p-4 text-center">
            <p className="text-sm text-gray-700">
              이렇게 {n}개의 회전이 1개로 묶이므로, 
              <span className="font-bold text-indigo-700"> {linearCount} ÷ {n} = {circularCount}</span>
            </p>
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">원순열 핵심 원리</h4>
        <p className="text-sm text-gray-700">
          일렬로 나열하면 <span className="font-mono font-bold">{n}!</span>가지이지만, 
          원형 배열에서는 회전했을 때 같은 것들을 하나로 봅니다. 
          각 배열마다 <span className="font-mono font-bold">{n}</span>가지 회전이 가능하므로, 
          <span className="font-mono font-bold"> {n}! ÷ {n} = ({n}-1)! = {circularCount}</span>가지가 됩니다.
        </p>
      </div>
    </div>
  );
}

// Helper functions
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function generatePermutations(n: number): number[][] {
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  const result: number[][] = [];
  
  function permute(arr: number[], start: number = 0) {
    if (start === arr.length - 1) {
      result.push([...arr]);
      return;
    }
    
    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(arr, start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }
  
  permute(arr);
  return result;
}

function getRotations(arr: number[]): number[][] {
  const rotations: number[][] = [];
  for (let i = 0; i < arr.length; i++) {
    rotations.push([...arr.slice(i), ...arr.slice(0, i)]);
  }
  return rotations;
}

function getUniqueCircularPermutations(permutations: number[][]): number[][] {
  const unique: number[][] = [];
  const seen = new Set<string>();
  
  for (const perm of permutations) {
    const rotations = getRotations(perm);
    const normalized = rotations
      .map(r => r.join(','))
      .sort()[0];
    
    if (!seen.has(normalized)) {
      seen.add(normalized);
      unique.push(perm);
    }
  }
  
  return unique;
}