import { Link } from 'react-router';
import { Filter, ArrowRight, BookOpen, Calculator, Layers } from 'lucide-react';
import { ConditionalProbabilityViz } from '../components/ConditionalProbabilityViz';
import { MultiplicationRuleViz } from '../components/MultiplicationRuleViz';

export function ConditionalProbability() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
          <Filter className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          조건부확률과 곱셈정리
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          사건 A가 일어났다는 조건 아래에서 사건 B가 일어날 확률,
          그리고 두 사건이 동시에 일어날 확률을 구하는 곱셈정리까지
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.youtube.com/watch?v=xusWNHNOd30"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            📺 조건부확률 강의 영상
          </a>
          <a
            href="https://www.youtube.com/watch?v=UBEmEAMtTqk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            📺 곱셈정리 강의 영상
          </a>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-bold text-teal-900 mb-4">학습 흐름</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-teal-500">
            <div className="text-sm font-bold text-teal-600 mb-1">1단계</div>
            <div className="font-semibold text-gray-900">조건부확률</div>
            <p className="text-sm text-gray-600 mt-1">P(B|A)의 정의와 도출</p>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
            <div className="text-sm font-bold text-orange-600 mb-1">2단계</div>
            <div className="font-semibold text-gray-900">곱셈정리</div>
            <p className="text-sm text-gray-600 mt-1">P(A∩B) = P(A)P(B|A)</p>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
            <div className="text-sm font-bold text-purple-600 mb-1">3단계</div>
            <div className="font-semibold text-gray-900">확률의 4대 법칙</div>
            <p className="text-sm text-gray-600 mt-1">덧셈·곱셈·여사건·뺄셈</p>
          </div>
        </div>
      </div>

      {/* Section 1: Conditional Probability */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-3">
            <BookOpen className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">1. 조건부확률 (Conditional Probability)</h2>
          </div>
          <p className="text-teal-100">
            두 사건 A, B에 대하여 확률이 0이 아닌 사건 A가 일어났다는 조건 아래에서
            사건 B가 일어날 확률을 사건 A가 일어났을 때의 사건 B의 조건부확률이라 합니다.
          </p>
        </div>

        {/* Formula */}
        <div className="bg-white border-2 border-teal-300 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">조건부확률의 정의</h3>
          <div className="text-center font-mono text-xl mb-4">
            <div className="inline-block bg-teal-50 border border-teal-200 rounded-lg px-6 py-4">
              <p>사건 A가 일어났을 때의 사건 B의 조건부확률은</p>
              <p className="text-2xl font-bold text-teal-800 mt-2">
                P(B|A) = P(A∩B) / P(A)
              </p>
              <p className="text-sm text-gray-500 mt-1">(단, P(A) {'>'} 0)</p>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-semibold text-yellow-800 mb-1">핵심 아이디어</p>
            <p>조건부확률 P(B|A)는 <strong>사건 A를 새로운 표본공간</strong>으로 생각하고,
            그 안에서 A∩B가 일어날 확률을 뜻합니다.</p>
          </div>
        </div>

        {/* Interactive Component */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-teal-600" />
            조건부확률 시각화
          </h3>
          <ConditionalProbabilityViz />
        </div>
      </section>

      {/* Section 2: Multiplication Rule */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-3">
            <Layers className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">2. 확률의 곱셈정리 (Multiplication Rule)</h2>
          </div>
          <p className="text-orange-100">
            두 사건 A, B가 동시에 일어날 확률을 조건부확률을 이용하여 구할 수 있습니다.
          </p>
        </div>

        {/* Formula */}
        <div className="bg-white border-2 border-orange-300 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">곱셈정리</h3>
          <div className="text-center font-mono text-xl mb-4">
            <div className="inline-block bg-orange-50 border border-orange-200 rounded-lg px-6 py-4">
              <p className="text-sm text-gray-600 mb-2">두 사건 A, B에 대하여 P(A) {'>'} 0, P(B) {'>'} 0일 때,</p>
              <p className="text-2xl font-bold text-orange-800">
                P(A∩B) = P(A)P(B|A) = P(B)P(A|B)
              </p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-semibold text-blue-800 mb-1">조건부확률에서 곱셈정리로</p>
            <p className="font-mono">
              P(B|A) = P(A∩B) / P(A)의 양변에 P(A)를 곱하면
            </p>
            <p className="font-mono font-semibold mt-1">
              P(A∩B) = P(A) × P(B|A)
            </p>
          </div>
        </div>

        {/* Interactive Component */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-orange-600" />
            곱셈정리 시뮬레이션
          </h3>
          <MultiplicationRuleViz />
        </div>
      </section>

      {/* Section 3: Subtraction Rule & Venn */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold">3. 확률의 뺄셈정리</h2>
          <p className="text-purple-100 mt-2">
            차사건 A-B의 확률을 구하는 두 가지 방법
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-purple-200 rounded-xl p-5">
            <h4 className="font-bold text-purple-800 mb-3">방법 1: A에서 교집합 빼기</h4>
            <div className="text-center mb-3">
              <svg viewBox="0 0 200 120" className="w-48 mx-auto">
                <circle cx="75" cy="60" r="40" fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="2" />
                <circle cx="125" cy="60" r="40" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" />
                <text x="55" y="55" fontSize="12" fill="#7e22ce" fontWeight="bold">A-B</text>
                <text x="95" y="65" fontSize="10" fill="#6b7280">A∩B</text>
                <text x="140" y="55" fontSize="12" fill="#dc2626">B</text>
              </svg>
            </div>
            <p className="font-mono text-sm text-center">A - B = A - (A∩B)</p>
            <p className="font-mono text-sm text-center font-semibold text-purple-800 mt-1">
              P(A-B) = P(A) - P(A∩B)
            </p>
          </div>
          <div className="bg-white border border-purple-200 rounded-xl p-5">
            <h4 className="font-bold text-purple-800 mb-3">방법 2: 합집합에서 B 빼기</h4>
            <div className="text-center mb-3">
              <svg viewBox="0 0 200 120" className="w-48 mx-auto">
                <circle cx="75" cy="60" r="40" fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="2" />
                <circle cx="125" cy="60" r="40" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" />
                <text x="55" y="55" fontSize="12" fill="#7e22ce" fontWeight="bold">A-B</text>
                <text x="20" y="20" fontSize="11" fill="#6b7280">A∪B</text>
                <text x="140" y="55" fontSize="12" fill="#dc2626">B</text>
              </svg>
            </div>
            <p className="font-mono text-sm text-center">A - B = (A∪B) - B</p>
            <p className="font-mono text-sm text-center font-semibold text-purple-800 mt-1">
              P(A-B) = P(A∪B) - P(B)
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="font-semibold text-purple-900 mb-2">통합 공식</p>
          <p className="font-mono text-sm">
            P(A-B) = P(A∩B<sup>c</sup>) = P(A) - P(A∩B) = P(A∪B) - P(B)
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">핵심 정리</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/15 backdrop-blur rounded-lg p-4">
            <h3 className="font-bold mb-2">조건부확률</h3>
            <ul className="space-y-1 text-sm text-teal-100">
              <li>P(B|A) = P(A∩B) / P(A)</li>
              <li>사건 A를 새 표본공간으로 축소</li>
              <li>P(A) {'>'} 0 조건 필수</li>
            </ul>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-lg p-4">
            <h3 className="font-bold mb-2">곱셈정리</h3>
            <ul className="space-y-1 text-sm text-teal-100">
              <li>P(A∩B) = P(A)P(B|A)</li>
              <li>조건부확률에서 자연스럽게 도출</li>
              <li>비복원 추출 문제에 핵심 도구</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4 text-center">
          <p className="text-teal-100 mb-3">다음 단계: 사건의 독립과 독립시행의 확률</p>
          <Link
            to="/independence"
            className="inline-flex items-center px-6 py-3 bg-white text-teal-700 rounded-lg font-bold hover:bg-teal-50 transition-all"
          >
            독립과 독립시행 학습하기
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
