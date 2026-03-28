import { VennDiagram } from '../components/VennDiagram';
import { MutuallyExclusiveVsIndependent } from '../components/MutuallyExclusiveVsIndependent';
import { ProbabilityCalculator } from '../components/ProbabilityCalculator';
import { Shapes, GitBranch } from 'lucide-react';

export function ProbabilityBasics() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          확률 기초 (Probability Basics)
        </h1>
        <p className="text-xl text-gray-600">
          표본공간, 사건, 그리고 확률의 기본 연산을 이해합니다
        </p>
      </div>

      {/* Definitions */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">✔ 정의</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Sample Space (표본공간)
            </h3>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">전체 경우의 집합</span>
            </p>
            <p className="text-sm text-gray-600 mb-3">
              기호: S 또는 Ω (오메가)
            </p>
            <div className="bg-white rounded p-4 space-y-2 text-sm">
              <p className="font-bold text-blue-700">예시:</p>
              <p>• 주사위 던지기: S = {'{1, 2, 3, 4, 5, 6}'}</p>
              <p>• 동전 던지기: S = {'{H, T}'}</p>
              <p>• 카드 뽑기: S = {'{모든 52장의 카드}'}</p>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Event (사건)
            </h3>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">표본공간의 부분집합</span>
            </p>
            <p className="text-sm text-gray-600 mb-3">
              기호: A, B, C 등
            </p>
            <div className="bg-white rounded p-4 space-y-2 text-sm">
              <p className="font-bold text-green-700">예시 (주사위):</p>
              <p>• A = {'{짝수가 나오는 사건}'} = {'{2, 4, 6}'}</p>
              <p>• B = {'{3 이하가 나오는 사건}'} = {'{1, 2, 3}'}</p>
              <p>• C = {'{6이 나오는 사건}'} = {'{6}'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Operations with Venn Diagrams */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Shapes className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">✔ 사건의 연산</h2>
        </div>
        <VennDiagram />
      </div>

      {/* Probability Calculator */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          확률 계산 예제
        </h2>
        <ProbabilityCalculator />
      </div>

      {/* Key Distinction */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <GitBranch className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">✔ 핵심 구분</h2>
        </div>
        
        {/* Table Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="px-4 py-3 text-left text-lg font-bold text-gray-900">개념</th>
                <th className="px-4 py-3 text-left text-lg font-bold text-gray-900">의미</th>
                <th className="px-4 py-3 text-left text-lg font-bold text-gray-900">수식</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 bg-red-50">
                <td className="px-4 py-4 font-bold text-red-700">배반 (Mutually Exclusive)</td>
                <td className="px-4 py-4 text-gray-700">동시에 일어날 수 없음</td>
                <td className="px-4 py-4 font-mono text-sm">
                  A ∩ B = ∅
                  <br />
                  <span className="text-xs text-gray-600">P(A ∩ B) = 0</span>
                </td>
              </tr>
              <tr className="bg-blue-50">
                <td className="px-4 py-4 font-bold text-blue-700">독립 (Independent)</td>
                <td className="px-4 py-4 text-gray-700">서로 영향 없음</td>
                <td className="px-4 py-4 font-mono text-sm">
                  P(A ∩ B) = P(A) × P(B)
                  <br />
                  <span className="text-xs text-gray-600">P(A|B) = P(A)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Interactive Comparison */}
        <MutuallyExclusiveVsIndependent />
      </div>

      {/* Important Notes */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">⚠️ 주의할 점</h3>
        <div className="space-y-4 text-gray-700">
          <div className="bg-white rounded-lg p-4 border border-yellow-400">
            <p className="font-bold text-red-700 mb-2">
              배반 ≠ 독립
            </p>
            <p className="text-sm">
              많은 학생들이 혼동하지만, 배반과 독립은 <span className="font-bold">완전히 다른 개념</span>입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-red-700 mb-2">배반 (Mutually Exclusive)</h4>
              <ul className="space-y-1 text-sm">
                <li>• 동시에 일어날 수 없음</li>
                <li>• 하나가 일어나면 다른 것은 일어날 수 없음</li>
                <li>• 교집합이 공집합</li>
                <li className="font-bold text-red-600 mt-2">→ 매우 강한 관계</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-blue-700 mb-2">독립 (Independent)</h4>
              <ul className="space-y-1 text-sm">
                <li>• 서로 영향을 주지 않음</li>
                <li>• 하나가 일어나도 다른 것의 확률 불변</li>
                <li>• 확률의 곱 = 교집합의 확률</li>
                <li className="font-bold text-blue-600 mt-2">→ 관계가 없음</li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-100 border border-indigo-300 rounded-lg p-4 mt-4">
            <p className="font-bold text-indigo-900 mb-2">역설적 사실:</p>
            <p className="text-sm text-indigo-800">
              P(A) {'>'} 0이고 P(B) {'>'} 0일 때, <span className="font-bold">배반 사건은 절대 독립이 아닙니다!</span>
              <br />
              왜냐하면 A가 일어나면 B가 일어날 확률이 0이 되므로, 영향을 주기 때문입니다.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">확률의 기초 정리</h3>
        <div className="space-y-3">
          <p>
            <span className="font-semibold">1. 표본공간과 사건:</span> 전체 경우와 그 부분집합으로 확률 문제를 구조화
          </p>
          <p>
            <span className="font-semibold">2. 사건의 연산:</span> 합집합, 교집합, 여집합으로 복잡한 사건 표현
          </p>
          <p>
            <span className="font-semibold">3. 배반과 독립:</span> 두 개념의 명확한 구분이 확률 계산의 핵심
          </p>
        </div>
        <p className="mt-4 text-indigo-100 italic">
          이 기초 개념들을 확실히 이해하면 조건부확률, 베이즈정리 등 고급 주제로 자연스럽게 이어집니다.
        </p>
      </div>
    </div>
  );
}
