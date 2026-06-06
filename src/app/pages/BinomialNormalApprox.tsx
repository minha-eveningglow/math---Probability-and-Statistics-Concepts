import { Link } from 'react-router';
import { TrendingUp, Calculator, BookOpen, Youtube } from 'lucide-react';
import { BinomialNormalViz } from '../components/BinomialNormalViz';

export function BinomialNormalApprox() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <TrendingUp className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">이항분포의 정규근사</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          n이 충분히 크면 B(n, p) ≈ N(np, npq) — 이항분포를 정규분포로 근사하여 계산한다
        </p>
      </div>

      {/* 학습 흐름 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-bold text-blue-900 mb-4">학습 흐름</h2>
        <div className="grid md:grid-cols-4 gap-3">
          {[
            { step: '1', title: '근사 배경', sub: 'n이 크면 계산 불가능' },
            { step: '2', title: '근사 조건', sub: 'np≥5, nq≥5' },
            { step: '3', title: '근사 공식', sub: 'B(n,p) ≈ N(np, npq)' },
            { step: '4', title: '표준화 후 계산', sub: 'Z = (X−np)/√(npq)' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border-l-4 border-blue-500 text-center">
              <div className="text-xs font-bold text-blue-600 mb-1">{s.step}단계</div>
              <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. 왜 정규근사가 필요한가 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <BookOpen className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">1. 왜 정규근사가 필요한가?</h2>
          </div>
          <p className="text-blue-100">n이 커질수록 이항분포의 직접 계산은 현실적으로 불가능해진다</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-red-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-red-800 mb-3">이항분포 직접 계산의 한계</h3>
            <p className="text-gray-700 mb-3">
              X ∼ B(400, 1/2) 일 때 P(190 ≤ X ≤ 210) 을 구하려면:
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 font-mono text-sm">
              <p>P(X=190) + P(X=191) + … + P(X=210)</p>
              <p className="mt-1">각 항: ₄₀₀C₁₉₀ × (1/2)⁴⁰⁰ 형태</p>
              <p className="mt-1 text-red-700 font-bold">→ 21개 항을 모두 계산해야 함 (불가능!)</p>
            </div>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-green-800 mb-3">정규근사를 쓰면</h3>
            <p className="text-gray-700 mb-3">
              n = 400, p = 1/2 이면:
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 font-mono text-sm space-y-1">
              <p>μ = np = 400 × 1/2 = 200</p>
              <p>σ² = npq = 400 × 1/2 × 1/2 = 100</p>
              <p>σ = 10</p>
              <p className="text-green-800 font-bold mt-1">X ≈ N(200, 10²)</p>
              <p className="text-green-700">P(190≤X≤210) = P(−1≤Z≤1) 표준화 후 표로 해결!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 근사 조건 및 공식 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <Calculator className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">2. 정규근사 조건 및 공식</h2>
          </div>
          <p className="text-indigo-100">두 조건을 확인한 뒤 공식을 적용한다</p>
        </div>

        {/* 근사 조건 */}
        <div className="bg-white border-2 border-indigo-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">근사 조건</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-4 text-center">
              <p className="font-mono text-2xl font-bold text-indigo-900">np ≥ 5</p>
              <p className="text-sm text-indigo-600 mt-1">성공 기댓값이 5 이상</p>
            </div>
            <div className="bg-violet-50 border-2 border-violet-300 rounded-lg p-4 text-center">
              <p className="font-mono text-2xl font-bold text-violet-900">nq ≥ 5</p>
              <p className="text-sm text-violet-600 mt-1">실패 기댓값이 5 이상 (q = 1−p)</p>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
            두 조건을 모두 만족할 때 이항분포는 근사적으로 정규분포를 따릅니다.
            일반적으로 n이 클수록 (보통 n ≥ 30) 근사 정밀도가 높아집니다.
          </div>
        </div>

        {/* 핵심 공식 */}
        <div className="bg-white border-2 border-violet-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">정규근사 공식</h3>

          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-xl p-6 text-center mb-6">
            <p className="text-sm text-gray-500 mb-2">X ∼ B(n, p), q = 1−p 이고 np≥5, nq≥5 이면</p>
            <p className="font-mono text-2xl font-bold text-indigo-900">X ≈ N(np, npq)</p>
            <div className="flex justify-center gap-8 mt-3 text-sm font-mono">
              <span className="text-blue-700">E(X) = np</span>
              <span className="text-purple-700">V(X) = npq</span>
              <span className="text-indigo-700">σ(X) = √(npq)</span>
            </div>
          </div>

          {/* 표준화 */}
          <h4 className="font-bold text-gray-900 mb-3">표준화 후 확률 계산</h4>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1">
            <p className="text-blue-700">Z = (X − np) / √(npq)</p>
            <p>P(a ≤ X ≤ b) = P((a−np)/√(npq) ≤ Z ≤ (b−np)/√(npq))</p>
          </div>
        </div>
      </section>

      {/* ── 3. 대표 예제 ── */}
      <section className="mb-14">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center mb-2">
            <BookOpen className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">3. 대표 예제</h2>
          </div>
          <p className="text-violet-100">단계별로 따라 풀어보기</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-800">
              동전을 400번 던질 때, 앞면이 180회 이상 210회 이하로 나올 확률을 구하시오.
            </p>
            <p className="text-sm text-gray-500 mt-1">(단, P(0 ≤ Z ≤ 1) = 0.3413, P(0 ≤ Z ≤ 2) = 0.4772)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
            <p className="text-blue-700 font-bold">① X ∼ B(400, 1/2) 설정</p>
            <p className="pl-4">n = 400, p = 1/2, q = 1/2</p>

            <p className="text-green-700 font-bold mt-2">② 근사 조건 확인</p>
            <p className="pl-4">np = 200 ≥ 5 ✓</p>
            <p className="pl-4">nq = 200 ≥ 5 ✓</p>

            <p className="text-purple-700 font-bold mt-2">③ 정규근사 적용</p>
            <p className="pl-4">μ = np = 200</p>
            <p className="pl-4">σ² = npq = 100, σ = 10</p>
            <p className="pl-4">X ≈ N(200, 10²)</p>

            <p className="text-indigo-700 font-bold mt-2">④ 표준화</p>
            <p className="pl-4">x = 180 → z = (180 − 200) / 10 = −2</p>
            <p className="pl-4">x = 210 → z = (210 − 200) / 10 = 1</p>

            <p className="text-violet-700 font-bold mt-2">⑤ 확률 계산</p>
            <p className="pl-4">P(180 ≤ X ≤ 210) = P(−2 ≤ Z ≤ 1)</p>
            <p className="pl-4">= P(−2 ≤ Z ≤ 0) + P(0 ≤ Z ≤ 1)</p>
            <p className="pl-4">= P(0 ≤ Z ≤ 2) + P(0 ≤ Z ≤ 1)</p>
            <p className="pl-4">= 0.4772 + 0.3413</p>
            <p className="pl-4 font-bold text-violet-700">= 0.8185</p>
          </div>
        </div>
      </section>

      {/* ── 4. 인터랙티브 시각화 ── */}
      <section className="mb-14">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            이항분포 → 정규분포 근사 시각화
          </h3>
          <BinomialNormalViz />
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
              title: '이항분포와 정규분포의 관계',
              desc: 'n이 커질수록 이항분포가 정규분포에 가까워지는 원리를 설명합니다.',
            },
            {
              href: 'https://www.youtube.com/watch?v=0wAecx6eNZw',
              id: '0wAecx6eNZw',
              title: '이항분포의 정규근사 문제 풀이',
              desc: '실전 문제에서 정규근사를 적용하는 방법을 단계별로 보여줍니다.',
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
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">핵심 공식 정리</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { title: '근사 조건', lines: ['np ≥ 5', 'nq ≥ 5 (q = 1−p)'] },
            { title: '정규근사 공식', lines: ['B(n, p) ≈ N(np, npq)', 'μ=np, σ=√(npq)'] },
            { title: '표준화', lines: ['Z = (X − np) / √(npq)', '→ N(0, 1) 이용'] },
          ].map((card) => (
            <div key={card.title} className="bg-white/15 backdrop-blur rounded-lg p-4">
              <h3 className="font-bold mb-2 text-blue-100">{card.title}</h3>
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
            to="/normal-distribution"
            className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all text-sm"
          >
            ← 정규분포 복습
          </Link>
          <Link
            to="/flow"
            className="inline-flex items-center px-4 py-2 bg-white text-indigo-700 rounded-lg font-bold hover:bg-indigo-50 transition-all text-sm"
          >
            개념의 흐름 →
          </Link>
        </div>
      </section>
    </div>
  );
}
