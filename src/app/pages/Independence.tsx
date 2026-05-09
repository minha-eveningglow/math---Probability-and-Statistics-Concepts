import { Link } from 'react-router';
import { Repeat, ArrowRight, BookOpen, Calculator, AlertTriangle, Zap } from 'lucide-react';
import { IndependenceTestViz } from '../components/IndependenceTestViz';
import { IndependentTrialsViz } from '../components/IndependentTrialsViz';

export function Independence() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
          <Repeat className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          사건의 독립과 독립시행
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          두 사건이 서로 독립인지 종속인지 판별하고,
          독립시행에서의 확률을 구하는 공식을 이해합니다
        </p>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-bold text-amber-900 mb-4">학습 흐름</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
            <div className="text-sm font-bold text-emerald-600 mb-1">1단계</div>
            <div className="font-semibold text-gray-900">독립과 종속</div>
            <p className="text-sm text-gray-600 mt-1">P(B|A) = P(B)이면 독립</p>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
            <div className="text-sm font-bold text-indigo-600 mb-1">2단계</div>
            <div className="font-semibold text-gray-900">독립의 성질</div>
            <p className="text-sm text-gray-600 mt-1">필요충분조건과 여사건의 독립</p>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-amber-500">
            <div className="text-sm font-bold text-amber-600 mb-1">3단계</div>
            <div className="font-semibold text-gray-900">독립시행의 확률</div>
            <p className="text-sm text-gray-600 mt-1">
              <sub>n</sub>C<sub>r</sub> p<sup>r</sup>(1-p)<sup>n-r</sup>
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Independence & Dependence */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-3">
            <BookOpen className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">1. 사건의 독립과 종속</h2>
          </div>
          <p className="text-emerald-100">
            두 사건 A, B에 대하여 A가 일어나는 것이 B가 일어날 확률에 영향을 주는지 여부
          </p>
        </div>

        {/* Definitions */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-emerald-800 mb-3">독립 (Independent)</h3>
            <p className="text-gray-700 mb-3">
              두 사건 A, B에 대하여 A가 일어나는 것이 B가 일어날 확률에 영향을 주지 않을 때
            </p>
            <div className="bg-white border border-emerald-200 rounded-lg p-3 font-mono text-center">
              <p>P(B|A) = P(B|A<sup>c</sup>) = P(B)</p>
            </div>
            <p className="text-sm text-emerald-700 mt-2">
              → 두 사건 A, B는 서로 <strong>독립</strong>이라 한다.
            </p>
          </div>
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-red-800 mb-3">종속 (Dependent)</h3>
            <p className="text-gray-700 mb-3">
              두 사건 A, B가 서로 독립이 아닐 때
            </p>
            <div className="bg-white border border-red-200 rounded-lg p-3 font-mono text-center">
              <p>P(B|A) ≠ P(B|A<sup>c</sup>)</p>
            </div>
            <p className="text-sm text-red-700 mt-2">
              → 두 사건 A, B는 서로 <strong>종속</strong>이라 한다.
            </p>
          </div>
        </div>

        {/* Interactive Component */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-emerald-600" />
            복원 추출 vs 비복원 추출로 이해하는 독립과 종속
          </h3>
          <IndependenceTestViz />
        </div>
      </section>

      {/* Section 2: Properties of Independence */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-3">
            <Zap className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">2. 독립의 성질</h2>
          </div>
          <p className="text-indigo-100">
            독립인 두 사건의 여사건도 독립이 되는 성질과 그 증명
          </p>
        </div>

        {/* Complement Independence */}
        <div className="bg-white border border-indigo-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">
            독립인 두 사건 A, B의 여사건 관계
          </h3>
          <p className="text-gray-700 mb-4">
            두 사건 A, B가 서로 독립이면 (P(A∩B) = P(A)P(B)):
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-bold text-indigo-800 text-sm mb-2">(1) A와 B<sup>c</sup></h4>
              <div className="font-mono text-xs space-y-1 text-gray-700">
                <p>P(A∩B<sup>c</sup>) = P(A) - P(A∩B)</p>
                <p>= P(A) - P(A)P(B)</p>
                <p>= P(A){'{1-P(B)}'}</p>
                <p className="text-indigo-700 font-semibold">= P(A)P(B<sup>c</sup>)</p>
              </div>
              <p className="text-xs text-indigo-600 mt-2 font-semibold">→ 독립</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-bold text-indigo-800 text-sm mb-2">(2) A<sup>c</sup>와 B</h4>
              <div className="font-mono text-xs space-y-1 text-gray-700">
                <p>P(A<sup>c</sup>∩B) = P(B) - P(A∩B)</p>
                <p>= P(B) - P(A)P(B)</p>
                <p>= {'{1-P(A)}'}P(B)</p>
                <p className="text-indigo-700 font-semibold">= P(A<sup>c</sup>)P(B)</p>
              </div>
              <p className="text-xs text-indigo-600 mt-2 font-semibold">→ 독립</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-bold text-indigo-800 text-sm mb-2">(3) A<sup>c</sup>와 B<sup>c</sup></h4>
              <div className="font-mono text-xs space-y-1 text-gray-700">
                <p>P(A<sup>c</sup>∩B<sup>c</sup>) = 1-P(A∪B)</p>
                <p>= 1-P(A)-P(B)+P(A)P(B)</p>
                <p>= {'{1-P(A)}{1-P(B)}'}</p>
                <p className="text-indigo-700 font-semibold">= P(A<sup>c</sup>)P(B<sup>c</sup>)</p>
              </div>
              <p className="text-xs text-indigo-600 mt-2 font-semibold">→ 독립</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="font-semibold text-yellow-800 text-sm">
              결론: A, B가 독립이면 A와 B<sup>c</sup>, A<sup>c</sup>와 B, A<sup>c</sup>와 B<sup>c</sup> 모두 독립이다.
            </p>
          </div>
        </div>

        {/* ME vs Independent */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            배반사건과 독립사건의 관계
          </h3>
          <p className="text-gray-700 mb-4">
            P(A) {'>'} 0, P(B) {'>'} 0인 두 사건 A, B에 대하여:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-800 mb-2">(1) 배반이면 → 종속</h4>
              <div className="font-mono text-sm space-y-1 text-gray-700 mb-2">
                <p>A∩B = ∅ 이므로 P(A∩B) = 0</p>
                <p>P(A|B) = P(A∩B)/P(B) = 0 ≠ P(A)</p>
              </div>
              <p className="text-sm text-red-700">
                두 사건이 동시에 일어나지 않으므로 한 사건이 일어나면 다른 사건은 일어날 수 없다.
                따라서 서로 영향을 주므로 <strong>종속</strong>이다.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">(2) 독립이면 → 배반 아님</h4>
              <div className="font-mono text-sm space-y-1 text-gray-700 mb-2">
                <p>P(A∩B) = P(A)P(B) ≠ 0</p>
                <p>∴ A∩B ≠ ∅</p>
              </div>
              <p className="text-sm text-blue-700">
                두 사건이 독립이면 동시에 일어날 수 있다.
                따라서 <strong>배반사건이 아니다</strong>.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mt-4 text-center text-sm">
            <p className="font-semibold text-gray-800">
              배반사건(ME) ↔ 독립사건은 서로 반대 개념이 아니라, <strong>동시에 성립할 수 없는</strong> 관계이다.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Independent Trials */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-3">
            <Repeat className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">3. 독립시행의 확률</h2>
          </div>
          <p className="text-amber-100">
            같은 시행을 n번 반복할 때, 특정 사건이 정확히 r번 일어날 확률
          </p>
        </div>

        {/* Definition */}
        <div className="bg-white border-2 border-amber-300 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">독립시행이란?</h3>
          <p className="text-gray-700 mb-4">
            동전이나 주사위 등을 여러 번 던지는 경우와 같이 어떤 시행을 반복할 때,
            각 시행에서 일어나는 사건이 서로 독립이면 이와 같은 시행을 <strong>독립시행</strong>이라 한다.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-amber-900 mb-2">독립시행의 확률 공식</h4>
            <p className="text-sm text-gray-700 mb-2">
              어떤 시행에서 사건 A가 일어날 확률이 p (0{'<'}p{'<'}1)일 때,
              이 시행을 n번 반복하는 독립시행에서 사건 A가 r번 일어날 확률은
            </p>
            <div className="bg-white border border-amber-300 rounded-lg p-3 text-center font-mono text-xl">
              <p className="text-amber-900 font-bold">
                <sub>n</sub>C<sub>r</sub> × p<sup>r</sup> × (1-p)<sup>n-r</sup>
              </p>
              <p className="text-sm text-gray-500 mt-1">(단, r = 0, 1, 2, ..., n)</p>
            </div>
          </div>

          {/* Derivation */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">도출 과정 (주사위 예제)</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p>한 개의 주사위를 3번 던질 때, 1의 눈이 2번 나올 확률을 구해 보자.</p>
              <p>1의 눈이 나올 확률 = 1/6, 1 이외의 눈이 나올 확률 = 5/6</p>
              <div className="overflow-x-auto">
                <table className="mx-auto border-collapse text-xs mt-2">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-3 py-1 bg-gray-100">1회</th>
                      <th className="border border-gray-300 px-3 py-1 bg-gray-100">2회</th>
                      <th className="border border-gray-300 px-3 py-1 bg-gray-100">3회</th>
                      <th className="border border-gray-300 px-3 py-1 bg-gray-100">확률</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1 text-center">O</td>
                      <td className="border border-gray-300 px-3 py-1 text-center">O</td>
                      <td className="border border-gray-300 px-3 py-1 text-center">X</td>
                      <td className="border border-gray-300 px-3 py-1 text-center font-mono">1/6 × 1/6 × 5/6</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1 text-center">O</td>
                      <td className="border border-gray-300 px-3 py-1 text-center">X</td>
                      <td className="border border-gray-300 px-3 py-1 text-center">O</td>
                      <td className="border border-gray-300 px-3 py-1 text-center font-mono">1/6 × 5/6 × 1/6</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1 text-center">X</td>
                      <td className="border border-gray-300 px-3 py-1 text-center">O</td>
                      <td className="border border-gray-300 px-3 py-1 text-center">O</td>
                      <td className="border border-gray-300 px-3 py-1 text-center font-mono">5/6 × 1/6 × 1/6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2">3가지 경우는 서로 배반사건이므로 확률의 덧셈정리에 의하여</p>
              <p className="font-mono text-center">
                3 × (1/6)<sup>2</sup> × (5/6)<sup>1</sup> = <sub>3</sub>C<sub>2</sub>(1/6)<sup>2</sup>(5/6)<sup>1</sup>
              </p>
              <p className="mt-2 font-semibold">
                일반화: n번 던져서 1의 눈이 r번 나올 확률 = <sub>n</sub>C<sub>r</sub>(1/6)<sup>r</sup>(5/6)<sup>n-r</sup>
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Component */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-amber-600" />
            독립시행의 확률 계산기
          </h3>
          <IndependentTrialsViz />
        </div>
      </section>

      {/* Summary */}
      <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">핵심 정리</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/15 backdrop-blur rounded-lg p-4">
            <h3 className="font-bold mb-2">독립</h3>
            <ul className="space-y-1 text-sm text-amber-100">
              <li>P(B|A) = P(B) ← 영향 없음</li>
              <li>P(A∩B) = P(A)P(B)</li>
              <li>여사건도 모두 독립</li>
            </ul>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-lg p-4">
            <h3 className="font-bold mb-2">종속</h3>
            <ul className="space-y-1 text-sm text-amber-100">
              <li>P(B|A) ≠ P(B) ← 영향 있음</li>
              <li>배반사건은 반드시 종속</li>
              <li>비복원 추출 → 종속</li>
            </ul>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-lg p-4">
            <h3 className="font-bold mb-2">독립시행</h3>
            <ul className="space-y-1 text-sm text-amber-100">
              <li>
                <sub>n</sub>C<sub>r</sub> p<sup>r</sup>(1-p)<sup>n-r</sup>
              </li>
              <li>조합 × 성공확률 × 실패확률</li>
              <li>이항분포의 기초</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-amber-100 mb-3 text-center">
            독립시행의 확률 공식은 이항분포 B(n, p)의 확률질량함수와 같습니다.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/conditional"
              className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all text-sm"
            >
              ← 조건부확률 복습
            </Link>
            <Link
              to="/pascal"
              className="inline-flex items-center px-4 py-2 bg-white text-amber-700 rounded-lg font-bold hover:bg-amber-50 transition-all text-sm"
            >
              파스칼 & 이항분포 보기
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
