import { Link } from 'react-router';
import { ArrowRight, BarChart2, BookOpen, Calculator, Youtube } from 'lucide-react';
import { NormalCurve } from '../components/NormalCurve';

export function NormalDistribution() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <BarChart2 className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">정규분포</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          종 모양의 좌우대칭 분포 — 표준화(Z 변환)를 통해 표준정규분포표를 활용한다
        </p>
      </div>

      {/* 학습 흐름 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-bold text-indigo-900 mb-4">학습 흐름</h2>
        <div className="grid md:grid-cols-5 gap-3">
          {[
            { step: '1', title: '정규분포', sub: 'N(m, σ²)' },
            { step: '2', title: '특징', sub: '좌우대칭, 종 모양' },
            { step: '3', title: '표준정규분포', sub: 'N(0, 1)' },
            { step: '4', title: '표준화', sub: 'Z = (X−m)/σ' },
            { step: '5', title: '확률 계산', sub: '정규분포표 활용' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border-l-4 border-indigo-500 text-center">
              <div className="text-xs font-bold text-indigo-600 mb-1">{s.step}단계</div>
              <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. 정규분포 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <BarChart2 className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">1. 정규분포 N(m, σ²)</h2>
          </div>
          <p className="text-indigo-100">자연 현상에서 가장 많이 나타나는 연속확률분포</p>
        </div>

        <div className="bg-white border-2 border-indigo-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">정의 및 확률밀도함수</h3>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center font-mono mb-4">
            <p className="font-bold text-indigo-900 text-lg">
              f(x) = 1/(σ√(2π)) · e^(−(x−m)²/2σ²)
            </p>
          </div>
          <p className="text-gray-700 mb-2">
            평균이 m, 표준편차가 σ인 정규분포를 따를 때
          </p>
          <div className="font-mono text-center text-indigo-900 font-bold text-lg bg-indigo-50 border border-indigo-200 rounded-lg p-3">
            X ∼ N(m, σ²)
          </div>
        </div>

        {/* 특징 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">정규분포의 특징</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { num: '①', title: '좌우대칭', desc: '평균 m을 중심으로 좌우대칭인 종 모양 곡선', color: 'indigo' },
              { num: '②', title: '전체 넓이 = 1', desc: 'P(−∞ < X < ∞) = 1 (확률의 총합)', color: 'purple' },
              { num: '③', title: '평균의 역할', desc: '평균 m이 달라지면 곡선이 좌우로 이동', color: 'blue' },
              { num: '④', title: '표준편차의 역할', desc: 'σ가 크면 낮고 넓게 퍼짐 / σ가 작으면 높고 좁아짐', color: 'violet' },
            ].map((f) => (
              <div key={f.num} className={`bg-${f.color}-50 border border-${f.color}-200 rounded-lg p-4`}>
                <div className="flex items-start gap-2">
                  <span className={`text-${f.color}-700 font-bold text-lg`}>{f.num}</span>
                  <div>
                    <p className={`font-bold text-${f.color}-800`}>{f.title}</p>
                    <p className={`text-sm text-${f.color}-700 mt-1`}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 인터랙티브 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
            정규분포 탐색기
          </h3>
          <NormalCurve />
        </div>
      </section>

      {/* ── 2. 표준정규분포 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <BookOpen className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">2. 표준정규분포 N(0, 1)</h2>
          </div>
          <p className="text-purple-100">평균 0, 분산 1인 특수한 정규분포</p>
        </div>

        <div className="bg-white border-2 border-purple-200 rounded-xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-purple-800 mb-3">정의</h3>
              <p className="text-gray-700 mb-3">
                평균이 0, 분산이 1인 정규분포를{' '}
                <strong>표준정규분포</strong>라 하고,
                이를 따르는 확률변수를 Z로 나타낸다.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center font-mono font-bold text-purple-900 text-lg">
                Z ∼ N(0, 1)
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-800 mb-3">대칭성에서 나오는 성질</h3>
              <div className="space-y-2 font-mono text-sm">
                {[
                  { expr: 'P(Z ≥ 0) = 0.5', desc: 'z=0 기준 오른쪽 넓이' },
                  { expr: 'P(Z ≤ 0) = 0.5', desc: 'z=0 기준 왼쪽 넓이' },
                  { expr: 'P(Z ≥ a) = 0.5 − P(0≤Z≤a)', desc: 'a > 0 일 때' },
                  { expr: 'P(Z ≤ a) = 0.5 + P(0≤Z≤a)', desc: 'a > 0 일 때' },
                  { expr: 'P(−a≤Z≤a) = 2·P(0≤Z≤a)', desc: '좌우대칭 이용' },
                ].map((r) => (
                  <div key={r.expr} className="bg-gray-50 rounded-lg p-2 flex justify-between items-center">
                    <span className="text-purple-900 font-semibold">{r.expr}</span>
                    <span className="text-gray-500 text-xs ml-2">{r.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 표준정규분포표 사용 예시 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">표준정규분포표 활용 예시</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-800">
              P(0 ≤ Z ≤ 1) = 0.3413 이 주어졌을 때:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 font-mono text-sm">
            {[
              { q: 'P(Z ≥ 1)', sol: '= 0.5 − 0.3413 = 0.1587' },
              { q: 'P(Z ≤ 1)', sol: '= 0.5 + 0.3413 = 0.8413' },
              { q: 'P(−1≤Z≤1)', sol: '= 2 × 0.3413 = 0.6826' },
            ].map((r) => (
              <div key={r.q} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-purple-800 font-bold">{r.q}</p>
                <p className="text-purple-700 mt-1">{r.sol}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. 표준화 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <Calculator className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">3. 정규분포의 표준화</h2>
          </div>
          <p className="text-violet-100">어떤 정규분포든 Z = (X − m) / σ 로 표준정규분포로 변환</p>
        </div>

        <div className="bg-white border-2 border-violet-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">표준화 공식</h3>
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-5 text-center mb-6">
            <p className="text-3xl font-bold text-violet-900 font-mono">Z = (X − m) / σ</p>
            <p className="text-sm text-violet-600 mt-2">X ∼ N(m, σ²) → Z ∼ N(0, 1)</p>
          </div>

          {/* 풀이 순서 */}
          <h4 className="font-bold text-gray-900 mb-3">정규분포 문제 풀이 순서</h4>
          <div className="flex flex-col md:flex-row items-center gap-3">
            {[
              { step: '1', text: '평균 m 확인', detail: 'X − m' },
              { step: '→', text: '', detail: '' },
              { step: '2', text: 'σ 로 나누기', detail: '(X − m) / σ' },
              { step: '→', text: '', detail: '' },
              { step: '3', text: '표준정규분포표', detail: 'P(0 ≤ Z ≤ z) 조회' },
            ].map((s, i) => s.step === '→' ? (
              <div key={i} className="text-2xl text-gray-400">→</div>
            ) : (
              <div key={i} className="flex-1 bg-violet-50 border border-violet-200 rounded-lg p-3 text-center">
                <div className="text-xs font-bold text-violet-600 mb-1">{s.step}단계</div>
                <div className="font-semibold text-gray-900 text-sm">{s.text}</div>
                <p className="font-mono text-xs text-violet-700 mt-1">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 예제 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">예제</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-800">
              X ∼ N(170, 6²)일 때, P(164 ≤ X ≤ 176)을 구하시오.
            </p>
            <p className="text-sm text-gray-500 mt-1">(단, P(0 ≤ Z ≤ 1) = 0.3413)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
            <p className="text-blue-700 font-bold">① 표준화</p>
            <p className="pl-4">Z = (X − 170) / 6</p>
            <p className="pl-4">x = 164 → z = (164 − 170) / 6 = −1</p>
            <p className="pl-4">x = 176 → z = (176 − 170) / 6 = 1</p>
            <p className="text-purple-700 font-bold mt-2">② 확률 계산</p>
            <p className="pl-4">P(164 ≤ X ≤ 176) = P(−1 ≤ Z ≤ 1)</p>
            <p className="pl-4">= 2 × P(0 ≤ Z ≤ 1)</p>
            <p className="pl-4">= 2 × 0.3413</p>
            <p className="pl-4 font-bold text-purple-700">= 0.6826</p>
          </div>
        </div>
      </section>

      {/* ── 참고 영상 ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-500" />
          영상으로 보기
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              href: 'https://www.youtube.com/watch?v=EfJ36Qd6LfA',
              id: 'EfJ36Qd6LfA',
              title: '정규분포와 표준정규분포',
              desc: '정규분포의 특징, 표준정규분포 개념과 확률 계산법을 설명합니다.',
            },
            {
              href: 'https://www.youtube.com/watch?v=Ktlw0LeI11c',
              id: 'Ktlw0LeI11c',
              title: '정규분포의 표준화',
              desc: 'Z = (X−m)/σ 표준화 공식과 표준정규분포표 활용법을 다룹니다.',
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
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">핵심 공식 정리</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { title: '정규분포 표기', lines: ['X ∼ N(m, σ²)', 'E(X) = m, V(X) = σ²'] },
            { title: '표준정규분포', lines: ['Z ∼ N(0, 1)', 'P(Z≥0) = P(Z≤0) = 0.5'] },
            { title: '표준화 공식', lines: ['Z = (X − m) / σ', '(X∼N(m,σ²) → Z∼N(0,1))'] },
          ].map((card) => (
            <div key={card.title} className="bg-white/15 backdrop-blur rounded-lg p-4">
              <h3 className="font-bold mb-2 text-indigo-100">{card.title}</h3>
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
            to="/continuous-rv"
            className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all text-sm"
          >
            ← 연속확률변수 복습
          </Link>
          <Link
            to="/binomial-normal"
            className="inline-flex items-center px-4 py-2 bg-white text-indigo-700 rounded-lg font-bold hover:bg-indigo-50 transition-all text-sm"
          >
            이항분포의 정규근사 →
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
