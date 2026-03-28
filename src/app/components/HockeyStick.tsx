import { useState } from 'react';
import { motion } from 'motion/react';

export function HockeyStick() {
  const [n, setN] = useState(5);
  const [r, setR] = useState(2);

  // Calculate binomial coefficient
  const binomialCoeff = (n: number, r: number): number => {
    if (r > n || r < 0 || n < 0) return 0;
    if (r === 0 || r === n) return 1;
    let result = 1;
    for (let i = 1; i <= r; i++) {
      result = result * (n - i + 1) / i;
    }
    return Math.round(result);
  };

  // Generate Pascal's triangle
  const rows = n + 3;
  const triangle: number[][] = [];
  for (let i = 0; i < rows; i++) {
    triangle[i] = [];
    for (let j = 0; j <= i; j++) {
      triangle[i][j] = binomialCoeff(i, j);
    }
  }

  // Calculate hockey stick sum
  const stickValues: number[] = [];
  for (let k = r; k <= n; k++) {
    stickValues.push(binomialCoeff(k, r));
  }
  const stickSum = stickValues.reduce((a, b) => a + b, 0);
  const resultValue = binomialCoeff(n + 1, r + 1);

  // Check if a cell is part of the hockey stick
  const isInStick = (rowIndex: number, colIndex: number) => {
    return colIndex === r && rowIndex >= r && rowIndex <= n;
  };

  // Check if a cell is the result
  const isResult = (rowIndex: number, colIndex: number) => {
    return rowIndex === n + 1 && colIndex === r + 1;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
        하키 스틱 정리 (Hockey Stick Identity)
      </h3>

      {/* Formula */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
        <h4 className="text-lg font-bold mb-3 text-center">정리</h4>
        <div className="text-center font-mono text-xl mb-2">
          Σ C(k, r) = C(n+1, r+1)
        </div>
        <div className="text-center text-sm text-indigo-100">
          (k는 r부터 n까지)
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            n (막대 끝) = {n}
          </label>
          <input
            type="range"
            min="2"
            max="7"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            r (열 위치) = {r}
          </label>
          <input
            type="range"
            min="0"
            max="3"
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Triangle Visualization */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 overflow-x-auto">
        <div className="inline-block min-w-full">
          {triangle.slice(0, n + 3).map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center items-center mb-2">
              <div className="flex items-center gap-2">
                {row.map((value, colIndex) => {
                  const inStick = isInStick(rowIndex, colIndex);
                  const isRes = isResult(rowIndex, colIndex);
                  
                  return (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: inStick || isRes ? 1.1 : 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg text-sm font-bold transition-all ${
                        inStick
                          ? 'bg-blue-500 text-white border-blue-600 ring-2 ring-blue-300'
                          : isRes
                          ? 'bg-green-500 text-white border-green-600 ring-2 ring-green-300'
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
      </div>

      {/* Calculation Display */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
        <h4 className="font-bold text-gray-900 mb-3">계산</h4>
        <div className="space-y-3">
          <div className="bg-white rounded p-4">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">하키 스틱 (파란색):</span>
            </p>
            <div className="font-mono text-sm space-y-1">
              {stickValues.map((val, idx) => (
                <div key={idx}>
                  C({r + idx}, {r}) = {val}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded p-4">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">합계:</span>
            </p>
            <div className="font-mono text-lg text-blue-600">
              {stickValues.join(' + ')} = {stickSum}
            </div>
          </div>

          <div className="bg-green-50 border border-green-400 rounded p-4">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">결과 (초록색):</span>
            </p>
            <div className="font-mono text-lg text-green-700">
              C({n + 1}, {r + 1}) = {resultValue}
            </div>
          </div>

          {stickSum === resultValue && (
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded p-3 text-center">
              <span className="text-xl">✓</span> 하키 스틱 정리 확인!
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h4 className="font-bold text-gray-900 mb-3">왜 "하키 스틱"인가?</h4>
        <div className="space-y-2 text-gray-700 text-sm">
          <p>
            대각선을 따라 연속된 수들(파란색)을 더하면, 그 합이 바로 아래 대각선의 한 수(초록색)와 같습니다.
          </p>
          <p>
            파스칼의 삼각형에서 이 패턴을 보면 하키 스틱 모양을 닮았다고 해서 "Hockey Stick Identity"라고 부릅니다.
          </p>
          <div className="bg-white rounded p-3 mt-3">
            <p className="font-bold text-indigo-700 mb-1">조합론적 증명:</p>
            <p className="text-xs">
              (n+1)개 중 (r+1)개를 선택할 때, 가장 큰 번호가 얼마인지에 따라 경우를 나눔.
              가장 큰 번호가 k이면 나머지는 k-1개 중 r개를 선택 → C(k-1, r)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
