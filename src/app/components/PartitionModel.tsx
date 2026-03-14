import { useState } from 'react';
import { motion } from 'motion/react';

export function PartitionModel() {
  const [balls, setBalls] = useState(5);
  const [boxes, setBoxes] = useState(3);

  // Calculate distribution for visualization
  const partitions = boxes - 1;
  const totalPositions = balls + partitions;

  // Create a simple visualization
  const positions = Array(totalPositions).fill('ball');
  // Place partitions at regular intervals for demo
  for (let i = 1; i < boxes; i++) {
    const pos = Math.floor((totalPositions * i) / boxes);
    if (pos < totalPositions) {
      positions[pos] = 'partition';
    }
  }

  const result = combination(balls + boxes - 1, boxes - 1);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            물건(공) 개수: {balls}개
          </label>
          <input
            type="range"
            min="3"
            max="10"
            value={balls}
            onChange={(e) => setBalls(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            영역(상자) 개수: {boxes}개
          </label>
          <input
            type="range"
            min="2"
            max="5"
            value={boxes}
            onChange={(e) => setBoxes(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {positions.map((type, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {type === 'ball' ? (
                <div className="w-8 h-8 bg-blue-500 rounded-full shadow-md" />
              ) : (
                <div className="w-1 h-12 bg-gray-800 rounded" />
              )}
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">
          {balls}개의 공을 {boxes}개 영역으로 나누기 위해 {partitions}개의 칸막이 사용
        </p>
      </div>

      {/* Formula */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6">
        <div className="text-center space-y-3">
          <div className="text-lg text-gray-700">
            중복조합 공식
          </div>
          <div className="text-3xl font-bold text-green-700">
            <sub>{boxes}</sub>H<sub>{balls}</sub> = <sub>{balls + boxes - 1}</sub>C<sub>{boxes - 1}</sub> = {result}
          </div>
          <div className="text-sm text-gray-600">
            {balls}개 공 + {partitions}개 칸막이 = {totalPositions}개 위치 중 {partitions}개를 칸막이로 선택
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">왜 이 공식이 성립하는가?</h4>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
          <li>r개의 구별되지 않는 공을 n개의 구별되는 상자에 넣는 문제</li>
          <li>공들을 일렬로 놓고, (n-1)개의 칸막이로 n개 영역을 만듦</li>
          <li>총 r + (n-1) = r + n - 1개의 위치가 생김</li>
          <li>이 중에서 칸막이가 들어갈 (n-1)개의 위치를 선택</li>
          <li>따라서 ₙHᵣ = ᵣ₊ₙ₋₁Cₙ₋₁ = ᵣ₊ₙ₋₁Cᵣ (조합의 대칭성)</li>
        </ol>
      </div>
    </div>
  );
}

function combination(n: number, r: number): number {
  if (r > n) return 0;
  if (r === 0 || r === n) return 1;
  
  let result = 1;
  for (let i = 0; i < r; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  return Math.round(result);
}