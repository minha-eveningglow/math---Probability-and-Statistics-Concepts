import { useState } from 'react';
import { motion } from 'motion/react';

interface PascalTriangleVizProps {
  rows: number;
}

export function PascalTriangleViz({ rows }: PascalTriangleVizProps) {
  const [highlightMode, setHighlightMode] = useState<'none' | 'even' | 'fibonacci'>('none');

  // Generate Pascal's Triangle
  const triangle: number[][] = [];
  for (let i = 0; i < rows; i++) {
    triangle[i] = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        triangle[i][j] = 1;
      } else {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
    }
  }

  // Calculate row sums
  const rowSums = triangle.map((row) => row.reduce((a, b) => a + b, 0));

  // Fibonacci diagonal
  const fibonacci: number[] = [];
  for (let i = 0; i < rows; i++) {
    let sum = 0;
    for (let j = 0; j <= i; j++) {
      if (i - j === j) {
        sum += triangle[i - j][j];
      } else if (i - j > j) {
        sum += triangle[i - j][j];
      } else {
        break;
      }
    }
    if (sum > 0) fibonacci.push(sum);
  }

  const getHighlight = (value: number, rowIndex: number, colIndex: number) => {
    if (highlightMode === 'even' && value % 2 === 0) {
      return 'bg-pink-200 border-pink-400';
    }
    if (highlightMode === 'fibonacci') {
      // Highlight Fibonacci diagonal
      const diagIndex = rowIndex - colIndex;
      if (diagIndex === colIndex) {
        return 'bg-yellow-200 border-yellow-400';
      }
    }
    return 'bg-white border-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Highlight Mode Toggle */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setHighlightMode('none')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            highlightMode === 'none'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          기본
        </button>
        <button
          onClick={() => setHighlightMode('even')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            highlightMode === 'even'
              ? 'bg-pink-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          짝수 강조
        </button>
        <button
          onClick={() => setHighlightMode('fibonacci')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            highlightMode === 'fibonacci'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          피보나치 대각선
        </button>
      </div>

      {/* Triangle */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {triangle.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center items-center mb-1">
              <div className="flex items-center gap-1">
                {row.map((value, colIndex) => (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: (rowIndex * 0.05 + colIndex * 0.02) }}
                    className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg text-sm font-semibold ${getHighlight(
                      value,
                      rowIndex,
                      colIndex
                    )}`}
                  >
                    {value}
                  </motion.div>
                ))}
                <div className="ml-4 text-sm text-gray-600 font-mono">
                  = {rowSums[rowIndex]} = 2<sup>{rowIndex}</sup>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">각 행의 합</h4>
          <p className="text-sm text-gray-700 mb-2">
            n번째 행의 모든 수를 더하면 2ⁿ입니다.
          </p>
          <div className="text-xs font-mono text-gray-600 space-y-1">
            {rowSums.slice(0, 6).map((sum, i) => (
              <div key={i}>
                행 {i}: {sum} = 2^{i}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">피보나치 수열</h4>
          <p className="text-sm text-gray-700 mb-2">
            대각선의 합은 피보나치 수열을 만듭니다.
          </p>
          <div className="text-xs font-mono text-gray-600">
            {fibonacci.slice(0, 8).join(', ')}...
          </div>
        </div>
      </div>

      {/* Pattern Explanation */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">파스칼의 규칙</h4>
        <p className="text-sm text-gray-700">
          각 수는 바로 위 왼쪽과 오른쪽 수의 합입니다: <span className="font-mono">ₙCᵣ = ₙ₋₁Cᵣ₋₁ + ₙ₋₁Cᵣ</span>
        </p>
      </div>
    </div>
  );
}
