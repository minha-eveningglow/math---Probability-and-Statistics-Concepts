import { BinomialExpansion } from '../components/BinomialExpansion';

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
          (a + b)<sup>n</sup> = Σ C(n,r) · a<sup>n-r</sup> · b<sup>r</sup>
        </div>
        <div className="mt-4 text-center text-sm text-indigo-100">
          (r = 0부터 n까지)
        </div>
        <div className="mt-4 text-center">
          <a
            href="https://www.youtube.com/watch?v=qbQgXEreQ2c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
          >
            📺 이항정리 강의 영상 보기
          </a>
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
          n값을 변경하여 (a+b)<sup>n</sup>의 전개식을 확인하고, 각 항의 계수가 어떻게 조합의 수와 연결되는지 확인해보세요.
        </p>
        <BinomialExpansion />
      </div>

      {/* Properties of Binomial Coefficients */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl shadow-lg p-8 mb-6 text-white">
          <h2 className="text-3xl font-bold mb-2">⭐ 이항계수의 성질</h2>
          <p className="text-orange-100">이항정리의 힘을 보여주는 핵심 성질들</p>
        </div>

        {/* Basic Definition */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">1. 기본 정의</h3>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border-2 border-purple-300">
            <div className="text-center mb-4">
              <div className="text-2xl font-mono font-bold text-gray-800 mb-2">
                (1 + x)<sup>n</sup> = Σ C(n,r) · x<sup>r</sup>
              </div>
              <div className="text-sm text-gray-600">(r = 0부터 n까지)</div>
            </div>
            <div className="bg-white rounded-lg p-4 mt-4">
              <p className="text-center text-indigo-700 font-bold">
                👉 여기서 C(n,r)이 이항계수
              </p>
            </div>
          </div>
        </div>

        {/* Core Properties */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            ⭐ 2. 핵심 성질 3가지 <span className="text-red-600">(🔥 중요)</span>
          </h3>

          {/* Property 1: Total Sum */}
          <div className="mb-8 border-2 border-blue-300 rounded-lg p-6 bg-blue-50">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="text-xl font-bold text-gray-900">전체 합</h4>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-4 border border-blue-300">
              <div className="text-center text-xl font-mono font-bold text-gray-800">
                C(n,0) + C(n,1) + C(n,2) + ⋯ + C(n,n) = 2<sup>n</sup>
              </div>
            </div>

            <div className="bg-blue-100 rounded-lg p-4 mb-4">
              <p className="font-bold text-blue-900 mb-2">💡 의미</p>
              <ul className="space-y-1 text-blue-800 ml-4">
                <li>• 모든 경우의 수의 합</li>
                <li>• 또는 👉 "선택/비선택 전체 경우"</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-300">
              <p className="font-bold text-blue-900 mb-2">🔑 증명 아이디어</p>
              <div className="text-center">
                <p className="text-lg font-mono text-gray-800">
                  (1 + 1)<sup>n</sup> = 2<sup>n</sup>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  이항정리에서 x = 1을 대입
                </p>
              </div>
            </div>
          </div>

          {/* Property 2: Alternating Sum */}
          <div className="mb-8 border-2 border-green-300 rounded-lg p-6 bg-green-50">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="text-xl font-bold text-gray-900">부호 번갈아 합</h4>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-4 border border-green-300">
              <div className="text-center text-xl font-mono font-bold text-gray-800">
                C(n,0) - C(n,1) + C(n,2) - C(n,3) + ⋯ + (-1)<sup>n</sup>C(n,n) = 0
              </div>
            </div>

            <div className="bg-green-100 rounded-lg p-4 mb-4">
              <p className="font-bold text-green-900 mb-2">💡 의미</p>
              <ul className="space-y-1 text-green-800 ml-4">
                <li>• 짝수/홀수 균형</li>
                <li>• 서로 상쇄됨</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-300">
              <p className="font-bold text-green-900 mb-2">🔑 증명</p>
              <div className="text-center">
                <p className="text-lg font-mono text-gray-800">
                  (1 - 1)<sup>n</sup> = 0
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  이항정리에서 x = -1을 대입
                </p>
              </div>
            </div>
          </div>

          {/* Property 3: Even/Odd Separation */}
          <div className="mb-6 border-2 border-purple-300 rounded-lg p-6 bg-purple-50">
            <div className="flex items-center mb-4">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="text-xl font-bold text-gray-900">짝수 / 홀수 분리</h4>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-4 border border-purple-300 space-y-3">
              <div className="text-center">
                <p className="text-lg font-mono font-bold text-gray-800">
                  C(n,0) + C(n,2) + C(n,4) + ⋯ = 2<sup>n-1</sup>
                </p>
                <p className="text-sm text-purple-600 mt-1">(짝수 인덱스의 합)</p>
              </div>
              <div className="text-center border-t border-purple-200 pt-3">
                <p className="text-lg font-mono font-bold text-gray-800">
                  C(n,1) + C(n,3) + C(n,5) + ⋯ = 2<sup>n-1</sup>
                </p>
                <p className="text-sm text-purple-600 mt-1">(홀수 인덱스의 합)</p>
              </div>
            </div>

            <div className="bg-purple-100 rounded-lg p-4 mb-4">
              <p className="font-bold text-purple-900 mb-2">💡 의미</p>
              <p className="text-purple-800">
                👉 "전체를 반으로 나눈 것"
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-300">
              <p className="font-bold text-purple-900 mb-3">🔑 핵심 아이디어</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center space-x-4">
                  <div className="bg-blue-100 rounded px-4 py-2">
                    <p className="font-mono">(1+1)<sup>n</sup> = 2<sup>n</sup></p>
                    <p className="text-xs text-blue-600 mt-1">x = 1: 전체 합</p>
                  </div>
                  <span className="text-2xl">+</span>
                  <div className="bg-green-100 rounded px-4 py-2">
                    <p className="font-mono">(1-1)<sup>n</sup> = 0</p>
                    <p className="text-xs text-green-600 mt-1">x = -1: 교대 합</p>
                  </div>
                </div>
                <div className="text-center py-2">
                  <p className="text-2xl text-purple-600">⇓</p>
                  <p className="text-xs text-gray-600">두 식을 더하면</p>
                </div>
                <div className="bg-purple-100 rounded p-3 text-center">
                  <p className="font-mono font-bold text-purple-800">
                    2 × [C(n,0) + C(n,2) + C(n,4) + ⋯] = 2<sup>n</sup>
                  </p>
                  <p className="text-purple-700 mt-2">
                    → 짝수 합 = 홀수 합 = 2<sup>n-1</sup>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Summary */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            📊 한눈에 보는 이항계수 성질
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-blue-400">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">🎯</div>
                <p className="font-bold text-blue-700">전체 합</p>
              </div>
              <div className="bg-blue-50 rounded p-3 text-center">
                <p className="font-mono text-sm font-bold">Σ C(n,r) = 2<sup>n</sup></p>
                <p className="text-xs text-blue-600 mt-2">모든 부분집합</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border-2 border-green-400">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">⚖️</div>
                <p className="font-bold text-green-700">교대 합</p>
              </div>
              <div className="bg-green-50 rounded p-3 text-center">
                <p className="font-mono text-sm font-bold">Σ (-1)<sup>r</sup>C(n,r) = 0</p>
                <p className="text-xs text-green-600 mt-2">균형/상쇄</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border-2 border-purple-400">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">✂️</div>
                <p className="font-bold text-purple-700">짝/홀 분리</p>
              </div>
              <div className="bg-purple-50 rounded p-3 text-center">
                <p className="font-mono text-sm font-bold">각각 2<sup>n-1</sup></p>
                <p className="text-xs text-purple-600 mt-2">절반씩</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg p-4 border-2 border-orange-400">
            <p className="text-center font-bold text-orange-900">
              ⚡️ 핵심: (1+x)<sup>n</sup>에서 x = 1, x = -1을 대입하면 강력한 성질들이 나온다!
            </p>
          </div>
        </div>
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
            다항식 (a+b)<sup>n</sup>을 전개했을 때 a<sup>n-r</sup>b<sup>r</sup> 항의 계수
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