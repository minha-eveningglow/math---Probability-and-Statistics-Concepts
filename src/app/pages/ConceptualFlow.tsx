import { ArrowDown } from 'lucide-react';

export function ConceptualFlow() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            개념의 흐름
          </h1>
          <p className="text-xl text-gray-600">
            조합론에서 확률분포까지, 수학적 연결고리를 한눈에
          </p>
        </div>

        {/* Section 1: 조합론 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
              1
            </div>
            <h2 className="text-3xl font-bold text-gray-900">조합론 (Combinatorics)</h2>
          </div>
          
          <p className="text-lg text-gray-700 mb-4">
            모든 것은 <span className="font-bold text-blue-600">세기(Counting)</span>에서 시작됩니다
          </p>

          <div className="bg-blue-50 rounded-xl p-6 space-y-3">
            <div className="text-lg">
              <span className="font-bold text-blue-700">순열 (Permutation):</span> ₙPᵣ = n! / (n-r)!
            </div>
            <div className="text-lg">
              <span className="font-bold text-blue-700">조합 (Combination):</span> ₙCᵣ = n! / [r!(n-r)!]
            </div>
            <p className="text-gray-600 mt-4">
              "n개 중에서 r개를 선택하는 경우의 수"를 계산합니다
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <ArrowDown className="w-8 h-8 text-gray-400" />
        </div>

        {/* Section 2: 이항정리 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
              2
            </div>
            <h2 className="text-3xl font-bold text-gray-900">이항정리 (Binomial Theorem)</h2>
          </div>
          
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-bold text-purple-600">세기가 대수(Algebra)가 되는 순간</span>
          </p>

          <div className="bg-purple-50 rounded-xl p-6">
            <div className="text-2xl font-mono text-center mb-4 text-purple-800">
              (a + b)<sup>n</sup> = Σ C(n,r) · a<sup>n-r</sup> · b<sup>r</sup>
            </div>
            
            <div className="border-t border-purple-200 pt-4 space-y-2">
              <div className="font-mono text-lg">
                n=3: <span className="text-purple-600 font-bold">1</span>a³ + <span className="text-purple-600 font-bold">3</span>a²b + <span className="text-purple-600 font-bold">3</span>ab² + <span className="text-purple-600 font-bold">1</span>b³
              </div>
              <div className="font-mono text-lg">
                n=4: <span className="text-purple-600 font-bold">1</span>a⁴ + <span className="text-purple-600 font-bold">4</span>a³b + <span className="text-purple-600 font-bold">6</span>a²b² + <span className="text-purple-600 font-bold">4</span>ab³ + <span className="text-purple-600 font-bold">1</span>b⁴
              </div>
            </div>

            <p className="text-gray-600 mt-4">
              계수는 바로 조합의 수 C(n,r)입니다. 세기의 결과가 대수적 전개의 계수가 됩니다.
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <ArrowDown className="w-8 h-8 text-gray-400" />
        </div>

        {/* Section 3: 파스칼의 삼각형 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
              3
            </div>
            <h2 className="text-3xl font-bold text-gray-900">파스칼의 삼각형</h2>
          </div>
          
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-bold text-pink-600">기하학적 패턴</span>으로 나타난 이항계수
          </p>

          <div className="bg-pink-50 rounded-xl p-6">
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-pink-200 rounded flex items-center justify-center font-bold">1</div>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-pink-200 rounded flex items-center justify-center font-bold">1</div>
                <div className="w-10 h-10 bg-pink-200 rounded flex items-center justify-center font-bold">1</div>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-pink-300 rounded flex items-center justify-center font-bold">1</div>
                <div className="w-10 h-10 bg-pink-300 rounded flex items-center justify-center font-bold">2</div>
                <div className="w-10 h-10 bg-pink-300 rounded flex items-center justify-center font-bold">1</div>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-pink-400 rounded flex items-center justify-center font-bold text-white">1</div>
                <div className="w-10 h-10 bg-pink-400 rounded flex items-center justify-center font-bold text-white">3</div>
                <div className="w-10 h-10 bg-pink-400 rounded flex items-center justify-center font-bold text-white">3</div>
                <div className="w-10 h-10 bg-pink-400 rounded flex items-center justify-center font-bold text-white">1</div>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-pink-500 rounded flex items-center justify-center font-bold text-white">1</div>
                <div className="w-10 h-10 bg-pink-500 rounded flex items-center justify-center font-bold text-white">4</div>
                <div className="w-10 h-10 bg-pink-500 rounded flex items-center justify-center font-bold text-white">6</div>
                <div className="w-10 h-10 bg-pink-500 rounded flex items-center justify-center font-bold text-white">4</div>
                <div className="w-10 h-10 bg-pink-500 rounded flex items-center justify-center font-bold text-white">1</div>
              </div>
            </div>

            <div className="border-t border-pink-200 pt-4 space-y-2">
              <p className="text-gray-700">
                <span className="font-bold">재귀 관계:</span> C(n,r) = C(n-1,r-1) + C(n-1,r)
              </p>
              <p className="text-gray-700">
                <span className="font-bold">각 행의 합:</span> 2<sup>n</sup>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <ArrowDown className="w-8 h-8 text-gray-400" />
        </div>

        {/* Section 4: 확률 기초 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
              4
            </div>
            <h2 className="text-3xl font-bold text-gray-900">확률 기초 (Probability Basics)</h2>
          </div>

          <p className="text-lg text-gray-700 mb-4">
            조합론이 <span className="font-bold text-cyan-600">확률</span>로 전환되는 시작점
          </p>

          <div className="bg-cyan-50 rounded-xl p-6">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 border-2 border-cyan-300">
                <div className="font-bold text-cyan-700 mb-2">1️⃣ 확률 입문</div>
                <div className="text-sm text-gray-700">
                  • 시행, 표본공간, 사건<br/>
                  • 확률의 정의<br/>
                  • 수학적 vs 통계적 확률
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border-2 border-cyan-300">
                <div className="font-bold text-cyan-700 mb-2">2️⃣ 기본 성질</div>
                <div className="text-sm text-gray-700">
                  • 확률의 공리와 성질<br/>
                  • 기하적 확률<br/>
                  • 사건의 연산
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border-2 border-cyan-300">
                <div className="font-bold text-cyan-700 mb-2">3️⃣ 계산 법칙</div>
                <div className="text-sm text-gray-700">
                  • 덧셈정리<br/>
                  • 배반사건, 여사건<br/>
                  • 드모르간의 법칙
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-cyan-800 mb-2">핵심 개념:</p>
              <p className="text-gray-700">
                P(A) = n(A) / n(S) — 경우의 수가 확률이 되는 순간
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <ArrowDown className="w-8 h-8 text-gray-400" />
        </div>

        {/* Section 5: 이항분포 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
              5
            </div>
            <h2 className="text-3xl font-bold text-gray-900">이항분포 (Binomial Distribution)</h2>
          </div>

          <p className="text-lg text-gray-700 mb-4">
            조합론과 확률이 <span className="font-bold text-indigo-600">결합</span>되는 순간
          </p>

          <div className="bg-indigo-50 rounded-xl p-6">
            <div className="text-xl text-center mb-4 text-indigo-800">
              P(X = r) = C(n,r) · p<sup>r</sup> · (1-p)<sup>n-r</sup>
            </div>

            <div className="border-t border-indigo-200 pt-4 space-y-2">
              <p className="text-gray-700">
                <span className="font-bold">n번 시행</span>에서 <span className="font-bold">r번 성공</span>할 확률
              </p>
              <p className="text-gray-700">
                <span className="font-bold">C(n,r):</span> r번 성공이 일어나는 경우의 수
              </p>
              <p className="text-gray-700">
                <span className="font-bold">p<sup>r</sup>(1-p)<sup>n-r</sup>:</span> 각 경우가 일어날 확률
              </p>
              <p className="text-gray-600 mt-4">
                예: 동전을 10번 던져서 앞면이 정확히 6번 나올 확률
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <ArrowDown className="w-8 h-8 text-gray-400" />
        </div>

        {/* Section 6: 정규분포 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
              6
            </div>
            <h2 className="text-3xl font-bold text-gray-900">정규분포 (Normal Distribution)</h2>
          </div>
          
          <p className="text-lg text-gray-700 mb-4">
            이항분포의 <span className="font-bold text-emerald-600">극한</span> - 이산에서 연속으로
          </p>

          <div className="bg-emerald-50 rounded-xl p-6">
            <div className="text-xl text-center mb-4 text-emerald-800">
              n → ∞ 일 때, 이항분포 → 정규분포
            </div>

            <div className="border-t border-emerald-200 pt-4 space-y-3">
              <p className="text-gray-700">
                <span className="font-bold">중심극한정리:</span> 충분히 많은 독립적인 시행을 반복하면, 그 합의 분포는 정규분포에 가까워집니다
              </p>
              <p className="text-gray-700">
                <span className="font-bold">평균 μ:</span> np
              </p>
              <p className="text-gray-700">
                <span className="font-bold">표준편차 σ:</span> √(np(1-p))
              </p>
              <div className="bg-white rounded p-4 mt-4">
                <svg viewBox="0 0 400 200" className="w-full h-40">
                  {/* Bell curve */}
                  <path
                    d="M 20 180 Q 50 180 80 160 T 140 100 T 200 20 T 260 100 T 320 160 T 380 180"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                  {/* X axis */}
                  <line x1="20" y1="180" x2="380" y2="180" stroke="#9ca3af" strokeWidth="2" />
                  {/* Mean line */}
                  <line x1="200" y1="20" x2="200" y2="180" stroke="#059669" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="200" y="195" textAnchor="middle" fontSize="14" fill="#059669">μ</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-2xl shadow-lg p-8 text-white mt-12">
          <h2 className="text-3xl font-bold mb-4">연결고리 요약</h2>
          <div className="space-y-3 text-lg">
            <p>🔢 <span className="font-bold">조합론</span> → 경우의 수를 센다</p>
            <p>➕ <span className="font-bold">이항정리</span> → 세기가 대수 전개의 계수가 된다</p>
            <p>📐 <span className="font-bold">파스칼 삼각형</span> → 계수들의 기하학적 패턴</p>
            <p>🎯 <span className="font-bold">확률 기초</span> → 경우의 수가 확률이 된다</p>
            <p>🎲 <span className="font-bold">이항분포</span> → 조합과 확률이 결합된다</p>
            <p>📈 <span className="font-bold">정규분포</span> → 이산이 연속이 되는 극한</p>
          </div>
          <div className="mt-6 pt-6 border-t border-white/30">
            <p className="text-cyan-100 italic">
              조합론에서 시작하여 확률의 세계로 들어가고, 마침내 통계의 핵심인 정규분포에 도달합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
