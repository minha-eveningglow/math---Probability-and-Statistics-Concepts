import { Link } from 'react-router';
import { BarChart2, ArrowRight, BookOpen, Calculator, Target, Youtube } from 'lucide-react';
import { SampleMeanDistribution } from '../components/SampleMeanDistribution';
import { ConfidenceIntervalViz } from '../components/ConfidenceIntervalViz';
import { ElectionConfidenceViz } from '../components/ElectionConfidenceViz';
import { ConfidenceZDiagram } from '../components/ConfidenceZDiagram';
import { CentralLimitTheoremViz } from '../components/CentralLimitTheoremViz';

export function SampleMean() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
          <Target className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">모평균과 표본평균, 모평균의 추정</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          모집단에서 표본을 뽑아 표본평균으로 모평균을 추정하고, 신뢰구간으로 그 오차를 표현한다
        </p>
      </div>

      {/* 학습 흐름 */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-bold text-emerald-900 mb-4">학습 흐름</h2>
        <div className="grid md:grid-cols-5 gap-3">
          {[
            { step: '1', title: '모집단과 표본', sub: '전수조사 vs 표본조사' },
            { step: '2', title: '모평균·표본평균', sub: 'm, σ² vs X̄, S²' },
            { step: '3', title: '표본평균의 분포', sub: 'E(X̄), V(X̄), N(m, σ²/n)' },
            { step: '4', title: '추정', sub: '표본으로 모수 추측' },
            { step: '5', title: '신뢰구간', sub: 'x̄ ± z·σ/√n' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border-l-4 border-emerald-500 text-center">
              <div className="text-xs font-bold text-emerald-600 mb-1">{s.step}단계</div>
              <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. 모집단과 표본 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <BookOpen className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">1. 모집단과 표본</h2>
          </div>
          <p className="text-emerald-100">
            전체를 다 조사할 수 없을 때, 일부(표본)를 뽑아 전체(모집단)의 특성을 알아본다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border-2 border-emerald-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-emerald-800 mb-3">통계 조사</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <strong className="text-emerald-700">전수조사</strong> — 조사 대상 집단 전체를 조사
                <p className="text-xs text-gray-500">예: 인구주택총조사, 병역판정검사</p>
              </li>
              <li>
                <strong className="text-emerald-700">표본조사</strong> — 집단 전체에서 일부를 뽑아 조사
                <p className="text-xs text-gray-500">예: 과일의 당도 조사, 전구의 수명 조사</p>
              </li>
            </ul>
          </div>
          <div className="bg-white border-2 border-teal-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-teal-800 mb-3">모집단과 표본</h3>

            {/* 모집단 → 추출 → 표본 다이어그램 */}
            <svg viewBox="0 0 300 130" className="w-full h-auto mb-3">
              {/* 모집단 영역 */}
              <rect x="4" y="5" width="140" height="120" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <circle cx="74" cy="65" r="50" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
              {Array.from({ length: 22 }).map((_, i) => {
                const angle = (i / 22) * Math.PI * 2 + i * 0.7;
                const r = 8 + (i % 5) * 8;
                const cx = 74 + Math.cos(angle) * r;
                const cy = 65 + Math.sin(angle) * r;
                return <circle key={i} cx={cx} cy={cy} r="3.5" fill="#059669" />;
              })}
              <text x="74" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#065f46">모집단</text>

              {/* 화살표 */}
              <line x1="150" y1="65" x2="205" y2="65" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
              <text x="177" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">추출</text>
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#dc2626" />
                </marker>
              </defs>

              {/* 표본 영역 */}
              <circle cx="248" cy="65" r="34" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
              {Array.from({ length: 7 }).map((_, i) => {
                const angle = (i / 7) * Math.PI * 2 + 0.4;
                const r = 6 + (i % 3) * 9;
                const cx = 248 + Math.cos(angle) * r;
                const cy = 65 + Math.sin(angle) * r;
                return <circle key={i} cx={cx} cy={cy} r="3.5" fill="#059669" />;
              })}
              <text x="248" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#065f46">표본</text>
            </svg>

            <ul className="text-sm text-gray-700 space-y-1.5">
              <li><strong className="text-teal-700">모집단</strong> — 조사 대상이 되는 집단 전체</li>
              <li><strong className="text-teal-700">표본</strong> — 조사하기 위해 뽑은 모집단의 일부분</li>
              <li><strong className="text-teal-700">표본의 크기</strong> — 뽑은 표본의 개수</li>
              <li><strong className="text-teal-700">추출</strong> — 모집단에서 표본을 뽑는 것</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">임의추출</h3>
          <p className="text-gray-700 mb-4">
            모집단의 각 대상이 <span className="font-semibold text-emerald-700">같은 확률로 추출</span>되도록
            표본을 추출하는 방법을 <strong>임의추출</strong>이라 한다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="font-semibold text-emerald-800 mb-1">복원추출</p>
              <p className="text-sm text-emerald-700">한 번 추출된 대상을 되돌려 놓고 다시 추출</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">비복원추출</p>
              <p className="text-sm text-gray-700">한 번 추출된 대상을 되돌려 놓지 않고 다시 추출</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">※ 특별한 언급이 없으면 임의추출은 복원추출을 의미한다.</p>
        </div>
      </section>

      {/* ── 2. 모평균과 표본평균 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <Calculator className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">2. 모평균, 모분산, 모표준편차 · 표본평균, 표본분산, 표본표준편차</h2>
          </div>
          <p className="text-teal-100">모집단의 특성값(모수)과, 표본으로부터 얻는 통계량</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border-2 border-teal-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-teal-800 mb-3">모평균 · 모분산 · 모표준편차</h3>
            <p className="text-sm text-gray-700 mb-3">
              모집단에서 조사하고자 하는 특성을 나타내는 확률변수를 X라 할 때, X의 평균·분산·표준편차를
              각각 <strong>모평균, 모분산, 모표준편차</strong>라 하고 기호로 나타낸다.
            </p>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-center font-mono font-bold text-teal-900">
              m, σ², σ
            </div>
          </div>
          <div className="bg-white border-2 border-cyan-300 rounded-xl p-5">
            <h3 className="text-lg font-bold text-cyan-800 mb-3">표본평균 · 표본분산 · 표본표준편차</h3>
            <p className="text-sm text-gray-700 mb-3">
              모집단에서 임의추출한 크기 n인 표본 X₁, X₂, …, Xₙ의 평균·분산·표준편차를
              각각 <strong>표본평균, 표본분산, 표본표준편차</strong>라 하고 기호로 나타낸다.
            </p>
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 text-center font-mono font-bold text-cyan-900">
              X̄, S², S
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">정의식</h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-bold text-cyan-700 mb-1">① 표본평균</p>
              <p>X̄ = (1/n)(X₁ + X₂ + ⋯ + Xₙ)</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-bold text-purple-700 mb-1">② 표본분산</p>
              <p>S² = 1/(n−1) · {'{'}(X₁−X̄)² + (X₂−X̄)² + ⋯ + (Xₙ−X̄)²{'}'}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-bold text-indigo-700 mb-1">③ 표본표준편차</p>
              <p>S = √S²</p>
            </div>
          </div>
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>왜 n이 아니라 n−1로 나눌까?</strong> 표본분산을 n으로 나누면 평균적으로 모분산보다
              작게 나오는 편향이 생깁니다. n−1로 나누면 이 차이를 줄여, 표본분산이 모분산을
              더 잘 추정하게 됩니다.
            </p>
          </div>
        </div>

        {/* 예제 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">예제 — 표본이 2, 7, 9이면</h3>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
            <p><strong>X̄</strong> = (1/3)(2+7+9) = <strong className="text-teal-700">6</strong></p>
            <p><strong>S²</strong> = 1/(3−1)·{'{'}(2−6)²+(7−6)²+(9−6)²{'}'} = 1/2·(16+1+9) = <strong className="text-purple-700">13</strong></p>
            <p><strong>S</strong> = √13</p>
          </div>
        </div>
      </section>

      {/* ── 3. 표본평균의 평균, 분산, 표준편차 & 분포 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <BarChart2 className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">3. 표본평균의 평균·분산·표준편차, 그리고 분포</h2>
          </div>
          <p className="text-emerald-100">
            표본평균 X̄도 표본을 뽑을 때마다 값이 달라지는 확률변수다
          </p>
        </div>

        <div className="bg-white border-2 border-emerald-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-emerald-900 mb-3">
            표본평균은 확률변수다
          </h3>
          <p className="text-gray-700 mb-4">
            모평균이 m, 모표준편차가 σ인 모집단에서 크기 n인 표본 X₁, X₂, …, Xₙ을 임의추출할 때,
            표본평균 X̄의 평균, 분산, 표준편차는 다음과 같다.
          </p>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center font-mono text-lg mb-4">
            <p className="font-bold text-emerald-900">
              E(X̄) = m, &nbsp; V(X̄) = σ²/n, &nbsp; σ(X̄) = σ/√n
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-emerald-100 rounded-lg p-3">
              <p className="text-sm font-semibold text-emerald-800 mb-1">평균은 그대로</p>
              <p className="text-xs text-gray-600">표본평균의 평균은 모평균 m과 같다 — 어느 쪽으로도 편향되지 않는다.</p>
            </div>
            <div className="bg-white border border-emerald-100 rounded-lg p-3">
              <p className="text-sm font-semibold text-emerald-800 mb-1">분산은 1/n배</p>
              <p className="text-xs text-gray-600">표본 크기 n이 커질수록 표본평균의 흩어짐(V(X̄))은 줄어든다.</p>
            </div>
            <div className="bg-white border border-emerald-100 rounded-lg p-3">
              <p className="text-sm font-semibold text-emerald-800 mb-1">표준편차는 1/√n배</p>
              <p className="text-xs text-gray-600">n이 4배가 되면 σ(X̄)는 절반으로 줄어든다.</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-green-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-green-900 mb-3">표본평균은 정규분포를 따른다</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              모평균이 m, 모표준편차가 σ인 모집단에서 크기 n인 표본을 임의추출할 때, 표본평균 X̄에 대하여
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p>
                <strong>(1)</strong> 모집단이 정규분포 N(m, σ²)을 따르면 표본평균 X̄는{' '}
                <strong className="text-green-800">정규분포 N(m, σ²/n)을 따른다.</strong>
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p>
                <strong>(2)</strong> 모집단의 확률분포가 정규분포가 아니어도, 표본의 크기 n이 충분히 크면
                표본평균 X̄는 <strong className="text-green-800">근사적으로 정규분포 N(m, σ²/n)을 따른다.</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1">(중심극한정리 — 모집단의 분포 모양과 관계없이 성립한다는 점이 핵심)</p>
            </div>
          </div>
        </div>

        {/* 인터랙티브 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-emerald-600" />
            표본평균의 분포 탐색기 — n을 바꾸면 분포가 어떻게 좁아질까?
          </h3>
          <SampleMeanDistribution />
        </div>

        {/* 중심극한정리 시뮬레이션 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-fuchsia-600" />
            중심극한정리 시뮬레이션 — 모집단이 정규분포가 아니어도 정말 성립할까?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            위 (2)의 주장을 눈으로 직접 확인해보자. 균등분포·지수분포·쌍봉분포처럼
            정규분포와 전혀 다르게 생긴 모집단에서 표본을 뽑아도, 표본의 크기 n을 키우면
            표본평균 X̄의 히스토그램이 정규분포 곡선에 가까워지는지 시뮬레이션으로 확인한다.
          </p>
          <CentralLimitTheoremViz />

          {/* 심화 읽을거리: MGF를 이용한 CLT 엄밀한 증명 */}
          <div className="mt-6 bg-fuchsia-50 border border-fuchsia-200 rounded-xl p-5">
            <h4 className="font-bold text-fuchsia-900 mb-1 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              더 깊이 알고 싶다면 — 중심극한정리를 수식으로 증명하기
            </h4>
            <p className="text-sm text-fuchsia-800 mb-3">
              위 시뮬레이션은 "눈으로 확인"하는 수준이지만, 고교 과정을 넘어 적률생성함수(MGF)를
              이용하면 중심극한정리를 엄밀하게 증명할 수 있다. "통계의 본질" 블로그의 3부작 시리즈.
            </p>
            <div className="space-y-2">
              {[
                {
                  href: 'https://hsm-edu.tistory.com/24',
                  title: '#1. 확률분포가 같을 조건',
                  desc: 'MGF가 같으면 두 확률변수의 분포도 같다는 정리를 증명한다.',
                },
                {
                  href: 'https://hsm-edu.tistory.com/25',
                  title: '#2. 정규분포의 적률생성함수',
                  desc: '정규분포의 확률밀도함수로부터 MGF e^(μt+σ²t²/2)를 유도한다.',
                },
                {
                  href: 'https://hsm-edu.tistory.com/26',
                  title: '#3. 표본평균의 적률생성함수 (완결)',
                  desc: '표본평균의 MGF가 표준화 후 표준정규분포의 MGF와 일치함을 보인다.',
                },
              ].map((post, i) => (
                <a
                  key={post.href}
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg bg-white border border-fuchsia-100 hover:bg-fuchsia-100/50 hover:border-fuchsia-300 transition-colors group"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-fuchsia-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-fuchsia-900 text-sm group-hover:underline">
                      {post.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">{post.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. 모평균의 추정 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <Target className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">4. 추정과 신뢰구간</h2>
          </div>
          <p className="text-blue-100">표본평균으로부터 모평균의 범위를 확률적으로 추측한다</p>
        </div>

        <div className="bg-white border-2 border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">추정이란?</h3>
          <p className="text-gray-700">
            표본평균이나 표본표준편차와 같이 표본으로부터 얻은 정보를 이용하여,
            모평균이나 모표준편차와 같은 <strong className="text-blue-700">모집단의 특성(모수)을 나타내는 값을 추측</strong>하는 것을
            <strong> 추정</strong>이라 한다.
          </p>
        </div>

        <div className="bg-white border-2 border-indigo-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-3">모평균에 대한 신뢰구간</h3>
          <p className="text-gray-700 mb-4">
            정규분포 N(m, σ²)을 따르는 모집단에서 크기가 n인 표본을 임의추출할 때, 표본평균 X̄의 값이
            x̄이면 신뢰도에 따른 모평균 m에 대한 <strong>신뢰구간</strong>은 다음과 같다.
          </p>
          <div className="space-y-3">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center font-mono">
              <p className="text-xs text-indigo-600 font-semibold mb-1">신뢰도 95%</p>
              <p className="font-bold text-indigo-900">x̄ − 1.96·σ/√n ≤ m ≤ x̄ + 1.96·σ/√n</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center font-mono">
              <p className="text-xs text-indigo-600 font-semibold mb-1">신뢰도 99%</p>
              <p className="font-bold text-indigo-900">x̄ − 2.58·σ/√n ≤ m ≤ x̄ + 2.58·σ/√n</p>
            </div>
          </div>
        </div>

        {/* 도출 과정 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">신뢰구간은 어떻게 나오는가</h3>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2 overflow-x-auto mb-4">
            <p>X̄ ~ N(m, σ²/n) 이므로 Z = (X̄ − m) / (σ/√n) 은 표준정규분포 N(0, 1)을 따른다.</p>
            <p className="text-blue-700">표준정규분포표에서 P(0 ≤ Z ≤ 1.96) = 0.475 이므로</p>
            <p>P(−1.96 ≤ Z ≤ 1.96) = 2 × 0.475 = 0.95</p>
            <p className="pl-4">⟺ P(X̄ − 1.96·σ/√n ≤ m ≤ X̄ + 1.96·σ/√n) = 0.95</p>
            <p className="text-indigo-700 font-bold">실제로 관측한 표본평균 x̄를 대입하면 신뢰도 95%의 신뢰구간을 얻는다.</p>
          </div>
          <ConfidenceZDiagram />
        </div>

        {/* 신뢰구간의 길이 */}
        <div className="bg-white border-2 border-purple-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-purple-900 mb-3">신뢰구간의 길이</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center font-mono">
              <p className="text-xs text-purple-600 font-semibold mb-1">신뢰도 95%</p>
              <p className="font-bold text-purple-900">2 × 1.96 × σ/√n</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center font-mono">
              <p className="text-xs text-purple-600 font-semibold mb-1">신뢰도 99%</p>
              <p className="font-bold text-purple-900">2 × 2.58 × σ/√n</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <strong>표본의 크기 n이 커지면</strong> σ/√n이 작아지므로 신뢰구간의 길이는 짧아진다(더 정밀한 추정).
              반면 <strong>신뢰도를 높이면</strong>(95%→99%) z값이 커지므로 신뢰구간의 길이는 길어진다
              — 정밀함과 확신함은 서로 trade-off 관계에 있다.
            </p>
          </div>
        </div>

        {/* 실생활 예제: 선거 개표방송 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
            <Target className="w-5 h-5 mr-2 text-rose-600" />
            실생활 예제 — 선거 개표방송의 "당선 확실" 표시
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            선거 개표방송에서 출구조사 결과를 발표할 때 "지지율 43% (오차범위 ±3%p, 95% 신뢰수준)"라고
            말하는 것을 본 적이 있을 것이다. 두 후보의 신뢰구간을 슬라이더로 직접 움직여보면서
            언제 "당선 확실"이 뜨고 언제 "경합"으로 표시되는지 확인해보자.
          </p>
          <ElectionConfidenceViz />
        </div>

        {/* 인터랙티브 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            신뢰구간 시뮬레이터 — "95%"는 무슨 뜻일까?
          </h3>
          <ConfidenceIntervalViz />
        </div>
      </section>

      {/* ── 참고 자료 ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          참고 자료
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-500" />
            영상으로 보기
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                href: 'https://www.youtube.com/watch?v=s_hmpArC3qw',
                id: 's_hmpArC3qw',
                title: '표본평균 8분으로 끝내기 (확통개념 22강)',
                channel: '설레는 수학',
                desc: '표본평균은 확률변수다 → 표본평균의 분포 → 표본평균은 정규분포를 따른다, 이 흐름을 8분 안에 정리합니다.',
              },
              {
                href: 'https://www.youtube.com/watch?v=RQskAuRYey4',
                id: 'RQskAuRYey4',
                title: '신뢰구간(모평균의 추정) 15분에 끝내기 (확통개념 23강)',
                channel: '설레는 수학',
                desc: '추정의 의미 → 신뢰구간의 의미 → 신뢰구간 공식 → 신뢰구간의 길이 순서로 설명합니다.',
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
                  <p className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-red-700 transition-colors line-clamp-2">
                    {v.title}
                  </p>
                  <p className="text-xs text-gray-400 mb-1">{v.channel}</p>
                  <p className="text-xs text-gray-500">{v.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 정리 */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">핵심 공식 정리</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { title: '표본평균·표본분산', lines: ['X̄ = (1/n)ΣXᵢ', 'S² = 1/(n−1)·Σ(Xᵢ−X̄)²'] },
            { title: '표본평균의 평균·분산', lines: ['E(X̄) = m', 'V(X̄) = σ²/n', 'σ(X̄) = σ/√n'] },
            { title: '표본평균의 분포', lines: ['X ~ N(m,σ²) 이면', 'X̄ ~ N(m, σ²/n)'] },
            { title: '신뢰구간 95%', lines: ['x̄ ± 1.96·σ/√n'] },
            { title: '신뢰구간 99%', lines: ['x̄ ± 2.58·σ/√n'] },
            { title: '신뢰구간의 길이', lines: ['95%: 2×1.96×σ/√n', '99%: 2×2.58×σ/√n'] },
          ].map((card) => (
            <div key={card.title} className="bg-white/15 backdrop-blur rounded-lg p-4">
              <h3 className="font-bold mb-2 text-emerald-100">{card.title}</h3>
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
            to="/binomial-normal"
            className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all text-sm"
          >
            ← 이항분포의 정규근사 복습
          </Link>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-white text-emerald-700 rounded-lg font-bold hover:bg-emerald-50 transition-all text-sm"
          >
            홈으로
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
