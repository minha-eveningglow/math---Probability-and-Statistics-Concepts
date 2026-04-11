import { VennDiagram } from '../components/VennDiagram';
import { MutuallyExclusiveVsIndependent } from '../components/MutuallyExclusiveVsIndependent';
import { ProbabilityCalculator } from '../components/ProbabilityCalculator';
import { DeMorganLaws } from '../components/DeMorganLaws';
import { GeometricProbability } from '../components/GeometricProbability';
import { AdditionRule } from '../components/AdditionRule';
import { ConceptCard } from '../components/ConceptCard';
import { Shapes, GitBranch, Target, Ruler, Calculator } from 'lucide-react';

export function ProbabilityBasics() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          확률 기초 (Probability Basics)
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          실험, 표본공간, 사건에서 확률의 성질과 계산 법칙까지
        </p>
        <div className="mb-6">
          <a
            href="https://www.youtube.com/watch?v=M7r4HOspQdk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            📺 확률 기초 강의 영상 보기
          </a>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6">
          <p className="text-gray-700 leading-relaxed">
            확률론은 <span className="font-bold text-indigo-700">불확실성을 수학적으로 다루는 학문</span>입니다.
            이 페이지에서는 확률의 기본 개념부터 계산 법칙까지 체계적으로 학습합니다.
          </p>
        </div>
      </div>

      {/* Learning Path */}
      <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="w-6 h-6 text-indigo-600 mr-2" />
          학습 흐름
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">1단계</div>
            <h3 className="font-bold text-gray-900 mb-2">확률 입문</h3>
            <p className="text-sm text-gray-700">실험, 표본공간, 사건의 개념과 확률의 정의</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">2단계</div>
            <h3 className="font-bold text-gray-900 mb-2">기본 성질</h3>
            <p className="text-sm text-gray-700">확률의 공리와 기본 성질, 기하적 확률</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-300 rounded-lg p-6">
            <div className="text-3xl font-bold text-pink-600 mb-2">3단계</div>
            <h3 className="font-bold text-gray-900 mb-2">계산 법칙</h3>
            <p className="text-sm text-gray-700">덧셈정리, 여사건, 드모르간의 법칙</p>
          </div>
        </div>
      </div>

      {/* Section 1: Experiment */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <span className="text-4xl mr-3">🧪</span>
            시행 (Experiment / Trial)
          </h2>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-xl font-semibold mb-4">
                같은 조건에서 반복할 수 있고, 그 결과가 우연에 의해 결정되는 실험이나 관찰
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl mb-2">🔄</div>
                  <h3 className="font-bold mb-2">반복 가능성</h3>
                  <p className="text-sm text-cyan-100">
                    같은 조건에서 여러 번 반복할 수 있음
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl mb-2">❓</div>
                  <h3 className="font-bold mb-2">결과의 불확실성</h3>
                  <p className="text-sm text-cyan-100">
                    미리 결과를 정확히 예측할 수 없음
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl mb-2">📋</div>
                  <h3 className="font-bold mb-2">모든 결과 파악 가능</h3>
                  <p className="text-sm text-cyan-100">
                    가능한 모든 결과를 미리 알 수 있음
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 text-gray-800">
              <h3 className="font-bold text-xl text-cyan-700 mb-4">시행의 예시</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">🎲</span>
                  <div>
                    <p className="font-bold text-gray-900">주사위 던지기</p>
                    <p className="text-sm text-gray-600">1~6 중 어떤 눈이 나올지 미리 알 수 없음</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">🪙</span>
                  <div>
                    <p className="font-bold text-gray-900">동전 던지기</p>
                    <p className="text-sm text-gray-600">앞면 또는 뒷면, 결과는 우연에 의해 결정</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">🃏</span>
                  <div>
                    <p className="font-bold text-gray-900">카드 뽑기</p>
                    <p className="text-sm text-gray-600">52장 중 어떤 카드가 나올지 불확실</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Sample Space & Events */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Shapes className="w-8 h-8 text-blue-600 mr-3" />
          표본공간과 사건
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Sample Space */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              표본공간
            </h3>
            <p className="text-sm text-gray-600 mb-2">Sample Space</p>
            <p className="text-gray-700 mb-4">
              <span className="font-bold text-blue-700">어떤 시행에서 일어날 수 있는 모든 결과의 집합</span>
            </p>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">기호: S 또는 Ω</p>
              <div className="space-y-2 text-sm">
                <p className="font-bold text-blue-700">예시:</p>
                <p className="font-mono bg-blue-50 p-2 rounded">주사위: S = {'{1,2,3,4,5,6}'}</p>
                <p className="font-mono bg-blue-50 p-2 rounded">동전: S = {'{H, T}'}</p>
              </div>
            </div>
          </div>

          {/* Event */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400 rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              사건
            </h3>
            <p className="text-sm text-gray-600 mb-2">Event</p>
            <p className="text-gray-700 mb-4">
              <span className="font-bold text-green-700">표본공간의 부분집합</span>
            </p>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">기호: A, B, C 등</p>
              <div className="space-y-2 text-sm">
                <p className="font-bold text-green-700">예시 (주사위):</p>
                <p className="font-mono bg-green-50 p-2 rounded">짝수: A = {'{2,4,6}'}</p>
                <p className="font-mono bg-green-50 p-2 rounded">3이하: B = {'{1,2,3}'}</p>
              </div>
            </div>
          </div>

          {/* Simple Event */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              단순사건
            </h3>
            <p className="text-sm text-gray-600 mb-2">Simple Event</p>
            <p className="text-gray-700 mb-4">
              <span className="font-bold text-purple-700">단 하나의 결과로만 이루어진 사건</span>
            </p>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">원소가 1개인 사건</p>
              <div className="space-y-2 text-sm">
                <p className="font-bold text-purple-700">예시 (주사위):</p>
                <p className="font-mono bg-purple-50 p-2 rounded">{'{1}'}, {'{2}'}, {'{3}'}, ...</p>
                <p className="text-xs text-gray-600 mt-2">복합사건: {'{2,4,6}'} (3개의 원소)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Relationship Diagram */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            개념 간의 관계
          </h3>
          <div className="flex justify-center">
            <svg width="600" height="200" viewBox="0 0 600 200">
              {/* Sample Space */}
              <rect x="50" y="20" width="500" height="160" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
              <text x="75" y="50" fontSize="18" fontWeight="bold" fill="#1e40af">표본공간 S</text>

              {/* Event A */}
              <ellipse cx="200" cy="110" rx="80" ry="50" fill="#86efac" stroke="#16a34a" strokeWidth="3" opacity="0.8" />
              <text x="200" y="95" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#15803d">사건 A</text>
              <text x="200" y="115" textAnchor="middle" fontSize="14" fill="#166534">{'{2, 4, 6}'}</text>

              {/* Simple Event */}
              <circle cx="400" cy="110" r="30" fill="#c084fc" stroke="#9333ea" strokeWidth="3" opacity="0.8" />
              <text x="400" y="110" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b21a8">단순</text>
              <text x="400" y="128" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b21a8">사건</text>
              <text x="400" y="158" textAnchor="middle" fontSize="12" fill="#7c3aed">{'{3}'}</text>
            </svg>
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            표본공간은 모든 가능한 결과를 포함하며, 사건은 그 부분집합입니다.
          </p>
        </div>
      </div>

      {/* Section 3: Definition of Probability */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Calculator className="w-8 h-8 text-indigo-600 mr-3" />
          확률의 정의 (Definition of Probability)
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-indigo-400 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              어떤 사건 A가 일어날 가능성을 수치로 나타낸 것
            </h3>
            <p className="text-center text-xl font-mono text-indigo-800">
              0 ≤ P(A) ≤ 1
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
              0: 절대 일어나지 않음 | 1: 반드시 일어남
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Mathematical Probability */}
            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  📐
                </div>
                <h4 className="text-xl font-bold text-gray-900">수학적 확률</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Mathematical Probability</p>

              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="font-mono text-lg text-center mb-2">
                  P(A) = n(A) / n(S)
                </p>
                <p className="text-xs text-gray-600 text-center">
                  (A의 경우의 수) / (전체 경우의 수)
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <p><span className="font-bold text-blue-700">특징:</span></p>
                <p>• 이론적으로 계산 가능</p>
                <p>• 모든 결과가 <span className="font-bold">동등하게 일어날 때</span> 사용</p>
                <p>• 실험 없이도 확률 계산 가능</p>
              </div>

              <div className="bg-blue-100 rounded-lg p-3 mt-4">
                <p className="font-bold text-blue-900 mb-1">예시:</p>
                <p className="text-sm text-gray-800">
                  공정한 주사위에서 짝수가 나올 확률<br/>
                  P(짝수) = 3/6 = 1/2
                </p>
              </div>
            </div>

            {/* Statistical Probability */}
            <div className="bg-orange-50 border-2 border-orange-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  📊
                </div>
                <h4 className="text-xl font-bold text-gray-900">통계적 확률</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Statistical Probability</p>

              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="font-mono text-lg text-center mb-2">
                  P(A) ≈ r / n
                </p>
                <p className="text-xs text-gray-600 text-center">
                  (A가 일어난 횟수) / (전체 시행 횟수)
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <p><span className="font-bold text-orange-700">특징:</span></p>
                <p>• 실제 실험이나 관찰을 통해 구함</p>
                <p>• <span className="font-bold">대수의 법칙</span>: n이 커질수록 수학적 확률에 근접</p>
                <p>• 결과가 동등하지 않아도 사용 가능</p>
              </div>

              <div className="bg-orange-100 rounded-lg p-3 mt-4">
                <p className="font-bold text-orange-900 mb-1">예시:</p>
                <p className="text-sm text-gray-800">
                  동전을 1000번 던져 앞면이 503번 나옴<br/>
                  P(앞면) ≈ 503/1000 = 0.503
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-lg p-4">
            <p className="font-bold text-gray-900 mb-2">💡 두 확률의 관계</p>
            <p className="text-gray-700 text-sm">
              통계적 확률은 실험 횟수가 충분히 많아지면 수학적 확률에 수렴합니다.
              수학적 확률은 이론적 값이고, 통계적 확률은 실제 관찰값입니다.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4: Basic Properties of Probability */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          확률의 기본 성질 (Basic Properties)
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Property 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg p-6">
              <div className="text-3xl mb-3 text-center">📏</div>
              <h4 className="font-bold text-gray-900 text-center mb-4">성질 1: 범위</h4>
              <div className="bg-white rounded-lg p-4 mb-3">
                <p className="font-mono text-center text-lg">0 ≤ P(A) ≤ 1</p>
              </div>
              <p className="text-sm text-gray-700">
                모든 사건의 확률은 0과 1 사이의 값입니다.
              </p>
            </div>

            {/* Property 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-6">
              <div className="text-3xl mb-3 text-center">🌐</div>
              <h4 className="font-bold text-gray-900 text-center mb-4">성질 2: 전체</h4>
              <div className="bg-white rounded-lg p-4 mb-3">
                <p className="font-mono text-center text-lg">P(S) = 1</p>
              </div>
              <p className="text-sm text-gray-700">
                표본공간 전체의 확률은 항상 1입니다.
              </p>
            </div>

            {/* Property 3 */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-lg p-6">
              <div className="text-3xl mb-3 text-center">⭕</div>
              <h4 className="font-bold text-gray-900 text-center mb-4">성질 3: 공사건</h4>
              <div className="bg-white rounded-lg p-4 mb-3">
                <p className="font-mono text-center text-lg">P(∅) = 0</p>
              </div>
              <p className="text-sm text-gray-700">
                일어날 수 없는 사건(공집합)의 확률은 0입니다.
              </p>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {/* Property 4 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6">
              <div className="text-3xl mb-3">🔄</div>
              <h4 className="font-bold text-gray-900 mb-4">성질 4: 여사건</h4>
              <div className="bg-white rounded-lg p-4 mb-3">
                <p className="font-mono text-lg">P(A<sup>c</sup>) = 1 - P(A)</p>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                여사건의 확률은 1에서 원래 사건의 확률을 뺀 값입니다.
              </p>
              <div className="bg-green-100 rounded p-3 text-sm">
                <p className="font-bold text-green-900 mb-1">예시:</p>
                <p className="text-gray-800">
                  P(홀수) = 1 - P(짝수) = 1 - 1/2 = 1/2
                </p>
              </div>
            </div>

            {/* Property 5 */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border-2 border-indigo-300 rounded-lg p-6">
              <div className="text-3xl mb-3">⊆</div>
              <h4 className="font-bold text-gray-900 mb-4">성질 5: 포함 관계</h4>
              <div className="bg-white rounded-lg p-4 mb-3">
                <p className="font-mono text-lg">A ⊆ B ⇒ P(A) ≤ P(B)</p>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                사건 A가 사건 B에 포함되면, P(A)는 P(B)보다 작거나 같습니다.
              </p>
              <div className="bg-indigo-100 rounded p-3 text-sm">
                <p className="font-bold text-indigo-900 mb-1">예시:</p>
                <p className="text-gray-800">
                  {'{6}'} ⊆ {'{짝수}'} ⇒ P({'{6}'}) ≤ P(짝수)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Geometric Probability */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <Ruler className="w-8 h-8 text-cyan-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">기하적 확률</h2>
        </div>
        <GeometricProbability />
      </div>

      {/* Section 6: Event Operations with Venn Diagrams */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <Shapes className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">사건의 연산 (Event Operations)</h2>
        </div>
        <VennDiagram />
      </div>

      {/* Section 7: Addition Rule */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          확률의 덧셈정리
        </h2>
        <AdditionRule />
      </div>

      {/* Section 8: Mutually Exclusive Events */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <GitBranch className="w-8 h-8 text-red-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">배반사건 (Mutually Exclusive Events)</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-400 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              동시에 일어날 수 없는 두 사건
            </h3>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="font-mono text-2xl text-red-700 mb-2">A ∩ B = ∅</p>
              <p className="font-mono text-xl text-gray-700">P(A ∩ B) = 0</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
              <h4 className="font-bold text-xl text-gray-900 mb-4">예시 1: 주사위</h4>
              <div className="space-y-2 text-sm">
                <p>• A = {'{홀수}'} = {'{1, 3, 5}'}</p>
                <p>• B = {'{짝수}'} = {'{2, 4, 6}'}</p>
                <p className="pt-2 border-t border-red-200">
                  홀수와 짝수는 <span className="font-bold text-red-700">동시에 나올 수 없음</span>
                </p>
                <p className="font-mono bg-white p-2 rounded">A ∩ B = ∅</p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
              <h4 className="font-bold text-xl text-gray-900 mb-4">예시 2: 카드</h4>
              <div className="space-y-2 text-sm">
                <p>• A = {'{하트}'}</p>
                <p>• B = {'{스페이드}'}</p>
                <p className="pt-2 border-t border-red-200">
                  한 카드가 하트이면서 동시에 스페이드일 수 <span className="font-bold text-red-700">없음</span>
                </p>
                <p className="font-mono bg-white p-2 rounded">A ∩ B = ∅</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-3">⚡ 배반사건의 덧셈정리</h4>
            <div className="bg-white rounded-lg p-4 mb-3">
              <p className="font-mono text-xl text-center">
                A, B가 배반 ⇒ P(A ∪ B) = P(A) + P(B)
              </p>
            </div>
            <p className="text-sm text-gray-700">
              교집합이 없으므로 단순히 더하기만 하면 됩니다!
            </p>
          </div>
        </div>
      </div>

      {/* Section 9: Mutually Exclusive vs Independent */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          배반 vs 독립 (핵심 구분)
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="bg-gradient-to-r from-yellow-50 to-red-50 border-2 border-yellow-500 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-red-700 mb-2 text-center">⚠️ 주의!</h3>
            <p className="text-xl text-gray-800 text-center">
              배반 ≠ 독립
            </p>
            <p className="text-center text-gray-700 mt-2">
              많은 학생들이 혼동하지만, 이 둘은 <span className="font-bold">완전히 다른 개념</span>입니다!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6">
              <h4 className="font-bold text-2xl text-red-700 mb-4">배반 (Mutually Exclusive)</h4>
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="font-mono text-lg mb-2">A ∩ B = ∅</p>
                <p className="font-mono text-lg">P(A ∩ B) = 0</p>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><span className="font-bold">동시에 일어날 수 없음</span></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>하나가 일어나면 다른 것은 <span className="font-bold">절대 일어나지 않음</span></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>교집합이 공집합</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-red-600">→</span>
                  <span className="font-bold text-red-600">매우 강한 배타적 관계</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
              <h4 className="font-bold text-2xl text-blue-700 mb-4">독립 (Independent)</h4>
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="font-mono text-lg mb-2">P(A ∩ B) = P(A) × P(B)</p>
                <p className="font-mono text-lg">P(A|B) = P(A)</p>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><span className="font-bold">서로 영향을 주지 않음</span></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>하나가 일어나도 다른 것의 확률 <span className="font-bold">불변</span></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>확률의 곱 = 교집합의 확률</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-blue-600">→</span>
                  <span className="font-bold text-blue-600">서로 무관계</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-400 rounded-lg p-6">
            <p className="font-bold text-xl text-purple-900 mb-3">🔍 역설적 사실</p>
            <p className="text-gray-800 mb-2">
              P(A) {'>'} 0이고 P(B) {'>'} 0일 때:
            </p>
            <p className="text-lg font-bold text-purple-800">
              배반 사건은 절대로 독립이 아닙니다!
            </p>
            <p className="text-gray-700 mt-3 text-sm">
              <span className="font-bold">이유:</span> A가 일어나면 B가 일어날 확률이 0이 되므로,
              A의 발생이 B의 확률에 영향을 줍니다. 따라서 독립이 아닙니다.
            </p>
          </div>
        </div>

        <MutuallyExclusiveVsIndependent />
      </div>

      {/* Section 10: De Morgan's Laws */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          드모르간의 법칙
        </h2>
        <DeMorganLaws />
      </div>

      {/* Probability Calculator */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          확률 계산 연습
        </h2>
        <ProbabilityCalculator />
      </div>

      {/* Summary */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-3xl font-bold mb-6 text-center">확률 기초 완전 정리</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h4 className="font-bold text-xl mb-4">📚 1단계: 기본 개념</h4>
            <div className="space-y-2 text-sm">
              <p>• <span className="font-bold">시행:</span> 결과가 우연에 의해 결정되는 실험</p>
              <p>• <span className="font-bold">표본공간:</span> 모든 가능한 결과의 집합</p>
              <p>• <span className="font-bold">사건:</span> 표본공간의 부분집합</p>
              <p>• <span className="font-bold">단순사건:</span> 원소가 1개인 사건</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h4 className="font-bold text-xl mb-4">📐 2단계: 확률의 정의</h4>
            <div className="space-y-2 text-sm">
              <p>• <span className="font-bold">수학적 확률:</span> 이론적 계산 (경우의 수)</p>
              <p>• <span className="font-bold">통계적 확률:</span> 실험을 통한 근사값</p>
              <p>• <span className="font-bold">기본 성질:</span> 0 ≤ P(A) ≤ 1, P(S) = 1</p>
              <p>• <span className="font-bold">기하적 확률:</span> 길이/넓이/부피 비율</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h4 className="font-bold text-xl mb-4">⚙️ 3단계: 사건의 연산</h4>
            <div className="space-y-2 text-sm">
              <p>• <span className="font-bold">합집합 (A ∪ B):</span> A 또는 B</p>
              <p>• <span className="font-bold">교집합 (A ∩ B):</span> A 그리고 B</p>
              <p>• <span className="font-bold">여집합 (A<sup>c</sup>):</span> A가 아닌 것</p>
              <p>• <span className="font-bold">드모르간:</span> 여집합과 연산의 관계</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h4 className="font-bold text-xl mb-4">🧮 4단계: 계산 법칙</h4>
            <div className="space-y-2 text-sm">
              <p>• <span className="font-bold">덧셈정리:</span> P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</p>
              <p>• <span className="font-bold">배반사건:</span> 동시에 일어날 수 없음</p>
              <p>• <span className="font-bold">여사건:</span> P(A<sup>c</sup>) = 1 - P(A)</p>
              <p>• <span className="font-bold">배반 ≠ 독립:</span> 완전히 다른 개념!</p>
            </div>
          </div>
        </div>

        <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm border-2 border-white/40">
          <p className="text-lg font-bold mb-3 text-center">💡 핵심 포인트</p>
          <div className="space-y-2">
            <p className="text-sm">
              ✓ 확률은 <span className="font-bold">불확실성을 수치화</span>하는 도구입니다
            </p>
            <p className="text-sm">
              ✓ 사건의 연산(합, 교, 여)으로 <span className="font-bold">복잡한 확률 문제</span>를 해결할 수 있습니다
            </p>
            <p className="text-sm">
              ✓ <span className="font-bold">배반과 독립의 구분</span>이 확률 계산의 핵심입니다
            </p>
            <p className="text-sm">
              ✓ 이 기초를 바탕으로 <span className="font-bold">조건부확률, 베이즈정리</span> 등으로 발전합니다
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-indigo-100 italic text-sm">
            "확률론은 불확실한 세상을 이해하는 수학적 언어입니다"
          </p>
        </div>
      </div>
    </div>
  );
}