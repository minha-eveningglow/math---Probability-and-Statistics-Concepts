import { useState } from 'react';
import { motion } from 'motion/react';

type Scenario = 'with-replacement' | 'without-replacement';

export function IndependenceTestViz() {
  const [scenario, setScenario] = useState<Scenario>('with-replacement');

  return (
    <div className="space-y-6">
      {/* Scenario Selector */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setScenario('with-replacement')}
          className={`p-3 rounded-lg text-sm font-medium transition-all ${
            scenario === 'with-replacement'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          복원 추출 (다시 넣기)
        </button>
        <button
          onClick={() => setScenario('without-replacement')}
          className={`p-3 rounded-lg text-sm font-medium transition-all ${
            scenario === 'without-replacement'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          비복원 추출 (넣지 않기)
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-gray-700">
        <p className="font-semibold text-amber-800 mb-2">문제 설정</p>
        <p>흰 공 3개와 검은 공 2개가 들어 있는 주머니에서 임의로 한 개씩 2번 꺼낼 때,</p>
        <p>A = 첫 번째에 흰 공을 꺼내는 사건, B = 두 번째에 흰 공을 꺼내는 사건</p>
      </div>

      <motion.div
        key={scenario}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {scenario === 'with-replacement' ? <WithReplacement /> : <WithoutReplacement />}
      </motion.div>

      {/* Comparison Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-900 mb-3">독립 vs 종속 비교</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100"></th>
                <th className="border border-gray-300 px-3 py-2 bg-emerald-50 text-emerald-800">복원 추출</th>
                <th className="border border-gray-300 px-3 py-2 bg-red-50 text-red-800">비복원 추출</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium">P(B|A)</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-mono">3/5</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-mono">2/4 = 1/2</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium">P(B|A<sup>c</sup>)</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-mono">3/5</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-mono">3/4</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium">P(B)</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-mono">3/5</td>
                <td className="border border-gray-300 px-3 py-2 text-center font-mono">3/5</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium">P(B|A) = P(B)?</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">같다 → 독립</span>
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-semibold">다르다 → 종속</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Independence Condition */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
        <h4 className="font-semibold text-indigo-900 mb-3">두 사건이 독립일 필요충분조건</h4>
        <div className="bg-white border border-indigo-200 rounded p-3 font-mono text-center text-lg mb-3">
          P(A∩B) = P(A) × P(B)
        </div>
        <div className="text-sm text-gray-700 space-y-2">
          <p><span className="font-semibold">증명 (→):</span> A, B가 독립이면 P(B|A) = P(B)이므로, 곱셈정리에 의하여</p>
          <p className="font-mono pl-4">P(A∩B) = P(A)P(B|A) = P(A)P(B)</p>
          <p><span className="font-semibold">증명 (←):</span> P(A∩B) = P(A)P(B)이면</p>
          <p className="font-mono pl-4">P(B|A) = P(A∩B)/P(A) = P(A)P(B)/P(A) = P(B)</p>
          <p className="font-mono pl-4">따라서 A, B는 서로 독립이다.</p>
        </div>
      </div>
    </div>
  );
}

function WithReplacement() {
  return (
    <div className="space-y-4">
      {/* Ball visualization */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-center mb-3">
          <svg viewBox="0 0 400 100" className="w-full max-w-sm">
            <rect x="50" y="10" width="300" height="80" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
            <text x="200" y="30" textAnchor="middle" fontSize="11" fill="#065f46">복원 추출: 꺼낸 공을 다시 넣음</text>
            {[0, 1, 2].map(i => (
              <circle key={`w-${i}`} cx={120 + i * 45} cy={60} r="14" fill="white" stroke="#6b7280" strokeWidth="2" />
            ))}
            {[0, 1].map(i => (
              <circle key={`b-${i}`} cx={260 + i * 45} cy={60} r="14" fill="#374151" stroke="#1f2937" strokeWidth="2" />
            ))}
          </svg>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
            <p className="font-semibold text-emerald-800 text-sm mb-2">A가 일어났을 때 (첫 번째: 흰 공)</p>
            <p className="font-mono text-sm">공을 다시 넣으므로 여전히 흰 3, 검 2</p>
            <p className="font-mono text-sm font-semibold mt-1">P(B|A) = 3/5</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
            <p className="font-semibold text-emerald-800 text-sm mb-2">A가 안 일어났을 때 (첫 번째: 검은 공)</p>
            <p className="font-mono text-sm">공을 다시 넣으므로 여전히 흰 3, 검 2</p>
            <p className="font-mono text-sm font-semibold mt-1">P(B|A<sup>c</sup>) = 3/5</p>
          </div>
        </div>

        <div className="bg-emerald-100 border border-emerald-300 rounded-lg p-3 mt-3 text-center">
          <p className="font-semibold text-emerald-900">
            P(B|A) = P(B|A<sup>c</sup>) = P(B) = 3/5
          </p>
          <p className="text-emerald-800 text-sm mt-1">→ 두 사건 A, B는 서로 <strong>독립</strong>이다.</p>
        </div>
      </div>
    </div>
  );
}

function WithoutReplacement() {
  return (
    <div className="space-y-4">
      {/* Ball visualization */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-center mb-3">
          <svg viewBox="0 0 400 100" className="w-full max-w-sm">
            <rect x="50" y="10" width="300" height="80" rx="12" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
            <text x="200" y="30" textAnchor="middle" fontSize="11" fill="#991b1b">비복원 추출: 꺼낸 공을 넣지 않음</text>
            {[0, 1, 2].map(i => (
              <circle key={`w-${i}`} cx={120 + i * 45} cy={60} r="14" fill="white" stroke="#6b7280" strokeWidth="2" />
            ))}
            {[0, 1].map(i => (
              <circle key={`b-${i}`} cx={260 + i * 45} cy={60} r="14" fill="#374151" stroke="#1f2937" strokeWidth="2" />
            ))}
          </svg>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="font-semibold text-red-800 text-sm mb-2">A가 일어났을 때 (첫 번째: 흰 공)</p>
            <p className="font-mono text-sm">남은 공: 흰 2, 검 2 (총 4개)</p>
            <p className="font-mono text-sm font-semibold mt-1">P(B|A) = 2/4 = 1/2</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="font-semibold text-red-800 text-sm mb-2">A가 안 일어났을 때 (첫 번째: 검은 공)</p>
            <p className="font-mono text-sm">남은 공: 흰 3, 검 1 (총 4개)</p>
            <p className="font-mono text-sm font-semibold mt-1">P(B|A<sup>c</sup>) = 3/4</p>
          </div>
        </div>

        <div className="bg-red-100 border border-red-300 rounded-lg p-3 mt-3 text-center">
          <p className="font-semibold text-red-900">
            P(B|A) = 1/2 ≠ P(B|A<sup>c</sup>) = 3/4
          </p>
          <p className="text-red-800 text-sm mt-1">→ 두 사건 A, B는 서로 <strong>종속</strong>이다.</p>
        </div>
      </div>
    </div>
  );
}
