import { BinomialExpansion } from '../components/BinomialExpansion';
import { BinomialCoefficients } from '../components/BinomialCoefficients';

export function BinomialTheorem() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          이항정리 (Binomial Theorem)
        </h1>
        <p className="text-xl text-gray-600">
          세기(Counting)가 대수(Algebra)가 되는 순간
        </p>
      </div>

      {/* Main Formula */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">이항정리 공식</h2>
        <div className="bg-white/10 rounded-lg p-6 font-mono text-2xl text-center">
          (a + b)ⁿ = Σ C(n,r) · aⁿ⁻ʳ · bʳ
        </div>
        <div className="mt-4 text-center text-sm text-indigo-100">
          (r = 0부터 n까지)
        </div>
      </div>

      {/* Core Insight */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-3">🔹 핵심 의미</h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-bold">C(n,r)</span> = b를 r번 선택하는 경우의 수
          </p>
          <p className="text-lg font-bold text-indigo-700 mt-4">
            👉 다항식 전개 = 경우의 수 문제
          </p>
        </div>
      </div>

      {/* Interactive Binomial Expansion */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          인터랙티브 이항정리 전개
        </h2>
        <p className="text-gray-600 mb-6">
          n값을 변경하여 (a+b)ⁿ의 전개식을 확인하고, 각 항의 계수가 어떻게 조합의 수와 연결되는지 확인해보세요.
        </p>
        <BinomialExpansion />
      </div>

      {/* Coefficient Visualization */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          계수와 조합의 관계
        </h2>
        <p className="text-gray-600 mb-6">
          이항정리의 각 항의 계수는 조합 C(n,r)과 정확히 일치합니다.
        </p>
        <BinomialCoefficients />
      </div>

      {/* Connection to Counting */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          왜 계수가 조합의 수인가?
        </h2>
        <div className="space-y-4 text-gray-700">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="font-bold text-lg mb-2">예: (a + b)³ 전개하기</h3>
            <p className="mb-3">
              (a + b)³ = (a + b)(a + b)(a + b)
            </p>
            <p className="mb-3">
              세 개의 괄호에서 각각 a 또는 b를 선택하여 곱합니다.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="font-bold text-indigo-600 mr-2">•</span>
                <div>
                  <span className="font-bold">a³ 항:</span> 세 괄호 모두에서 a 선택 → C(3,0) = 1가지
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-indigo-600 mr-2">•</span>
                <div>
                  <span className="font-bold">a²b 항:</span> 세 괄호 중 1개에서 b 선택 → C(3,1) = 3가지
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-indigo-600 mr-2">•</span>
                <div>
                  <span className="font-bold">ab² 항:</span> 세 괄호 중 2개에서 b 선택 → C(3,2) = 3가지
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-indigo-600 mr-2">•</span>
                <div>
                  <span className="font-bold">b³ 항:</span> 세 괄호 모두에서 b 선택 → C(3,3) = 1가지
                </div>
              </li>
            </ul>
            <p className="mt-4 font-bold text-indigo-700">
              결과: (a + b)³ = 1·a³ + 3·a²b + 3·ab² + 1·b³
            </p>
          </div>
        </div>
      </div>

      {/* From Counting to Algebra */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          세기(Counting)가 대수(Algebra)가 되는 순간
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-bold text-indigo-600">조합론(Combinatorics):</span>{' '}
            n개 중에서 r개를 선택하는 방법의 수 C(n,r)
          </p>
          <div className="flex items-center justify-center my-6">
            <div className="text-3xl font-bold text-indigo-600">↓</div>
          </div>
          <p>
            <span className="font-bold text-purple-600">대수학(Algebra):</span>{' '}
            다항식 (a+b)ⁿ을 전개했을 때 aⁿ⁻ʳbʳ 항의 계수
          </p>
          <div className="bg-white rounded-lg p-6 mt-6 border-2 border-purple-300">
            <p className="text-center text-lg font-bold text-gray-800">
              "경우의 수를 세는 방법"과 "식을 전개하는 방법"이 같은 원리로 연결된다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
