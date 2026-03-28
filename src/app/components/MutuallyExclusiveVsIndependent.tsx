import { useState } from 'react';
import { motion } from 'motion/react';

export function MutuallyExclusiveVsIndependent() {
  const [scenario, setScenario] = useState<'mutually-exclusive' | 'independent'>('mutually-exclusive');

  const scenarios = {
    'mutually-exclusive': {
      title: '배반 사건 (Mutually Exclusive)',
      color: 'red',
      example: '주사위를 한 번 던질 때',
      eventA: 'A: 짝수가 나옴 {2,4,6}',
      eventB: 'B: 5가 나옴 {5}',
      probA: '3/6 = 1/2',
      probB: '1/6',
      probIntersection: '0',
      explanation: '짝수가 나오면서 동시에 5가 나올 수 없음',
      relationship: 'A와 B는 동시에 일어날 수 없음 → 매우 강한 관계',
      check: 'P(A ∩ B) = 0 ✓',
      independence: 'P(A) × P(B) = 1/2 × 1/6 = 1/12 ≠ 0',
      conclusion: '배반이지만 독립이 아님!',
    },
    'independent': {
      title: '독립 사건 (Independent)',
      color: 'blue',
      example: '주사위를 두 번 던질 때',
      eventA: 'A: 첫 번째 던지기에서 짝수',
      eventB: 'B: 두 번째 던지기에서 5',
      probA: '1/2',
      probB: '1/6',
      probIntersection: '1/12',
      explanation: '첫 번째 결과가 두 번째에 영향을 주지 않음',
      relationship: '서로 영향을 주지 않음 → 관계 없음',
      check: 'P(A ∩ B) = 1/12 ≠ 0',
      independence: 'P(A) × P(B) = 1/2 × 1/6 = 1/12 ✓',
      conclusion: '독립이지만 배반이 아님!',
    },
  };

  const current = scenarios[scenario];
  const isMutuallyExclusive = scenario === 'mutually-exclusive';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-xl font-bold text-gray-900 text-center">
        배반 vs 독립: 구체적인 예시로 이해하기
      </h3>

      {/* Scenario Selector */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setScenario('mutually-exclusive')}
          className={`p-4 rounded-lg border-2 transition-all ${
            scenario === 'mutually-exclusive'
              ? 'bg-red-500 text-white border-red-600'
              : 'bg-gray-50 border-gray-300 hover:border-red-400 text-gray-900'
          }`}
        >
          <div className="font-bold mb-1">배반 사건</div>
          <div className="text-xs opacity-90">동시에 일어날 수 없음</div>
        </button>

        <button
          onClick={() => setScenario('independent')}
          className={`p-4 rounded-lg border-2 transition-all ${
            scenario === 'independent'
              ? 'bg-blue-500 text-white border-blue-600'
              : 'bg-gray-50 border-gray-300 hover:border-blue-400 text-gray-900'
          }`}
        >
          <div className="font-bold mb-1">독립 사건</div>
          <div className="text-xs opacity-90">서로 영향 없음</div>
        </button>
      </div>

      {/* Visualization */}
      <motion.div
        key={scenario}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`${isMutuallyExclusive ? 'bg-red-50 border-red-300' : 'bg-blue-50 border-blue-300'} border-2 rounded-lg p-6`}
      >
        <h4 className="text-lg font-bold text-gray-900 mb-4">{current.title}</h4>

        {/* Example */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="font-bold text-gray-900 mb-2">{current.example}</p>
          <div className="space-y-1 text-sm">
            <p>• {current.eventA}</p>
            <p>• {current.eventB}</p>
          </div>
        </div>

        {/* Venn Diagram */}
        <div className="flex justify-center mb-4">
          <svg width="300" height="200" viewBox="0 0 300 200">
            {/* Sample Space */}
            <rect x="10" y="10" width="280" height="180" rx="10" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" />
            <text x="20" y="30" fontSize="12" fontWeight="bold" fill="#4b5563">S</text>

            {isMutuallyExclusive ? (
              // Mutually Exclusive: Non-overlapping circles
              <>
                <circle cx="100" cy="100" r="40" fill="#fca5a5" stroke="#dc2626" strokeWidth="2" opacity="0.7" />
                <circle cx="200" cy="100" r="40" fill="#93c5fd" stroke="#2563eb" strokeWidth="2" opacity="0.7" />
                <text x="90" y="105" fontSize="20" fontWeight="bold" fill="#7f1d1d">A</text>
                <text x="190" y="105" fontSize="20" fontWeight="bold" fill="#1e3a8a">B</text>
              </>
            ) : (
              // Independent: Overlapping circles showing both can happen
              <>
                <circle cx="120" cy="100" r="45" fill="#fca5a5" stroke="#dc2626" strokeWidth="2" opacity="0.5" />
                <circle cx="180" cy="100" r="45" fill="#93c5fd" stroke="#2563eb" strokeWidth="2" opacity="0.5" />
                {/* Intersection */}
                <circle cx="180" cy="100" r="45" clipPath="url(#clipIndepA)" fill="#c084fc" opacity="0.6" />
                <defs>
                  <clipPath id="clipIndepA">
                    <circle cx="120" cy="100" r="45" />
                  </clipPath>
                </defs>
                <text x="105" y="105" fontSize="18" fontWeight="bold" fill="#7f1d1d">A</text>
                <text x="170" y="105" fontSize="18" fontWeight="bold" fill="#1e3a8a">B</text>
                <text x="145" y="105" fontSize="12" fontWeight="bold" fill="#581c87">AB</text>
              </>
            )}
          </svg>
        </div>

        {/* Calculations */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <h5 className="font-bold text-gray-900 mb-2">확률 계산</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-gray-50 rounded p-3">
              <p className="font-bold text-red-600">P(A)</p>
              <p className="font-mono">{current.probA}</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="font-bold text-blue-600">P(B)</p>
              <p className="font-mono">{current.probB}</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="font-bold text-purple-600">P(A ∩ B)</p>
              <p className="font-mono">{current.probIntersection}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">의미:</span> {current.explanation}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              <span className="font-bold">관계:</span> {current.relationship}
            </p>
          </div>
        </div>

        {/* Verification */}
        <div className="mt-4 space-y-2">
          <div className={`${isMutuallyExclusive ? 'bg-red-100 border-red-300' : 'bg-blue-100 border-blue-300'} border rounded-lg p-3`}>
            <p className="text-sm font-bold mb-1">배반 검증:</p>
            <p className="text-sm font-mono">{current.check}</p>
          </div>
          <div className={`${!isMutuallyExclusive ? 'bg-blue-100 border-blue-300' : 'bg-gray-100 border-gray-300'} border rounded-lg p-3`}>
            <p className="text-sm font-bold mb-1">독립 검증:</p>
            <p className="text-sm font-mono">{current.independence}</p>
          </div>
        </div>

        {/* Conclusion */}
        <div className="mt-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
          <p className="font-bold text-gray-900 text-center text-lg">
            {current.conclusion}
          </p>
        </div>
      </motion.div>

      {/* Comparison Table */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
        <h4 className="font-bold text-gray-900 mb-4 text-center">핵심 차이점 정리</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="px-3 py-2 text-left">항목</th>
                <th className="px-3 py-2 text-left bg-red-50">배반 사건</th>
                <th className="px-3 py-2 text-left bg-blue-50">독립 사건</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-3 py-2 font-bold">정의</td>
                <td className="px-3 py-2 bg-red-50">동시 발생 불가능</td>
                <td className="px-3 py-2 bg-blue-50">영향 없음</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-3 py-2 font-bold">조건</td>
                <td className="px-3 py-2 bg-red-50 font-mono">P(A ∩ B) = 0</td>
                <td className="px-3 py-2 bg-blue-50 font-mono">P(A ∩ B) = P(A)P(B)</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-3 py-2 font-bold">관계</td>
                <td className="px-3 py-2 bg-red-50">매우 강함</td>
                <td className="px-3 py-2 bg-blue-50">없음</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold">예시</td>
                <td className="px-3 py-2 bg-red-50">한 번 던진 주사위에서 짝수와 홀수</td>
                <td className="px-3 py-2 bg-blue-50">두 번 던진 주사위의 각 결과</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
