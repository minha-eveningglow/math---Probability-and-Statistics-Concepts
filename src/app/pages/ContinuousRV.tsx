import { Link } from 'react-router';
import { Activity, ArrowRight, BookOpen, Calculator, Youtube } from 'lucide-react';
import { PDFExplorer } from '../components/PDFExplorer';

export function ContinuousRV() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
          <Activity className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">연속확률변수와 확률밀도함수</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          "확률 = 넓이" — 연속확률변수의 확률은 한 점이 아니라 구간의 넓이(적분)로 구한다
        </p>
      </div>

      {/* 학습 흐름 */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-bold text-teal-900 mb-4">학습 흐름</h2>
        <div className="grid md:grid-cols-4 gap-3">
          {[
            { step: '1', title: '연속확률변수', sub: '구간 안의 모든 실수 값' },
            { step: '2', title: '확률밀도함수', sub: 'f(x) ≥ 0, 전체 넓이 = 1' },
            { step: '3', title: '확률 계산', sub: 'P(a≤X≤b) = ∫f(x)dx' },
            { step: '4', title: '대표 예제', sub: 'a 값 결정 → 확률 계산' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border-l-4 border-teal-500 text-center">
              <div className="text-xs font-bold text-teal-600 mb-1">{s.step}단계</div>
              <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. 연속확률변수 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <Activity className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">1. 연속확률변수</h2>
          </div>
          <p className="text-teal-100">어떤 구간 안의 모든 실수 값을 가질 수 있는 확률변수</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border-2 border-teal-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-teal-800 mb-3">정의</h3>
            <p className="text-gray-700 mb-4">
              확률변수가 갖는 값이 어떤 구간에 속하는{' '}
              <span className="font-semibold text-teal-700">모든 실수</span>일 때,
              이 확률변수를 <strong>연속확률변수</strong>라 한다.
            </p>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-sm">
              <p className="font-semibold text-teal-800 mb-2">연속확률변수의 예</p>
              <ul className="text-teal-700 space-y-1">
                <li>• 사람의 키, 몸무게</li>
                <li>• 버스를 기다리는 시간</li>
                <li>• 제품의 수명(시간)</li>
                <li>• 화학 반응에서 측정한 온도</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-cyan-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-cyan-800 mb-3">이산 vs 연속</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="font-semibold text-blue-800 mb-1">이산확률변수</p>
                <p className="text-blue-700">각각의 값에 확률이 대응 (P(X = k) = pₖ)</p>
                <p className="font-mono text-blue-600 mt-1">∑ P(X = xᵢ) = 1</p>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                <p className="font-semibold text-teal-800 mb-1">연속확률변수</p>
                <p className="text-teal-700">한 점의 확률은 0, 구간의 넓이가 확률</p>
                <p className="font-mono text-teal-600 mt-1">P(X = a) = 0</p>
              </div>
            </div>
            <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
              <strong>핵심:</strong> 연속확률변수에서는{' '}
              <span className="font-mono">P(a≤X≤b) = P(a&lt;X&lt;b)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 확률밀도함수 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <BookOpen className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">2. 확률밀도함수 (PDF)</h2>
          </div>
          <p className="text-cyan-100">연속확률변수의 확률분포를 나타내는 함수</p>
        </div>

        {/* 조건 */}
        <div className="bg-white border-2 border-cyan-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">확률밀도함수의 조건</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center">
              <div className="text-sm font-bold text-cyan-700 mb-2">(1) 비음성</div>
              <div className="font-mono text-lg font-bold text-cyan-900">f(x) ≥ 0</div>
              <p className="text-xs text-gray-500 mt-2">확률밀도는 항상 0 이상</p>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center">
              <div className="text-sm font-bold text-cyan-700 mb-2">(2) 정규화</div>
              <div className="font-mono text-lg font-bold text-cyan-900">∫f(x)dx = 1</div>
              <p className="text-xs text-gray-500 mt-2">전체 넓이 = 1</p>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center">
              <div className="text-sm font-bold text-cyan-700 mb-2">(3) 확률 계산</div>
              <div className="font-mono text-base font-bold text-cyan-900">P(a≤X≤b) = ∫ₐᵇf(x)dx</div>
              <p className="text-xs text-gray-500 mt-2">구간 아래 넓이 = 확률</p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm font-bold text-orange-900 mb-1">왜 "밀도(density)"인가?</p>
            <p className="text-sm text-orange-800">
              물리학에서 밀도 ρ(x)를 구간으로 적분하면 질량이 나오듯(m = ∫ρ(x)dx),
              확률밀도 f(x)를 구간으로 적분하면 확률이 나옵니다.
              f(x) 자체는 확률이 아닌 <em>단위 길이당 확률의 농도</em>입니다.
            </p>
          </div>
        </div>

        {/* 대표 예제 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">대표 예제 — a 값 결정</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-800 mb-2">
              f(x) = ax² (0 ≤ x ≤ 2)가 확률밀도함수일 때, a를 구하고 P(X ≥ 1)을 계산하시오.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
            <p className="text-blue-700 font-bold">① 전체 넓이 = 1 조건으로 a 결정</p>
            <p className="pl-4">∫₀² ax² dx = 1</p>
            <p className="pl-4">a · [x³/3]₀² = 1</p>
            <p className="pl-4">a · (8/3) = 1</p>
            <p className="pl-4 font-bold text-teal-700">∴ a = 3/8</p>
            <p className="text-purple-700 font-bold mt-2">② P(X ≥ 1) 계산</p>
            <p className="pl-4">P(X ≥ 1) = ∫₁² (3/8)x² dx</p>
            <p className="pl-4">= (3/8) · [x³/3]₁²</p>
            <p className="pl-4">= (1/8) · [x³]₁²</p>
            <p className="pl-4">= (1/8) · (8 − 1)</p>
            <p className="pl-4 font-bold text-purple-700">= 7/8</p>
          </div>
        </div>

        {/* 인터랙티브 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-teal-600" />
            확률밀도함수 탐색기
          </h3>
          <PDFExplorer />
        </div>
      </section>

      {/* ── 3. 연속확률변수의 기댓값·분산 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <Calculator className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">3. 연속확률변수의 기댓값·분산</h2>
          </div>
          <p className="text-blue-100">합(Σ)이 적분(∫)으로 바뀐다는 것이 핵심</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-blue-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-blue-800 mb-3">기댓값 E(X)</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center font-mono text-lg mb-3">
              <p className="font-bold text-blue-900">E(X) = ∫ x·f(x) dx</p>
            </div>
            <p className="text-sm text-gray-600">
              이산확률변수의 E(X) = Σ xᵢpᵢ에서 Σ → ∫, pᵢ → f(x)dx 로 대응됩니다.
            </p>
          </div>

          <div className="bg-white border-2 border-indigo-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-indigo-800 mb-3">분산 V(X)</h3>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center font-mono text-lg mb-3">
              <p className="font-bold text-indigo-900">V(X) = E(X²) − {'{E(X)}²'}</p>
              <p className="text-sm text-indigo-600 mt-1">E(X²) = ∫ x²·f(x) dx</p>
            </div>
            <p className="text-sm text-gray-600">
              이산의 경우와 같은 공식 구조, 합만 적분으로 바뀝니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── 참고 영상 ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-500" />
          영상으로 보기
        </h2>
        <div className="grid md:grid-cols-1 gap-4 max-w-lg">
          {[
            {
              href: 'https://www.youtube.com/watch?v=CRwbU4j72Ts',
              id: 'CRwbU4j72Ts',
              title: '연속확률변수와 확률밀도함수',
              desc: '연속확률변수 개념과 확률밀도함수(PDF)의 조건, 확률 계산 방법을 설명합니다.',
            },
          ].map((v) => (
            <a
              key={v.id}
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all"
            >
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
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-red-700 transition-colors">
                  {v.title}
                </p>
                <p className="text-xs text-gray-500">{v.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 핵심 정리 */}
      <section className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">핵심 공식 정리</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { title: 'PDF 조건', lines: ['f(x) ≥ 0', '∫f(x)dx = 1'] },
            { title: '확률 계산', lines: ['P(a≤X≤b) = ∫ₐᵇ f(x)dx', 'P(X=c) = 0'] },
            { title: '기댓값·분산', lines: ['E(X) = ∫ x·f(x)dx', 'V(X) = E(X²)−{E(X)}²'] },
          ].map((card) => (
            <div key={card.title} className="bg-white/15 backdrop-blur rounded-lg p-4">
              <h3 className="font-bold mb-2 text-teal-100">{card.title}</h3>
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
            to="/discrete-rv"
            className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all text-sm"
          >
            ← 이산확률변수 복습
          </Link>
          <Link
            to="/normal-distribution"
            className="inline-flex items-center px-4 py-2 bg-white text-teal-700 rounded-lg font-bold hover:bg-teal-50 transition-all text-sm"
          >
            정규분포 →
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
