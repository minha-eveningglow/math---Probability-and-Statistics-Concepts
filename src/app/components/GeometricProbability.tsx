import { useState } from 'react';
import { motion } from 'motion/react';

export function GeometricProbability() {
  const [example, setExample] = useState<'circle' | 'segment'>('segment');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">
        기하적 확률 (Geometric Probability)
      </h3>

      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300 rounded-lg p-6">
        <p className="text-gray-700 mb-4">
          점이 특정 영역에 임의로 떨어질 때, 그 점이 부분 영역에 속할 확률을 계산합니다.
        </p>
        <div className="bg-white rounded-lg p-4">
          <p className="font-mono text-lg text-center text-gray-800 mb-2">
            P = (부분 영역의 길이/넓이/부피) / (전체 영역의 길이/넓이/부피)
          </p>
          <p className="text-sm text-gray-600 text-center">
            경우의 수가 무한일 때 사용하는 확률 계산법
          </p>
        </div>
      </div>

      {/* Example Selector */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setExample('segment')}
          className={`p-3 rounded-lg border-2 transition-all ${
            example === 'segment'
              ? 'bg-cyan-500 text-white border-transparent'
              : 'bg-gray-50 border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="font-bold">선분 예제</div>
          <div className="text-sm opacity-90">1차원 (길이)</div>
        </button>
        <button
          onClick={() => setExample('circle')}
          className={`p-3 rounded-lg border-2 transition-all ${
            example === 'circle'
              ? 'bg-blue-500 text-white border-transparent'
              : 'bg-gray-50 border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="font-bold">원 예제</div>
          <div className="text-sm opacity-90">2차원 (넓이)</div>
        </button>
      </div>

      {/* Line Segment Example */}
      {example === 'segment' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-cyan-50 border border-cyan-300 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-4">
              예제: 길이 10cm인 선분 위에 임의로 점을 찍을 때, 왼쪽 끝에서 3cm 이내에 점이 찍힐 확률
            </h4>

            {/* Line visualization */}
            <div className="bg-white rounded-lg p-8">
              <svg width="100%" height="120" viewBox="0 0 500 120">
                {/* Main line */}
                <line x1="50" y1="60" x2="450" y2="60" stroke="#1f2937" strokeWidth="4" />

                {/* Target region */}
                <line x1="50" y1="60" x2="170" y2="60" stroke="#06b6d4" strokeWidth="8" opacity="0.7" />

                {/* Markers */}
                <circle cx="50" cy="60" r="6" fill="#1f2937" />
                <circle cx="450" cy="60" r="6" fill="#1f2937" />
                <circle cx="170" cy="60" r="6" fill="#06b6d4" />

                {/* Labels */}
                <text x="50" y="90" textAnchor="middle" fontSize="14" fill="#4b5563">0</text>
                <text x="170" y="90" textAnchor="middle" fontSize="14" fill="#06b6d4" fontWeight="bold">3cm</text>
                <text x="450" y="90" textAnchor="middle" fontSize="14" fill="#4b5563">10cm</text>

                {/* Annotations */}
                <text x="110" y="40" textAnchor="middle" fontSize="16" fill="#0891b2" fontWeight="bold">
                  유리한 영역
                </text>
                <line x1="110" y1="45" x2="110" y2="55" stroke="#0891b2" strokeWidth="2" />
              </svg>
            </div>

            <div className="mt-4 space-y-3">
              <div className="bg-white rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">풀이:</p>
                <div className="space-y-2 text-gray-700">
                  <p>• 전체 선분의 길이: 10cm</p>
                  <p>• 유리한 부분의 길이: 3cm</p>
                  <p className="font-mono bg-cyan-100 p-2 rounded mt-2">
                    P = 3/10 = 0.3 = 30%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Circle Example */}
      {example === 'circle' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-4">
              예제: 반지름 6cm인 원 안에 작은 원(반지름 2cm)이 있을 때, 임의로 찍은 점이 작은 원 안에 있을 확률
            </h4>

            {/* Circle visualization */}
            <div className="bg-white rounded-lg p-8 flex justify-center">
              <svg width="300" height="300" viewBox="0 0 300 300">
                {/* Large circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  fill="#dbeafe"
                  stroke="#2563eb"
                  strokeWidth="3"
                />

                {/* Small circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="40"
                  fill="#60a5fa"
                  stroke="#1d4ed8"
                  strokeWidth="3"
                  opacity="0.8"
                />

                {/* Radii */}
                <line x1="150" y1="150" x2="270" y2="150" stroke="#1f2937" strokeWidth="2" strokeDasharray="4,4" />
                <line x1="150" y1="150" x2="190" y2="150" stroke="#1d4ed8" strokeWidth="2" />

                {/* Labels */}
                <text x="210" y="140" fontSize="14" fill="#1f2937" fontWeight="bold">6cm</text>
                <text x="170" y="140" fontSize="14" fill="#1d4ed8" fontWeight="bold">2cm</text>

                <text x="150" y="30" textAnchor="middle" fontSize="16" fill="#2563eb" fontWeight="bold">
                  전체 영역
                </text>
                <text x="150" y="150" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">
                  유리한
                </text>
                <text x="150" y="165" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">
                  영역
                </text>
              </svg>
            </div>

            <div className="mt-4 space-y-3">
              <div className="bg-white rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">풀이:</p>
                <div className="space-y-2 text-gray-700">
                  <p>• 큰 원의 넓이: π × 6² = 36π cm²</p>
                  <p>• 작은 원의 넓이: π × 2² = 4π cm²</p>
                  <p className="font-mono bg-blue-100 p-2 rounded mt-2">
                    P = 4π / 36π = 4/36 = 1/9 ≈ 11.1%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Key Points */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-4">
        <p className="font-bold text-gray-900 mb-2">🔑 핵심 포인트</p>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• <span className="font-bold">1차원:</span> 선분의 길이 비율</li>
          <li>• <span className="font-bold">2차원:</span> 평면 도형의 넓이 비율</li>
          <li>• <span className="font-bold">3차원:</span> 입체 도형의 부피 비율</li>
          <li className="mt-3 pt-3 border-t border-yellow-300">
            • 경우의 수가 <span className="font-bold">무한</span>일 때 사용하는 확률 계산법입니다
          </li>
        </ul>
      </div>
    </div>
  );
}
