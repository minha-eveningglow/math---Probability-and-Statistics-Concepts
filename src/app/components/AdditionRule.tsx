import { useState } from 'react';
import { motion } from 'motion/react';

type CaseType = 'general' | 'mutually-exclusive';

export function AdditionRule() {
  const [caseType, setCaseType] = useState<CaseType>('general');

  const width = 400;
  const height = 300;
  const radius = 70;

  const circleA = { cx: 140, cy: 150, r: radius };
  const circleB = { cx: 260, cy: 150, r: radius };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">
        확률의 덧셈정리 (Addition Rule of Probability)
      </h3>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6">
        <p className="text-lg text-gray-700 mb-4">
          두 사건 A와 B의 <span className="font-bold text-purple-700">합사건 확률</span>을 구하는 공식
        </p>

        <div className="bg-white rounded-lg p-6 mb-4">
          <p className="text-center font-mono text-2xl text-gray-800 mb-2">
            P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
          </p>
          <p className="text-center text-sm text-gray-600">
            교집합을 한 번 빼주는 이유: 겹치는 부분을 두 번 세지 않기 위해
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4">
          <p className="font-bold text-gray-900 mb-2">⚠️ 특별한 경우 (배반사건)</p>
          <p className="text-gray-700 mb-2">
            A와 B가 <span className="font-bold text-red-600">배반사건</span>이면 (A ∩ B = ∅):
          </p>
          <p className="text-center font-mono text-xl text-gray-800 bg-white rounded p-3">
            P(A ∪ B) = P(A) + P(B)
          </p>
          <p className="text-sm text-gray-600 mt-2">
            교집합이 없으므로 P(A ∩ B) = 0
          </p>
        </div>
      </div>

      {/* Case Selector */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setCaseType('general')}
          className={`p-4 rounded-lg border-2 transition-all ${
            caseType === 'general'
              ? 'bg-purple-500 text-white border-transparent'
              : 'bg-gray-50 border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="font-bold mb-1">일반적인 경우</div>
          <div className="text-sm opacity-90">교집합이 있음</div>
        </button>
        <button
          onClick={() => setCaseType('mutually-exclusive')}
          className={`p-4 rounded-lg border-2 transition-all ${
            caseType === 'mutually-exclusive'
              ? 'bg-red-500 text-white border-transparent'
              : 'bg-gray-50 border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="font-bold mb-1">배반사건</div>
          <div className="text-sm opacity-90">교집합이 없음</div>
        </button>
      </div>

      {/* Visual Representation */}
      <motion.div
        key={caseType}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-50 rounded-lg p-6"
      >
        <div className="flex justify-center">
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <defs>
              <clipPath id="clipA-add">
                <circle cx={circleA.cx} cy={circleA.cy} r={circleA.r} />
              </clipPath>
            </defs>

            <rect
              x="20" y="20"
              width={width - 40}
              height={height - 40}
              rx="10"
              fill="#f3f4f6"
              stroke="#9ca3af"
              strokeWidth="2"
            />

            <text x="30" y="45" fontSize="16" fontWeight="bold" fill="#4b5563">S</text>

            {caseType === 'general' ? (
              <>
                {/* Circle A - filled */}
                <circle
                  cx={circleA.cx}
                  cy={circleA.cy}
                  r={circleA.r}
                  fill="#93c5fd"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  opacity="0.7"
                />

                {/* Circle B - filled */}
                <circle
                  cx={circleB.cx}
                  cy={circleB.cy}
                  r={circleB.r}
                  fill="#fca5a5"
                  stroke="#ef4444"
                  strokeWidth="3"
                  opacity="0.7"
                />

                {/* Intersection highlight */}
                <circle
                  cx={circleB.cx}
                  cy={circleB.cy}
                  r={circleB.r}
                  clipPath="url(#clipA-add)"
                  fill="#c084fc"
                  opacity="0.8"
                />

                <text x={circleA.cx - 50} y={circleA.cy} fontSize="24" fontWeight="bold" fill="#1e40af">A</text>
                <text x={circleB.cx + 40} y={circleB.cy} fontSize="24" fontWeight="bold" fill="#991b1b">B</text>
                <text x="200" y="155" fontSize="16" fontWeight="bold" fill="#7c3aed">A∩B</text>
              </>
            ) : (
              <>
                {/* Circle A - filled, moved left */}
                <circle
                  cx={110}
                  cy={150}
                  r={radius}
                  fill="#93c5fd"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  opacity="0.7"
                />

                {/* Circle B - filled, moved right */}
                <circle
                  cx={290}
                  cy={150}
                  r={radius}
                  fill="#fca5a5"
                  stroke="#ef4444"
                  strokeWidth="3"
                  opacity="0.7"
                />

                <text x={60} y={155} fontSize="24" fontWeight="bold" fill="#1e40af">A</text>
                <text x={330} y={155} fontSize="24" fontWeight="bold" fill="#991b1b">B</text>

                {/* No intersection label */}
                <text x="200" y="260" textAnchor="middle" fontSize="14" fill="#dc2626" fontWeight="bold">
                  A ∩ B = ∅
                </text>
              </>
            )}
          </svg>
        </div>
      </motion.div>

      {/* Calculation Example */}
      <motion.div
        key={`calc-${caseType}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-6"
      >
        <h4 className="font-bold text-gray-900 mb-4">계산 예시</h4>

        {caseType === 'general' ? (
          <div className="space-y-3">
            <p className="text-gray-700">
              주사위를 던져서 짝수(A) 또는 3의 배수(B)가 나올 확률은?
            </p>
            <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
              <p>• A = {'{2, 4, 6}'}, P(A) = 3/6 = 1/2</p>
              <p>• B = {'{3, 6}'}, P(B) = 2/6 = 1/3</p>
              <p>• A ∩ B = {'{6}'}, P(A ∩ B) = 1/6</p>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="font-mono text-base">
                  P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
                </p>
                <p className="font-mono text-base mt-1">
                  = 1/2 + 1/3 - 1/6
                </p>
                <p className="font-mono text-base mt-1">
                  = 3/6 + 2/6 - 1/6
                </p>
                <p className="font-mono text-lg font-bold text-indigo-700 mt-2">
                  = 4/6 = 2/3
                </p>
              </div>
              <p className="text-gray-600 mt-2">
                A ∪ B = {'{2, 3, 4, 6}'} → 4개의 결과
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-700">
              카드 한 장을 뽑을 때, 하트(A) 또는 스페이드(B)가 나올 확률은?
            </p>
            <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
              <p>• P(A) = 13/52 = 1/4 (하트 13장)</p>
              <p>• P(B) = 13/52 = 1/4 (스페이드 13장)</p>
              <p>• A ∩ B = ∅ (하트이면서 스페이드일 수 없음)</p>
              <p>• P(A ∩ B) = 0</p>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="font-mono text-base">
                  P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
                </p>
                <p className="font-mono text-base mt-1">
                  = 1/4 + 1/4 - 0
                </p>
                <p className="font-mono text-lg font-bold text-red-700 mt-2">
                  = 1/2
                </p>
              </div>
              <p className="text-gray-600 mt-2">
                배반사건이므로 단순히 P(A) + P(B)로 계산 가능!
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-300 rounded-lg p-4">
        <p className="font-bold text-gray-900 mb-2">💡 기억하세요</p>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• 합사건: "A <span className="font-bold">또는</span> B가 일어남" = A ∪ B</li>
          <li>• 교집합을 빼는 이유: 겹치는 부분을 <span className="font-bold">중복으로 세지 않기 위해</span></li>
          <li>• 배반사건: 교집합이 없으므로 단순히 더하기만 하면 됨</li>
        </ul>
      </div>
    </div>
  );
}
