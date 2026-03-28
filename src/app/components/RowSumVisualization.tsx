import { useState } from 'react';
import { motion } from 'motion/react';

export function RowSumVisualization() {
  const [selectedRow, setSelectedRow] = useState(4);

  // Calculate binomial coefficient
  const binomialCoeff = (n: number, r: number): number => {
    if (r > n || r < 0) return 0;
    if (r === 0 || r === n) return 1;
    let result = 1;
    for (let i = 1; i <= r; i++) {
      result = result * (n - i + 1) / i;
    }
    return Math.round(result);
  };

  // Generate triangle
  const rows = 8;
  const triangle: number[][] = [];
  for (let i = 0; i < rows; i++) {
    triangle[i] = [];
    for (let j = 0; j <= i; j++) {
      triangle[i][j] = binomialCoeff(i, j);
    }
  }

  const rowSum = triangle[selectedRow].reduce((a, b) => a + b, 0);
  const expectedSum = Math.pow(2, selectedRow);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
        행의 합 = 2ⁿ
      </h3>

      {/* Formula */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <h4 className="text-lg font-bold mb-3 text-center">정리</h4>
        <div className="text-center font-mono text-xl mb-2">
          Σ C(n, r) = 2ⁿ
        </div>
        <div className="text-center text-sm text-blue-100">
          (r은 0부터 n까지)
        </div>
      </div>

      {/* Row Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          n (행 번호) = {selectedRow}
        </label>
        <input
          type="range"
          min="0"
          max={rows - 1}
          value={selectedRow}
          onChange={(e) => setSelectedRow(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Triangle Visualization */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
        {triangle.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center items-center mb-2">
            <div className="flex items-center gap-2">
              {row.map((value, colIndex) => {
                const isSelected = rowIndex === selectedRow;
                return (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: isSelected ? 1.1 : 1, 
                      opacity: 1 
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-indigo-500 text-white border-indigo-600 ring-2 ring-indigo-300'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {value}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Calculation */}
      <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-6">
        <h4 className="font-bold text-gray-900 mb-3">계산: 행 {selectedRow}</h4>
        <div className="space-y-3">
          <div className="bg-white rounded p-4">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">행의 값들:</span>
            </p>
            <div className="font-mono text-sm">
              {triangle[selectedRow].map((val, idx) => (
                <span key={idx}>
                  C({selectedRow},{idx}) = {val}
                  {idx < triangle[selectedRow].length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded p-4">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">합계:</span>
            </p>
            <div className="font-mono text-lg text-indigo-600">
              {triangle[selectedRow].join(' + ')} = {rowSum}
            </div>
          </div>

          <div className="bg-green-50 border border-green-400 rounded p-4">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">2<sup>{selectedRow}</sup> =</span>
            </p>
            <div className="font-mono text-lg text-green-700">
              {expectedSum}
            </div>
          </div>

          {rowSum === expectedSum && (
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded p-3 text-center">
              <span className="text-xl">✓</span> 확인 완료!
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h4 className="font-bold text-gray-900 mb-3">왜 2ⁿ인가?</h4>
        <div className="space-y-3 text-gray-700 text-sm">
          <p>
            <span className="font-bold">이항정리를 이용한 증명:</span>
          </p>
          <div className="bg-white rounded p-4 space-y-2">
            <p className="font-mono text-sm">
              (a + b)ⁿ = Σ C(n,r) · aⁿ⁻ʳ · bʳ
            </p>
            <p className="text-xs text-gray-600">a = b = 1을 대입하면:</p>
            <p className="font-mono text-sm">
              (1 + 1)ⁿ = Σ C(n,r) · 1ⁿ⁻ʳ · 1ʳ
            </p>
            <p className="font-mono text-sm font-bold text-indigo-700">
              2ⁿ = Σ C(n,r)
            </p>
          </div>

          <div className="bg-blue-100 rounded p-4 mt-3">
            <p className="font-bold text-gray-900 mb-2">조합론적 의미:</p>
            <p className="text-sm">
              n개의 원소로 이루어진 집합의 <span className="font-bold">부분집합의 개수</span>는 2ⁿ개입니다.
            </p>
            <p className="text-sm mt-2">
              각 원소마다 "포함" 또는 "미포함" 2가지 선택 → 2 × 2 × ... × 2 (n번) = 2ⁿ
            </p>
            <p className="text-xs text-gray-600 mt-2">
              = C(n,0) + C(n,1) + C(n,2) + ... + C(n,n)
              <br />
              = 0개 선택 + 1개 선택 + 2개 선택 + ... + n개 선택
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
