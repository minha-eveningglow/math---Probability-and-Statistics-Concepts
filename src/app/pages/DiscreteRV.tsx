import { Link } from 'react-router';
import { BarChart2, ArrowRight, BookOpen, Calculator, Zap, TrendingUp, ExternalLink, Youtube } from 'lucide-react';
import { PMFChart } from '../components/PMFChart';
import { BinomialDistribution } from '../components/BinomialDistribution';
import { LawOfLargeNumbers } from '../components/LawOfLargeNumbers';

export function DiscreteRV() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-full mb-4">
          <BarChart2 className="w-8 h-8 text-violet-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">이산확률변수</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          확률변수의 정의부터 확률질량함수(PMF), 기댓값·분산·표준편차, 이항분포, 큰수의 법칙까지
        </p>
      </div>

      {/* 학습 흐름 */}
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-bold text-violet-900 mb-4">학습 흐름</h2>
        <div className="grid md:grid-cols-5 gap-3">
          {[
            { step: '1', title: '확률변수', sub: '표본공간 → 실수' },
            { step: '2', title: 'PMF', sub: 'P(X=xᵢ)=pᵢ' },
            { step: '3', title: 'E(X) V(X) σ(X)', sub: '기댓값·분산·표준편차' },
            { step: '4', title: 'aX+b', sub: '선형변환 공식' },
            { step: '5', title: '이항분포·큰수의 법칙', sub: 'B(n,p) & 수렴' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border-l-4 border-violet-500 text-center">
              <div className="text-xs font-bold text-violet-600 mb-1">{s.step}단계</div>
              <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. 확률변수와 확률분포 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <BookOpen className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">1. 확률변수와 확률분포</h2>
          </div>
          <p className="text-violet-100">
            시행의 결과에 실수를 대응시켜 확률을 계산할 수 있게 만든 함수
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* 확률변수 */}
          <div className="bg-white border-2 border-violet-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-violet-800 mb-3">확률변수 (Random Variable)</h3>
            <p className="text-gray-700 mb-3">
              어떤 시행에서 <span className="font-semibold text-violet-700">표본공간의 각 원소에
              하나의 실수가 대응</span>되는 함수를 <strong>확률변수</strong>라 하고,
              보통 X, Y, Z 로 나타낸다.
            </p>
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 text-sm">
              <p className="font-semibold mb-1">예) 동전 2번 던지기</p>
              <p className="font-mono">S = {'{'} HH, HT, TH, TT {'}'}</p>
              <p className="font-mono mt-1">
                HH → 2, HT → 1, TH → 1, TT → 0
              </p>
              <p className="mt-1 text-violet-700">∴ X는 앞면이 나오는 횟수 = 확률변수</p>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              이때 확률변수 X가 값 x를 가질 확률은{' '}
              <span className="font-mono font-semibold">P(X = x)</span>로 나타낸다.
            </p>
          </div>

          {/* 확률분포 */}
          <div className="bg-white border-2 border-purple-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-purple-800 mb-3">확률분포 (Probability Distribution)</h3>
            <p className="text-gray-700 mb-3">
              확률변수 X가 갖는 <span className="font-semibold text-purple-700">값과 이 값을 가질
              확률의 대응 관계</span>를 X의 <strong>확률분포</strong>라 한다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="border border-purple-200 px-3 py-1.5">X</th>
                    <th className="border border-purple-200 px-3 py-1.5">0</th>
                    <th className="border border-purple-200 px-3 py-1.5">1</th>
                    <th className="border border-purple-200 px-3 py-1.5">2</th>
                    <th className="border border-purple-200 px-3 py-1.5">합계</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-1.5 text-center font-medium bg-gray-50">P(X=x)</td>
                    <td className="border border-gray-200 px-3 py-1.5 text-center">1/4</td>
                    <td className="border border-gray-200 px-3 py-1.5 text-center">2/4</td>
                    <td className="border border-gray-200 px-3 py-1.5 text-center">1/4</td>
                    <td className="border border-gray-200 px-3 py-1.5 text-center font-bold text-purple-700">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              확률분포표로 나타내면 각 값에 대한 확률을 한눈에 파악할 수 있다.
            </p>
          </div>
        </div>

        {/* 이산확률변수 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">이산확률변수 (Discrete Random Variable)</h3>
          <p className="text-gray-700 mb-4">
            확률변수가 갖는 값이 <span className="font-semibold text-violet-600">유한개이거나
            무한히 많더라도 자연수와 같이 일일이 셀 수 있을 때</span>,
            이 확률변수를 <strong>이산확률변수</strong>라 한다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-semibold text-green-800 mb-2">이산확률변수 예시</p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 동전을 n번 던질 때 앞면이 나오는 횟수</li>
                <li>• 주사위를 던질 때 나오는 눈의 수 (1~6)</li>
                <li>• 하루 동안 발생하는 교통사고 건수</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-semibold text-red-800 mb-2">연속확률변수 예시 (나중에 배움)</p>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• 사람의 키, 몸무게</li>
                <li>• 버스 대기 시간</li>
                <li>• 제품의 수명 시간</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 확률질량함수 (PMF) ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <BarChart2 className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">2. 확률질량함수 (PMF)</h2>
          </div>
          <p className="text-blue-100">
            이산확률변수의 각 값에 확률을 대응시키는 함수
          </p>
        </div>

        {/* 정의 */}
        <div className="bg-white border-2 border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">정의</h3>
          <p className="text-gray-700 mb-4">
            이산확률변수 X가 갖는 모든 값 x₁, x₂, x₃, …, xₙ에 이 값을 가질 확률 p₁, p₂, p₃, …, pₙ이
            대응되는 함수
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center font-mono text-lg mb-4">
            <p className="text-blue-900 font-bold">P(X = xᵢ) = pᵢ &nbsp; (i = 1, 2, 3, …, n)</p>
          </div>
          <p className="text-sm text-gray-600">
            를 이산확률변수 X의 <strong>확률질량함수(Probability Mass Function, PMF)</strong>라 한다.
          </p>

          {/* 성질 */}
          <div className="mt-5">
            <h4 className="font-bold text-gray-900 mb-3">확률질량함수의 성질</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <div className="text-sm font-bold text-sky-700 mb-1">(1) 비음성</div>
                <div className="font-mono text-center text-sky-900 font-semibold">0 ≤ pᵢ ≤ 1</div>
                <p className="text-xs text-gray-500 mt-2">확률은 0에서 1 사이의 값</p>
              </div>
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <div className="text-sm font-bold text-sky-700 mb-1">(2) 정규화</div>
                <div className="font-mono text-center text-sky-900 font-semibold">p₁ + p₂ + … + pₙ = 1</div>
                <p className="text-xs text-gray-500 mt-2">모든 확률의 합 = 1</p>
              </div>
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <div className="text-sm font-bold text-sky-700 mb-1">(3) 구간 확률</div>
                <div className="font-mono text-center text-sky-900 text-sm font-semibold">P(xᵢ≤X≤xⱼ) = pᵢ+…+pⱼ</div>
                <p className="text-xs text-gray-500 mt-2">구간의 확률은 합산</p>
              </div>
            </div>
          </div>
        </div>

        {/* 인터랙티브 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            확률분포표 & 그래프 탐색기
          </h3>
          <PMFChart />
        </div>
      </section>

      {/* ── 3. 기댓값, 분산, 표준편차 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <Zap className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">3. 기댓값 · 분산 · 표준편차</h2>
          </div>
          <p className="text-emerald-100">
            이산확률변수의 대표값과 흩어진 정도를 수치로 표현한다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* 기댓값 */}
          <div className="bg-white border-2 border-emerald-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-emerald-800 mb-3">기댓값(평균) E(X)</h3>
            <p className="text-sm text-gray-700 mb-3">
              확률을 가중치로 사용한 X의 가중평균. "평균적으로 기대되는 값"
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center font-mono">
              <p className="font-bold text-emerald-900">E(X) = Σ xᵢpᵢ</p>
              <p className="text-xs text-gray-500 mt-1">= x₁p₁ + x₂p₂ + … + xₙpₙ</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">E는 Expectation(기댓값)의 첫 글자</p>
          </div>

          {/* 분산 */}
          <div className="bg-white border-2 border-purple-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-purple-800 mb-3">분산 V(X)</h3>
            <p className="text-sm text-gray-700 mb-3">
              편차²의 기댓값. 값들이 평균 주위에 얼마나 흩어져 있는지 나타낸다.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center font-mono">
              <p className="font-bold text-purple-900">V(X) = E((X−m)²)</p>
              <p className="text-xs text-gray-500 mt-1">= Σ (xᵢ−m)²pᵢ</p>
              <p className="text-xs text-indigo-700 mt-1 font-semibold">= E(X²) − {'{E(X)}²'}</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">V는 Variance(분산)의 첫 글자</p>
          </div>

          {/* 표준편차 */}
          <div className="bg-white border-2 border-indigo-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-indigo-800 mb-3">표준편차 σ(X)</h3>
            <p className="text-sm text-gray-700 mb-3">
              분산의 양의 제곱근. X와 같은 단위를 가지므로 해석이 쉽다.
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-center font-mono">
              <p className="font-bold text-indigo-900">σ(X) = √V(X)</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">σ는 Standard deviation의 첫 글자 S에 해당하는 그리스 문자 시그마(sigma)</p>
          </div>
        </div>

        {/* 분산 공식 증명 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            V(X) = E(X²) − {'{E(X)}²'} 증명
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1 overflow-x-auto">
            <p>V(X) = Σ (xᵢ−m)²pᵢ</p>
            <p className="pl-8">= Σ (xᵢ²−2mxᵢ+m²)pᵢ</p>
            <p className="pl-8">= Σ xᵢ²pᵢ − 2m·Σ xᵢpᵢ + m²·Σ pᵢ</p>
            <p className="pl-8 text-blue-700">← Σ xᵢpᵢ = m, Σ pᵢ = 1 을 이용</p>
            <p className="pl-8">= E(X²) − 2m·m + m²</p>
            <p className="pl-8">= E(X²) − m²</p>
            <p className="pl-8 font-bold text-indigo-700">= E(X²) − {'{E(X)}²'}</p>
          </div>
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>실용 팁:</strong> 분산을 계산할 때{' '}
              <span className="font-mono">V(X) = E(X²) − {'{E(X)}²'}</span> 공식을 쓰면
              편차를 일일이 구하지 않아도 돼서 계산이 훨씬 빠릅니다.
            </p>
          </div>
        </div>

        {/* 예제 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">예제</h3>
          <div className="overflow-x-auto mb-4">
            <table className="text-sm border-collapse mx-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2">X</th>
                  <th className="border border-gray-300 px-4 py-2">1</th>
                  <th className="border border-gray-300 px-4 py-2">2</th>
                  <th className="border border-gray-300 px-4 py-2">3</th>
                  <th className="border border-gray-300 px-4 py-2">4</th>
                  <th className="border border-gray-300 px-4 py-2">합계</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">P(X=x)</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">3/7</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">2/7</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">1/7</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">1/7</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold">1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
            <p>
              <span className="font-bold text-blue-700">E(X)</span> = 1×3/7 + 2×2/7 + 3×1/7 + 4×1/7 = <strong>2</strong>
            </p>
            <p>
              <span className="font-bold text-purple-700">E(X²)</span> = 1²×3/7 + 2²×2/7 + 3²×1/7 + 4²×1/7 = 36/7
            </p>
            <p>
              <span className="font-bold text-purple-700">V(X)</span> = 36/7 − 2² = 36/7 − 28/7 = <strong>8/7</strong>
            </p>
            <p>
              <span className="font-bold text-indigo-700">σ(X)</span> = √(8/7) = 2√14 / 7
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. aX+b ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <Calculator className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">4. 이산확률변수 aX + b의 평균·분산·표준편차</h2>
          </div>
          <p className="text-orange-100">
            X를 선형 변환해도 공식 하나로 모든 통계량을 구할 수 있다
          </p>
        </div>

        <div className="bg-white border-2 border-orange-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">공식 (a ≠ 0)</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="text-sm font-bold text-orange-700 mb-2">(1) 평균</div>
              <div className="font-mono text-lg font-bold text-orange-900">E(aX+b) = aE(X)+b</div>
              <p className="text-xs text-gray-500 mt-2">b만큼 이동, a배 확대</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="text-sm font-bold text-orange-700 mb-2">(2) 분산</div>
              <div className="font-mono text-lg font-bold text-orange-900">V(aX+b) = a²V(X)</div>
              <p className="text-xs text-gray-500 mt-2">b는 흩어짐에 영향 없음, a²배</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="text-sm font-bold text-orange-700 mb-2">(3) 표준편차</div>
              <div className="font-mono text-lg font-bold text-orange-900">σ(aX+b) = |a|σ(X)</div>
              <p className="text-xs text-gray-500 mt-2">|a|배 (음수 불가)</p>
            </div>
          </div>

          {/* 직관적 설명 */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="font-semibold text-amber-900 mb-2">왜 V(aX+b) = a²V(X)일까?</p>
            <p className="text-sm text-amber-800">
              분산은 <em>"값들이 평균에서 얼마나 떨어져 있는가"</em>를 측정합니다.
              b를 더하면 모든 값과 평균이 같이 이동하므로 <strong>흩어짐(분산)은 변하지 않습니다</strong>.
              a를 곱하면 모든 편차가 a배 커지므로, 편차²의 기댓값인 분산은 <strong>a²배</strong>가 됩니다.
            </p>
          </div>

          {/* 예제 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-2">예제: E(X)=3, V(X)=2일 때 Y=2X+3</p>
            <div className="font-mono text-sm space-y-1 text-gray-700">
              <p>E(Y) = 2·E(X)+3 = 2×3+3 = <strong>9</strong></p>
              <p>V(Y) = 2²·V(X) = 4×2 = <strong>8</strong></p>
              <p>σ(Y) = |2|·σ(X) = 2·√2 = <strong>2√2</strong></p>
            </div>
          </div>
        </div>

        {/* 도출 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">공식 도출 (상세)</h3>
          <p className="text-sm text-gray-700 mb-3">
            Y = aX+b라 하면, Y가 가질 수 있는 값은 ax₁+b, ax₂+b, …, axₙ+b이고
            각 확률은 P(Y = axᵢ+b) = pᵢ (i=1,2,…,n)
          </p>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
            <p className="text-blue-700 font-bold">① 평균</p>
            <p className="pl-4">E(Y) = Σ (axᵢ+b)pᵢ = a·Σ xᵢpᵢ + b·Σ pᵢ = aE(X) + b</p>
            <p className="text-purple-700 font-bold mt-2">② 분산</p>
            <p className="pl-4">V(Y) = Σ {'[(axᵢ+b)−{aE(X)+b}]²'}pᵢ</p>
            <p className="pl-4">= Σ [a(xᵢ−E(X))]²pᵢ = a²·Σ (xᵢ−E(X))²pᵢ = a²V(X)</p>
            <p className="text-indigo-700 font-bold mt-2">③ 표준편차</p>
            <p className="pl-4">σ(Y) = √V(Y) = √(a²V(X)) = |a|σ(X)</p>
          </div>
        </div>
      </section>

      {/* ── 5. 이항분포 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <BarChart2 className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">5. 이항분포 B(n, p)</h2>
          </div>
          <p className="text-indigo-100">
            독립시행에서 사건이 일어나는 횟수의 확률분포
          </p>
        </div>

        <div className="bg-white border-2 border-indigo-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-3">정의</h3>
          <p className="text-gray-700 mb-4">
            한 번의 시행에서 사건 A가 일어날 확률이 p로 일정할 때, n번의 독립시행에서
            사건 A가 일어나는 횟수를 확률변수 X라 하면
          </p>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center font-mono text-lg mb-4">
            <p className="font-bold text-indigo-900">
              P(X = x) = <sub>n</sub>Cₓ · pˣ · qⁿ⁻ˣ
            </p>
            <p className="text-sm text-gray-500 mt-1">(x = 0, 1, 2, …, n, q = 1−p)</p>
          </div>
          <p className="text-gray-700 mb-4">
            이와 같은 확률분포를 <strong>이항분포(Binomial Distribution)</strong>라 하고,
            기호로 <span className="font-mono font-bold">B(n, p)</span>로 나타낸다.
          </p>

          {/* 이항분포의 평균·분산·표준편차 */}
          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">이항분포의 평균·분산·표준편차</h3>
          <p className="text-sm text-gray-600 mb-3">X ~ B(n, p)이면 (q = 1−p)</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="font-mono text-xl font-bold text-blue-900">E(X) = np</div>
              <p className="text-xs text-gray-500 mt-1">n번 시행 × 성공확률</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="font-mono text-xl font-bold text-purple-900">V(X) = npq</div>
              <p className="text-xs text-gray-500 mt-1">= np(1−p)</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
              <div className="font-mono text-xl font-bold text-indigo-900">σ(X) = √(npq)</div>
              <p className="text-xs text-gray-500 mt-1">= √(np(1−p))</p>
            </div>
          </div>
        </div>

        {/* 인터랙티브 이항분포 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
            이항분포 시각화 B(n, p)
          </h3>
          <BinomialDistribution />
        </div>
      </section>

      {/* ── 6. 큰수의 법칙 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">6. 큰수의 법칙 (Law of Large Numbers)</h2>
          </div>
          <p className="text-rose-100">
            시행 횟수 n이 커질수록 통계적 확률은 수학적 확률에 가까워진다
          </p>
        </div>

        <div className="bg-white border-2 border-rose-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">정의</h3>
          <p className="text-gray-700 mb-4">
            어떤 시행에서 사건 A가 일어날 수학적 확률이 p이고, n번의 독립시행에서
            사건 A가 일어나는 횟수를 확률변수 X라 할 때,
            임의의 작은 양수 h에 대하여 <strong>n이 한없이 커질수록</strong>
          </p>
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-center font-mono text-lg mb-4">
            <p className="font-bold text-rose-900">P( |X/n − p| &lt; h ) → 1</p>
          </div>
          <p className="text-gray-700 mb-3">
            즉, 통계적 확률 X/n이 수학적 확률 p에 한없이 가까워진다.
            이를 <strong>큰수의 법칙</strong>이라 한다.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-900 font-semibold mb-1">활용</p>
            <p className="text-sm text-yellow-800">
              자연 현상이나 사회 현상과 같이 수학적 확률을 구하기 어려운 경우에는
              큰수의 법칙에 의하여 통계적 확률을 수학적 확률 대신 사용할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 시뮬레이션 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-rose-600" />
            큰수의 법칙 시뮬레이션
          </h3>
          <LawOfLargeNumbers />
        </div>
      </section>

      {/* ── 참고 자료 ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-violet-600" />
          참고 자료
        </h2>

        {/* 블로그 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-indigo-500" />
            읽을거리 — PMF에 왜 '질량'이라는 단어가 붙을까?
          </h3>
          <a
            href="https://hsm-edu.tistory.com/815"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-lg border border-indigo-100 bg-indigo-50 hover:bg-indigo-100 transition-colors group"
          >
            <div className="flex-1">
              <p className="font-semibold text-indigo-900 group-hover:underline mb-1">
                확률밀도함수(PDF)와 확률질량함수(PMF)에 왜 '질량'과 '밀도'라는 용어가 붙는가
              </p>
              <p className="text-sm text-gray-600 mb-2">
                통계의 본질 · bigpicture
              </p>
              <p className="text-sm text-gray-700">
                물리학의 <strong>질점(질량 합산)</strong>과 <strong>연속체(밀도 적분)</strong> 개념을 대응시켜,
                이산확률변수 → 질량함수(PMF), 연속확률변수 → 밀도함수(PDF)라는 이름의 유래를 설명합니다.
                수식 구조가 물리학과 왜 같은지 직관적으로 이해할 수 있습니다.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-1" />
          </a>

          {/* 핵심 인사이트 박스 */}
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-semibold text-blue-800 text-sm mb-2">이산확률변수 ↔ 질점(質點)</p>
              <p className="text-sm text-blue-700">
                각 점에 질량이 집중된 질점처럼, PMF는 각 x값에 확률이 집중되어 있습니다.
                질량의 합 = 총 질량이듯, 확률의 합 = 1 입니다.
              </p>
              <div className="mt-2 font-mono text-xs text-blue-600 bg-white rounded p-2">
                m_total = Σ mᵢ &nbsp;↔&nbsp; Σ P(X=xᵢ) = 1
              </div>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
              <p className="font-semibold text-rose-800 text-sm mb-2">연속확률변수 ↔ 연속체(밀도)</p>
              <p className="text-sm text-rose-700">
                직선 위 밀도 ρ(x)를 적분하면 질량이 나오듯, PDF f(x)를 구간으로 적분하면 확률이 나옵니다.
                (고등 수학 이후 배웁니다)
              </p>
              <div className="mt-2 font-mono text-xs text-rose-600 bg-white rounded p-2">
                m = ∫ρ(x)dx &nbsp;↔&nbsp; P(a≤X≤b) = ∫f(x)dx
              </div>
            </div>
          </div>
        </div>

        {/* 유튜브 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-500" />
            영상으로 보기
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                href: 'https://www.youtube.com/watch?v=ghuey5RcApY',
                id: 'ghuey5RcApY',
                title: '이산확률변수와 확률질량함수',
                desc: '확률변수·PMF 개념을 처음부터 차근차근 설명합니다.',
              },
              {
                href: 'https://www.youtube.com/watch?v=0RQTrZcQsF0',
                id: '0RQTrZcQsF0',
                title: '기댓값과 분산 (이산확률변수)',
                desc: 'E(X), V(X), σ(X) 공식과 계산 방법을 다룹니다.',
              },
              {
                href: 'https://www.youtube.com/watch?v=27yRJGDc8Fg',
                id: '27yRJGDc8Fg',
                title: '이항분포와 큰수의 법칙',
                desc: 'B(n,p) 공식 도출과 큰수의 법칙의 의미를 설명합니다.',
              },
            ].map((v) => (
              <a
                key={v.id}
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl overflow-hidden border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all"
              >
                {/* 썸네일 */}
                <div className="relative">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                    alt={v.title}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* 설명 */}
                <div className="p-3">
                  <p className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-red-700 transition-colors line-clamp-2">
                    {v.title}
                  </p>
                  <p className="text-xs text-gray-500">{v.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 정리 */}
      <section className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">핵심 공식 정리</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { title: 'PMF 성질', lines: ['0 ≤ pᵢ ≤ 1', 'Σ pᵢ = 1'] },
            { title: '기댓값', lines: ['E(X) = Σ xᵢpᵢ'] },
            { title: '분산', lines: ['V(X) = E(X²) − {E(X)}²', 'V(X) = Σ (xᵢ−m)²pᵢ'] },
            { title: '표준편차', lines: ['σ(X) = √V(X)'] },
            { title: 'aX+b 변환', lines: ['E(aX+b) = aE(X)+b', 'V(aX+b) = a²V(X)', 'σ(aX+b) = |a|σ(X)'] },
            { title: '이항분포 B(n,p)', lines: ['E(X) = np', 'V(X) = npq', 'σ(X) = √(npq)'] },
          ].map((card) => (
            <div key={card.title} className="bg-white/15 backdrop-blur rounded-lg p-4">
              <h3 className="font-bold mb-2 text-violet-100">{card.title}</h3>
              <ul className="space-y-1">
                {card.lines.map((line) => (
                  <li key={line} className="font-mono text-sm">{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/independence"
            className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all text-sm"
          >
            ← 독립시행 복습
          </Link>
          <Link
            to="/pascal"
            className="inline-flex items-center px-4 py-2 bg-white text-violet-700 rounded-lg font-bold hover:bg-violet-50 transition-all text-sm"
          >
            파스칼 & 이항분포 →
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
