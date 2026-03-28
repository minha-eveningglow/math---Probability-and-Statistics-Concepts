import { useState } from 'react';
import { motion } from 'motion/react';

export function PascalProperties() {
  const [selectedProperty, setSelectedProperty] = useState<'edges' | 'symmetry' | 'sum' | null>(null);

  // Generate small triangle for demonstration
  const triangle: number[][] = [];
  for (let i = 0; i < 6; i++) {
    triangle[i] = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        triangle[i][j] = 1;
      } else {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
    }
  }

  const getHighlight = (rowIndex: number, colIndex: number, value: number) => {
    if (selectedProperty === 'edges' && (colIndex === 0 || colIndex === rowIndex)) {
      return 'bg-blue-500 text-white border-blue-600';
    }
    if (selectedProperty === 'symmetry') {
      const mirror = rowIndex - colIndex;
      if (colIndex <= rowIndex / 2) {
        return 'bg-green-500 text-white border-green-600';
      } else {
        return 'bg-purple-500 text-white border-purple-600';
      }
    }
    if (selectedProperty === 'sum' && rowIndex === 3) {
      // Highlight row 3 for sum example
      return 'bg-yellow-400 text-gray-900 border-yellow-600';
    }
    return 'bg-white border-gray-300';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
        파스칼 삼각형의 핵심 성질
      </h3>

      {/* Property Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedProperty(selectedProperty === 'edges' ? null : 'edges')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedProperty === 'edges'
              ? 'bg-blue-50 border-blue-500'
              : 'bg-gray-50 border-gray-300 hover:border-blue-400'
          }`}
        >
          <div className="text-lg font-bold text-gray-900 mb-1">1️⃣ 양 끝 = 1</div>
          <div className="text-sm text-gray-600">모든 행의 양 끝은 항상 1</div>
        </button>

        <button
          onClick={() => setSelectedProperty(selectedProperty === 'symmetry' ? null : 'symmetry')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedProperty === 'symmetry'
              ? 'bg-green-50 border-green-500'
              : 'bg-gray-50 border-gray-300 hover:border-green-400'
          }`}
        >
          <div className="text-lg font-bold text-gray-900 mb-1">2️⃣ 대칭</div>
          <div className="text-sm text-gray-600">C(n,r) = C(n,n-r)</div>
        </button>

        <button
          onClick={() => setSelectedProperty(selectedProperty === 'sum' ? null : 'sum')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedProperty === 'sum'
              ? 'bg-yellow-50 border-yellow-500'
              : 'bg-gray-50 border-gray-300 hover:border-yellow-400'
          }`}
        >
          <div className="text-lg font-bold text-gray-900 mb-1">3️⃣ 위 두 개 합 = 아래</div>
          <div className="text-sm text-gray-600">C(n,r) = C(n-1,r-1) + C(n-1,r)</div>
        </button>
      </div>

      {/* Visual Triangle */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
        {triangle.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center items-center mb-2">
            <div className="flex items-center gap-2">
              {row.map((value, colIndex) => (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg text-base font-bold transition-all ${getHighlight(
                    rowIndex,
                    colIndex,
                    value
                  )}`}
                >
                  {value}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Property Explanation */}
      {selectedProperty === 'edges' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6"
        >
          <h4 className="font-bold text-gray-900 mb-3">1️⃣ 양 끝 = 1</h4>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-bold">수학적 의미:</span> C(n, 0) = C(n, n) = 1
            </p>
            <p>
              <span className="font-bold">조합론적 의미:</span> n개 중에서 0개를 선택하는 방법 = n개 모두를 선택하는 방법 = 1가지
            </p>
            <div className="bg-white rounded p-3 mt-2">
              <p className="text-sm">
                모든 행의 맨 왼쪽과 맨 오른쪽은 항상 1입니다 (파란색으로 강조)
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {selectedProperty === 'symmetry' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border-2 border-green-300 rounded-lg p-6"
        >
          <h4 className="font-bold text-gray-900 mb-3">2️⃣ 대칭</h4>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-bold">공식:</span> C(n, r) = C(n, n-r)
            </p>
            <p>
              <span className="font-bold">조합론적 의미:</span> n개 중 r개를 선택하는 것 = n개 중 (n-r)개를 선택하지 않는 것
            </p>
            <div className="bg-white rounded p-3 mt-2">
              <p className="text-sm mb-2">예시: C(5, 2) = C(5, 3) = 10</p>
              <p className="text-sm">
                5개 중 2개를 선택 ↔ 5개 중 3개를 제외
              </p>
              <p className="text-sm text-gray-600 mt-2">
                (녹색과 보라색이 대칭을 이룸)
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {selectedProperty === 'sum' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6"
        >
          <h4 className="font-bold text-gray-900 mb-3">3️⃣ 위 두 개 합 = 아래 (파스칼의 항등식)</h4>
          <div className="space-y-3 text-gray-700">
            <p className="text-lg font-mono text-center bg-white rounded p-3 border border-yellow-400">
              C(n, r) = C(n-1, r-1) + C(n-1, r)
            </p>
            <p>
              <span className="font-bold">의미:</span> 한 원소를 기준으로 "선택함" 또는 "선택하지 않음"으로 경우를 나눔
            </p>
            <div className="bg-white rounded p-4 mt-2">
              <p className="text-sm font-bold mb-2">예시: C(5, 3)</p>
              <ul className="space-y-1 text-sm ml-4">
                <li>• <span className="font-bold">특정 원소를 포함해서</span> 3개 선택 → 나머지 4개 중 2개 선택 = C(4, 2)</li>
                <li>• <span className="font-bold">특정 원소를 제외하고</span> 3개 선택 → 나머지 4개 중 3개 선택 = C(4, 3)</li>
              </ul>
              <p className="text-sm mt-2 font-bold text-indigo-700">
                C(5, 3) = C(4, 2) + C(4, 3) = 6 + 4 = 10 ✓
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
